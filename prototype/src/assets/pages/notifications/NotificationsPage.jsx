import React from "react";
import { Container, Card, Button, Badge, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useAppStore, ACTIONS } from "../../store/appStore.js";

export default function NotificationsPage() {
  const { state, dispatch } = useAppStore();
  const unread = state.notifications.filter((n) => !n.read).length;

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">
          Notifications {unread > 0 && <Badge bg="danger">{unread}</Badge>}
        </h2>
        {unread > 0 && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => dispatch({ type: ACTIONS.READ_ALL_NOTIFICATIONS })}
          >
            Mark all read
          </Button>
        )}
      </div>

      <Card className="shadow-sm">
        <ListGroup variant="flush">
          {state.notifications.length === 0 && (
            <ListGroup.Item className="text-muted">No notifications.</ListGroup.Item>
          )}
          {state.notifications.map((n) => (
            <ListGroup.Item
              key={n.id}
              action
              onClick={() => dispatch({ type: ACTIONS.READ_NOTIFICATION, notificationId: n.id })}
              className={`d-flex justify-content-between align-items-center ${n.read ? "" : "fw-bold bg-light"}`}
            >
              <span>
                <FontAwesomeIcon
                  icon={faBell}
                  className={`me-2 ${n.read ? "text-muted" : "text-warning"}`}
                />
                {n.message}
              </span>
              <span className="text-muted small fw-normal">{n.createdAt}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}
