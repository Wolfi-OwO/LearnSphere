import React from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup } from "react-bootstrap";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCirclePlay, faLock } from "@fortawesome/free-solid-svg-icons";
import { getCourse, countLessons } from "../../data/mockData.js";
import { useAppStore, ACTIONS } from "../../store/appStore.js";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppStore();
  const course = getCourse(courseId);

  if (!course) return <Navigate to="/courses" replace />;

  const enrolled = Boolean(state.enrollments[courseId]);
  const total = countLessons(course);
  const done = course.sessions.reduce(
    (sum, s) => sum + s.lessons.filter((l) => state.lessonProgress[l.id]).length,
    0,
  );
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <Container className="py-4">
      <Button variant="link" className="px-0 mb-2" onClick={() => navigate("/courses")}>
        ← Back to catalog
      </Button>

      <Card className="shadow-sm mb-4">
        <div style={{ height: 10, backgroundColor: course.color }} />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <Badge bg="light" text="dark" className="me-2">{course.category}</Badge>
              <Badge bg="info">{course.level}</Badge>
              <h2 className="mt-2 mb-1">{course.title}</h2>
              <p className="text-muted mb-2">by {course.instructor}</p>
            </div>
            {enrolled ? (
              <Button
                variant="outline-danger"
                onClick={() => dispatch({ type: ACTIONS.UNENROLL, courseId })}
              >
                Leave course
              </Button>
            ) : (
              <Button onClick={() => dispatch({ type: ACTIONS.ENROLL, courseId })}>
                Enroll now
              </Button>
            )}
          </div>
          <p>{course.description}</p>
          {enrolled && (
            <>
              <div className="d-flex justify-content-between small">
                <span>Progress</span>
                <span>{done} / {total} lessons</span>
              </div>
              <ProgressBar now={pct} label={`${pct}%`} variant="success" />
            </>
          )}
        </Card.Body>
      </Card>

      {course.sessions.map((session) => (
        <Card key={session.id} className="mb-3 shadow-sm">
          <Card.Header className="fw-bold">{session.title}</Card.Header>
          <ListGroup variant="flush">
            {session.lessons.map((lesson) => {
              const completed = state.lessonProgress[lesson.id];
              return (
                <ListGroup.Item
                  key={lesson.id}
                  action={enrolled}
                  disabled={!enrolled}
                  onClick={enrolled ? () => navigate(`/lessons/${lesson.id}`) : undefined}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    <FontAwesomeIcon
                      icon={!enrolled ? faLock : completed ? faCircleCheck : faCirclePlay}
                      className={`me-2 ${completed ? "text-success" : "text-muted"}`}
                    />
                    {lesson.title}
                  </span>
                  <span className="text-muted small">{lesson.duration}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      ))}

      {!enrolled && (
        <p className="text-muted">Enroll to unlock the lessons in this course.</p>
      )}
    </Container>
  );
}
