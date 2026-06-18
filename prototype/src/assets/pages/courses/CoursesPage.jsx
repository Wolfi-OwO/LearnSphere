import React from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { courses, countLessons } from "../../data/mockData.js";
import { useAppStore, ACTIONS } from "../../store/appStore.js";

export default function CoursesPage() {
  const { state, dispatch } = useAppStore();
  const navigate = useNavigate();

  const lessonsDone = (course) =>
    course.sessions.reduce(
      (sum, s) => sum + s.lessons.filter((l) => state.lessonProgress[l.id]).length,
      0,
    );

  return (
    <Container className="py-4">
      <h2 className="mb-1">Course Catalog</h2>
      <p className="text-muted">Browse courses and enroll to start learning.</p>
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course) => {
          const enrolled = Boolean(state.enrollments[course.id]);
          const total = countLessons(course);
          const done = lessonsDone(course);
          const pct = total ? Math.round((done / total) * 100) : 0;
          return (
            <Col key={course.id}>
              <Card className="h-100 shadow-sm">
                <div style={{ height: 8, backgroundColor: course.color }} />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="light" text="dark">{course.category}</Badge>
                    <Badge bg="info">{course.level}</Badge>
                  </div>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="text-muted mb-2 small">
                    by {course.instructor}
                  </Card.Subtitle>
                  <Card.Text className="flex-fill">{course.description}</Card.Text>
                  {enrolled && (
                    <ProgressBar
                      now={pct}
                      label={`${pct}%`}
                      variant="success"
                      className="mb-2"
                    />
                  )}
                  <div className="d-flex gap-2 mt-auto">
                    <Button
                      variant="outline-primary"
                      className="flex-fill"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      View
                    </Button>
                    {enrolled ? (
                      <Button variant="success" className="flex-fill" disabled>
                        Enrolled
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="flex-fill"
                        onClick={() =>
                          dispatch({ type: ACTIONS.ENROLL, courseId: course.id })
                        }
                      >
                        Enroll
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
