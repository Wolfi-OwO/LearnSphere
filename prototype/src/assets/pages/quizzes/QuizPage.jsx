import React, { useState } from "react";
import { Container, Card, Button, Form, Alert, ProgressBar } from "react-bootstrap";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { quizzes } from "../../data/mockData.js";
import { useAppStore, ACTIONS } from "../../store/AppStore.jsx";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAppStore();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const quiz = quizzes[quizId];
  if (!quiz) return <Navigate to="/courses" replace />;

  const select = (questionId, optionId) =>
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

  const allAnswered = quiz.questions.every((q) => answers[q.id]);

  const submit = () => {
    const correct = quiz.questions.filter((q) => {
      const chosen = q.options.find((o) => o.id === answers[q.id]);
      return chosen && chosen.correct;
    }).length;
    const score = Math.round((correct / quiz.questions.length) * 100);
    setResult({ correct, total: quiz.questions.length, score });
    dispatch({ type: ACTIONS.RECORD_QUIZ_RESULT, quizId, score });
  };

  const retry = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h2 className="mb-3">{quiz.title}</h2>

      {result && (
        <Alert variant={result.score >= 50 ? "success" : "danger"}>
          <Alert.Heading>
            You scored {result.score}% ({result.correct}/{result.total})
          </Alert.Heading>
          <ProgressBar
            now={result.score}
            variant={result.score >= 50 ? "success" : "danger"}
            className="my-2"
          />
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={retry}>Retry</Button>
            <Button onClick={() => navigate(-1)}>Back to lesson</Button>
          </div>
        </Alert>
      )}

      {quiz.questions.map((q, i) => {
        const chosen = answers[q.id];
        return (
          <Card key={q.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6">
                {i + 1}. {q.text}
              </Card.Title>
              {q.options.map((o) => {
                const showResult = Boolean(result);
                let variant = "";
                if (showResult && o.correct) variant = "text-success fw-bold";
                else if (showResult && chosen === o.id && !o.correct) variant = "text-danger";
                return (
                  <Form.Check
                    key={o.id}
                    type="radio"
                    id={`${q.id}-${o.id}`}
                    name={q.id}
                    label={o.text}
                    className={variant}
                    checked={chosen === o.id}
                    disabled={showResult}
                    onChange={() => select(q.id, o.id)}
                  />
                );
              })}
            </Card.Body>
          </Card>
        );
      })}

      {!result && (
        <Button onClick={submit} disabled={!allAnswered}>
          Submit answers
        </Button>
      )}
    </Container>
  );
}
