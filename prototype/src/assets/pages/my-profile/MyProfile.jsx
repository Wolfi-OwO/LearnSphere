import React from "react";
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

function MyProfile() {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "January 2023",
    completedCourses: 12,
    ongoingCourses: 3,
    totalLessons: 120,
    lessonsCompleted: 95,
    lastOnline: "February 10, 2026",
    currentStatus: "Active",
    role: "Student",
    activity: generateWeekdayArrays(2026), // Sample activity data for the Activity Board
  };

  const completionRate = Math.round(
    (userData.lessonsCompleted / userData.totalLessons) * 100,
  );

  return (
    <Container fluid className="my-profile-page mt-4">
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
                  userData.currentStatus === "Active" ? "success" : "secondary"
                }
                className="status-badge"
              ></Badge>
            </div>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <Card.Title className="fs-4 fw-bold">
                    {userData.name}
                  </Card.Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Subtitle className="fs-6">
                    {userData.email}
                  </Card.Subtitle>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <span className="text-muted">
          Member since: {userData.joined} (
          {Math.floor(
            (new Date() - new Date(userData.joined)) / (1000 * 60 * 60 * 24),
          )}{" "}
          days)
        </span>
        {userData.currentStatus !== "Active" && (
          <span className="text-muted">Last Online: {userData.lastOnline}</span>
        )}
        <NavLink to="edit" as={Button} className="user-edit-btn m-2 p-2">
          <FontAwesomeIcon icon={faPenToSquare} />
        </NavLink>
      </Card>

      <Card className="user-card mt-4">
        <Card.Body>
          <Row xs={1} md={2}>
            <Col>
              <Card.Title>Activity Board</Card.Title>
              <ActivityBoard activity={userData.activity} />
            </Col>
            <Col>
              <Card.Title>Statistics</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

function generateWeekdayArrays(year) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekdaysArray = daysOfWeek.map(() => []);
  let date = new Date(year, 0, 1);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // first Monday

  while (date.getFullYear() <= year) {
    const weekdayIndex = (date.getDay() + 6) % 7;
    weekdaysArray[weekdayIndex].push({
      date: date.toISOString().split("T")[0],
      day: daysOfWeek[weekdayIndex],
      description: `Activity on ${date.toDateString()}`,
    });
    date.setDate(date.getDate() + 1);
  }
  return weekdaysArray;
}

export default MyProfile;
