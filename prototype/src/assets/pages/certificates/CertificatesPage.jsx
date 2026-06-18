import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { currentUser } from "../../data/mockData.js";
import { useAppStore } from "../../store/appStore.js";

export default function CertificatesPage() {
  const { state } = useAppStore();

  return (
    <Container className="py-4">
      <h2 className="mb-1">Certificates</h2>
      <p className="text-muted">Certificates you have earned by completing courses.</p>

      {state.certificates.length === 0 ? (
        <p className="text-muted">No certificates yet — complete a course to earn one!</p>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {state.certificates.map((cert) => (
            <Col key={cert.id}>
              <Card className="shadow-sm text-center border-warning">
                <Card.Body>
                  <FontAwesomeIcon icon={faAward} className="text-warning mb-3" size="3x" />
                  <Card.Title>Certificate of Completion</Card.Title>
                  <p className="mb-1">This certifies that</p>
                  <h4>{currentUser.name}</h4>
                  <p className="mb-1">has successfully completed</p>
                  <h5 className="fw-bold">{cert.courseTitle}</h5>
                  <p className="text-muted small">Issued on {cert.issuedAt}</p>
                  <Button variant="outline-warning" size="sm">Download PDF</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
