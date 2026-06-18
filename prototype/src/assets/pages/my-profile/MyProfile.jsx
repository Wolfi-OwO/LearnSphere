import React, { useReducer } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import ActivityBoard from "../../components/core/activity-board/ActivityBoard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./MyProfile.css"; // Add custom styles for better design
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { initialState, reducer, ACTIONS } from "./MyProfileReducer.js";
import { useAppStore } from "../../store/appStore.js";
import { getCourse, countLessons } from "../../data/mockData.js";



function MyProfile({ isEdit = false }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: store } = useAppStore();
  const navigate = useNavigate();

  const enrolledCourses = Object.keys(store.enrollments).map(getCourse).filter(Boolean);
  const ongoingCourses = enrolledCourses.length;
  const completedCourses = store.certificates.length;
  const lessonsCompleted = Object.values(store.lessonProgress).filter(Boolean).length;
  const totalLessons = enrolledCourses.reduce((sum, c) => sum + countLessons(c), 0);
  const completionRate = totalLessons
    ? Math.round((lessonsCompleted / totalLessons) * 100)
    : 0;

  const updateField = (field) => (event) =>
    dispatch({ type: ACTIONS.UPDATE_FIELD, field, value: event.target.value });

  const handleSave = () => {
    // In a full build this would persist to the backend; for the prototype the
    // edited values already live in the reducer state, so we just leave edit mode.
    navigate("/my-profile");
  };

  return (
    <Container fluid className="d-flex flex-column page my-profile-page mt-4 flex-fill">
      <Card className="user-card px-2">
        <Row className="align-items-center">
          <Col xs={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
            <div className="profile-header-container">
              <Card.Img
                variant="top"
                src="https://placehold.co/40"
                alt="Profile Picture"
                className="profile-picture"
              />
              <Badge
                bg={
                  state.currentStatus === "Active" ? "success" : "secondary"
                }
                className="status-badge"
              ></Badge>
            </div>
          </Col>
          <Col>
            <Container fluid>
              {isEdit ? (
                <Form>
                  <Form.Group className="mb-2" controlId="profileName">
                    <Form.Label className="mb-0 small text-muted">Name</Form.Label>
                    <Form.Control
                      value={state.name}
                      onChange={updateField("name")}
                    />
                  </Form.Group>
                  <Form.Group controlId="profileEmail">
                    <Form.Label className="mb-0 small text-muted">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={state.email}
                      onChange={updateField("email")}
                    />
                  </Form.Group>
                </Form>
              ) : (
                <>
                  <Row>
                    <Col>
                      <Card.Title className="fs-4 fw-bold">
                        {state.name}
                      </Card.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card.Subtitle className="fs-6">
                        {state.email}
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </>
              )}
            </Container>
          </Col>
        </Row>
        <span className="text-muted">
          Member since: {state.joined} (
          {Math.floor(
            (new Date() - new Date(state.joined)) / (1000 * 60 * 60 * 24),
          )}{" "}
          days)
        </span>
        {state.currentStatus !== "Active" && (
          <span className="text-muted">Last Online: {state.lastOnline}</span>
        )}
        {!isEdit &&
          <NavLink to="edit" as={Button} className="user-edit-btn m-2 p-2">
            <FontAwesomeIcon icon={faPenToSquare} />
          </NavLink>
        }
      </Card>

      <Card className="user-card flex-fill my-4">
        <Card.Body>
          <Row xs={1} md={1}>
            <Col className="mb-2">
              <Card.Title>Activity Board</Card.Title>
              <ActivityBoard activity={state.activity} />
            </Col>
            <Col className="mb-2">
              <Card.Title>Statistics</Card.Title>
              <Row xs={2} md={4} className="g-3 mb-3 text-center">
                <Col>
                  <div className="fs-3 fw-bold">{completedCourses}</div>
                  <div className="text-muted small">Completed courses</div>
                </Col>
                <Col>
                  <div className="fs-3 fw-bold">{ongoingCourses}</div>
                  <div className="text-muted small">Ongoing courses</div>
                </Col>
                <Col>
                  <div className="fs-3 fw-bold">{lessonsCompleted}</div>
                  <div className="text-muted small">Lessons completed</div>
                </Col>
                <Col>
                  <div className="fs-3 fw-bold">{state.role}</div>
                  <div className="text-muted small">Role</div>
                </Col>
              </Row>
              <div className="d-flex justify-content-between">
                <span className="fw-bold">Lesson completion</span>
                <span className="text-muted">
                  {lessonsCompleted} / {totalLessons}
                </span>
              </div>
              <ProgressBar
                now={completionRate}
                label={`${completionRate}%`}
                variant="success"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {isEdit && (
        <Row className="mb-4">
          <Col className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => navigate("/my-profile")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

MyProfile.propTypes = {
  isEdit: PropTypes.bool,
};

export default MyProfile;
