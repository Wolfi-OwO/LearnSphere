import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form } from "react-bootstrap";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faFilePdf,
  faLink,
  faCircleInfo,
  faCircleCheck,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  lessonsById,
  courseByLessonId,
  getCourse,
  currentUser,
} from "../../data/mockData.js";
import { useAppStore, ACTIONS } from "../../store/appStore.js";

const RESOURCE_ICONS = {
  VIDEO: faVideo,
  PDF: faFilePdf,
  LINK: faLink,
  INFO_TEXT: faCircleInfo,
};

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppStore();
  const [draft, setDraft] = useState("");

  const lesson = lessonsById[lessonId];
  if (!lesson) return <Navigate to="/courses" replace />;

  const courseId = courseByLessonId[lessonId];
  const course = getCourse(courseId);
  const completed = Boolean(state.lessonProgress[lessonId]);
  const comments = state.comments[lessonId] || [];

  // Flatten lessons to compute next/previous within the course.
  const flat = course.sessions.flatMap((s) => s.lessons);
  const index = flat.findIndex((l) => l.id === lessonId);
  const next = flat[index + 1];

  const toggleComplete = () =>
    dispatch({
      type: completed ? ACTIONS.UNCOMPLETE_LESSON : ACTIONS.COMPLETE_LESSON,
      lessonId,
    });

  const submitComment = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    dispatch({
      type: ACTIONS.ADD_COMMENT,
      lessonId,
      author: currentUser.name,
      content: draft.trim(),
    });
    setDraft("");
  };

  return (
    <Container className="py-4">
      <Button variant="link" className="px-0 mb-2" onClick={() => navigate(`/courses/${courseId}`)}>
        ← {course.title}
      </Button>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{lesson.title}</h2>
                {completed && <Badge bg="success">Completed</Badge>}
              </div>
              <p className="text-muted small">{lesson.duration}</p>
              <p style={{ lineHeight: 1.7 }}>{lesson.content}</p>

              <div className="d-flex gap-2 flex-wrap">
                <Button variant={completed ? "outline-success" : "success"} onClick={toggleComplete}>
                  <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
                  {completed ? "Mark as not complete" : "Mark as complete"}
                </Button>
                {lesson.quizId && (
                  <Button variant="primary" onClick={() => navigate(`/quizzes/${lesson.quizId}`)}>
                    <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                    Take quiz
                  </Button>
                )}
                {next && (
                  <Button variant="outline-primary" onClick={() => navigate(`/lessons/${next.id}`)}>
                    Next lesson →
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Discussion ({comments.length})</Card.Header>
            <ListGroup variant="flush">
              {comments.length === 0 && (
                <ListGroup.Item className="text-muted">
                  No comments yet. Be the first!
                </ListGroup.Item>
              )}
              {comments.map((c) => (
                <ListGroup.Item key={c.id}>
                  <div className="d-flex justify-content-between">
                    <strong>{c.author}</strong>
                    <span className="text-muted small">{c.createdAt}</span>
                  </div>
                  <div>{c.content}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <Form onSubmit={submitComment}>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Add a comment..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="mb-2"
                />
                <div className="d-flex justify-content-end">
                  <Button type="submit" disabled={!draft.trim()}>Post</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Resources</Card.Header>
            <ListGroup variant="flush">
              {lesson.resources.length === 0 && (
                <ListGroup.Item className="text-muted">No resources for this lesson.</ListGroup.Item>
              )}
              {lesson.resources.map((r) => (
                <ListGroup.Item key={r.url} action href={r.url} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={RESOURCE_ICONS[r.type] || faLink} className="me-2 text-primary" />
                  {r.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
