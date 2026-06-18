import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form } from "react-bootstrap";
import { courses, getCourse } from "../../data/mockData.js";
import { useAppStore, ACTIONS } from "../../store/AppStore.jsx";

const STATUS_VARIANT = {
  PENDING: "warning",
  ACCEPTED: "success",
  DECLINED: "secondary",
};

export default function InvitesPage() {
  const { state, dispatch } = useAppStore();
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState(courses[0].id);
  const [message, setMessage] = useState("");

  const received = state.invites.filter((i) => i.direction === "received");
  const sent = state.invites.filter((i) => i.direction === "sent");

  const send = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    dispatch({ type: ACTIONS.SEND_INVITE, to: email.trim(), courseId, message: message.trim() });
    setEmail("");
    setMessage("");
  };

  return (
    <Container className="py-4">
      <h2 className="mb-1">Invitations</h2>
      <p className="text-muted">Invite friends to learn with you and respond to invites you receive.</p>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="fw-bold">Received ({received.length})</Card.Header>
            <ListGroup variant="flush">
              {received.length === 0 && (
                <ListGroup.Item className="text-muted">No invitations.</ListGroup.Item>
              )}
              {received.map((inv) => {
                const course = getCourse(inv.courseId);
                return (
                  <ListGroup.Item key={inv.id}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{inv.from}</strong> invited you to{" "}
                        <em>{course?.title}</em>
                        <div className="text-muted small">{inv.message}</div>
                      </div>
                      <Badge bg={STATUS_VARIANT[inv.status]}>{inv.status}</Badge>
                    </div>
                    {inv.status === "PENDING" && (
                      <div className="d-flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => dispatch({ type: ACTIONS.ACCEPT_INVITE, inviteId: inv.id })}
                        >
                          Accept & enroll
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => dispatch({ type: ACTIONS.DECLINE_INVITE, inviteId: inv.id })}
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Sent ({sent.length})</Card.Header>
            <ListGroup variant="flush">
              {sent.length === 0 && (
                <ListGroup.Item className="text-muted">No invitations sent yet.</ListGroup.Item>
              )}
              {sent.map((inv) => {
                const course = getCourse(inv.courseId);
                return (
                  <ListGroup.Item key={inv.id} className="d-flex justify-content-between align-items-start">
                    <div>
                      To <strong>{inv.to}</strong> — <em>{course?.title}</em>
                      {inv.message && <div className="text-muted small">{inv.message}</div>}
                    </div>
                    <Badge bg={STATUS_VARIANT[inv.status]}>{inv.status}</Badge>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Invite a friend</Card.Header>
            <Card.Body>
              <Form onSubmit={send}>
                <Form.Group className="mb-3" controlId="inviteEmail">
                  <Form.Label>Friend's email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="inviteCourse">
                  <Form.Label>Course</Form.Label>
                  <Form.Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="inviteMessage">
                  <Form.Label>Message (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" disabled={!email.trim()}>Send invite</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
