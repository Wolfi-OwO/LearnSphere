import React, { useReducer } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Badge,
  Button,
} from "react-bootstrap";
import ActivityBoard from "../../components/core/activity-board/ActivityBoard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./MyProfile.css"; // Add custom styles for better design
import { NavLink } from "react-router-dom"; // Corrected import for NavLink
import PropTypes from "prop-types";
import { initialState, reducer } from "./MyProfileReducer.js";



function MyProfile({ isEdit = false }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const completionRate = Math.round(
    (state.lessonsCompleted / state.totalLessons) * 100,
  );

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
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button>
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

MyProfile.propTypes = {
  iSEdit: PropTypes.bool
}

export default MyProfile;
