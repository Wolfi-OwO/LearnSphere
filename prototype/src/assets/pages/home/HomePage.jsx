import React from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PodiumLeaderBoard from "../../components/podium-leaderboard/PodiumLeaderBoard.jsx";
import { users, getCourse, countLessons, currentUser } from "../../data/mockData.js";
import { useAppStore } from "../../store/appStore.js";

export default function HomePage() {
  const { state } = useAppStore();
  const navigate = useNavigate();

  const topThree = [...users].sort((a, b) => b.score - a.score).slice(0, 3);

  const enrolledCourses = Object.keys(state.enrollments)
    .map(getCourse)
    .filter(Boolean);

  const lessonsDone = (course) =>
    course.sessions.reduce(
      (sum, s) => sum + s.lessons.filter((l) => state.lessonProgress[l.id]).length,
      0,
    );

  const totalCompleted = Object.values(state.lessonProgress).filter(Boolean).length;

  return (
    <Container className="py-4">
      <h2 className="mb-1">Welcome back, {currentUser.name.split(" ")[0]} 👋</h2>
      <p className="text-muted">Here's what's happening in your learning journey.</p>

      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <div className="fs-3 fw-bold">{enrolledCourses.length}</div>
              <div className="text-muted small">Active courses</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <div className="fs-3 fw-bold">{totalCompleted}</div>
              <div className="text-muted small">Lessons completed</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <div className="fs-3 fw-bold">{state.certificates.length}</div>
              <div className="text-muted small">Certificates</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <div className="fs-3 fw-bold">
                {state.notifications.filter((n) => !n.read).length}
              </div>
              <div className="text-muted small">Unread alerts</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm h-100">
            <Card.Header className="fw-bold d-flex justify-content-between align-items-center">
              Continue learning
              <Button variant="link" size="sm" className="p-0" onClick={() => navigate("/courses")}>
                Browse catalog
              </Button>
            </Card.Header>
            <Card.Body>
              {enrolledCourses.length === 0 && (
                <p className="text-muted mb-0">
                  You aren't enrolled in any courses yet.{" "}
                  <Button variant="link" className="p-0" onClick={() => navigate("/courses")}>
                    Find a course
                  </Button>
                </p>
              )}
              {enrolledCourses.map((course) => {
                const total = countLessons(course);
                const done = lessonsDone(course);
                const pct = total ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={course.id} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>{course.title}</strong>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        Resume
                      </Button>
                    </div>
                    <ProgressBar now={pct} label={`${pct}%`} variant="success" className="mt-1" />
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <Card.Header className="fw-bold">Leaderboard</Card.Header>
            <Card.Body>
              <PodiumLeaderBoard users={topThree} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
