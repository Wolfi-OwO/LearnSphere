import { Col, Container, Row, Image } from "react-bootstrap";

function Podium({ users }) {
  // users sorted: [1st, 2nd, 3rd]
  const [first, second, third] = users;

  return (
    <Container className="mt-5">
      <Row className="align-items-end justify-content-center text-center">

        {/* 2nd */}
        <Col xs={4} md={3}>
          <PodiumBlock
            user={second}
            place={2}
            height={180}
            bg="secondary"
          />
        </Col>

        {/* 1st */}
        <Col xs={4} md={3}>
          <PodiumBlock
            user={first}
            place={1}
            height={260}
            bg="warning"
            highlight
          />
        </Col>

        {/* 3rd */}
        <Col xs={4} md={3}>
          <PodiumBlock
            user={third}
            place={3}
            height={140}
            bg="bronze"
          />
        </Col>

      </Row>
    </Container>
  );
}

function PodiumBlock({ user, place, height, bg, highlight }) {
  return (
    <div className="d-flex flex-column align-items-center">

      <Image
        src={user.avatar}
        alt={user.name}
        roundedCircle
        width={80}
        height={80}
        className={`mb-2 border ${
          highlight ? "border-4 border-warning shadow-lg" : "border-2"
        }`}
      />

      <h6 className="mb-0">{user.name}</h6>
      <small className="text-muted mb-2">{user.score} pts</small>

      <div
        className={`w-100 text-white fw-bold d-flex align-items-center justify-content-center bg-${bg}`}
        style={{
          height: `${height}px`,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        {place}
      </div>
    </div>
  );
}

export default Podium