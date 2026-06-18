// Central mock data for the LearnSphere prototype.
// This stands in for the future backend (see orginizational/application-overview.md).

export const currentUser = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://placehold.co/120",
  joined: "January 2023",
  role: "Student",
  currentStatus: "Active",
  lastOnline: "February 10, 2026",
};

// Leaderboard / community users
export const users = [
  { id: "u2", name: "Alice", score: 980, avatar: "https://placehold.co/80/ffadad/000?text=A" },
  { id: "u3", name: "Bob", score: 870, avatar: "https://placehold.co/80/a0c4ff/000?text=B" },
  { id: "u4", name: "Charlie", score: 820, avatar: "https://placehold.co/80/caffbf/000?text=C" },
  { id: "u1", name: "John Doe", score: 760, avatar: "https://placehold.co/80/fdffb6/000?text=J" },
  { id: "u5", name: "Diana", score: 640, avatar: "https://placehold.co/80/bdb2ff/000?text=D" },
  { id: "u6", name: "Evan", score: 510, avatar: "https://placehold.co/80/ffc6ff/000?text=E" },
];

export const quizzes = {
  q1: {
    id: "q1",
    title: "Variables & Expressions Check",
    questions: [
      {
        id: "q1-1",
        text: "What is a variable?",
        type: "MULTIPLE_CHOICE",
        options: [
          { id: "a", text: "A fixed number", correct: false },
          { id: "b", text: "A symbol that represents a value", correct: true },
          { id: "c", text: "A type of equation", correct: false },
        ],
      },
      {
        id: "q1-2",
        text: "The expression 3x + 2 is linear.",
        type: "TRUE_FALSE",
        options: [
          { id: "a", text: "True", correct: true },
          { id: "b", text: "False", correct: false },
        ],
      },
    ],
  },
  q2: {
    id: "q2",
    title: "Loops Knowledge Check",
    questions: [
      {
        id: "q2-1",
        text: "Which loop runs at least once?",
        type: "MULTIPLE_CHOICE",
        options: [
          { id: "a", text: "for loop", correct: false },
          { id: "b", text: "while loop", correct: false },
          { id: "c", text: "do...while loop", correct: true },
        ],
      },
      {
        id: "q2-2",
        text: "An infinite loop never terminates on its own.",
        type: "TRUE_FALSE",
        options: [
          { id: "a", text: "True", correct: true },
          { id: "b", text: "False", correct: false },
        ],
      },
    ],
  },
};

export const courses = [
  {
    id: "c1",
    title: "Introduction to Algebra",
    description:
      "Build a solid foundation in algebra: variables, expressions, and solving equations step by step.",
    instructor: "Dr. Ada Lovelace",
    category: "Mathematics",
    level: "Beginner",
    color: "#a0c4ff",
    sessions: [
      {
        id: "s1",
        title: "Foundations",
        lessons: [
          {
            id: "l1",
            title: "Variables and Expressions",
            duration: "12 min",
            content:
              "A variable is a symbol that stands in for a value we don't yet know. In algebra we combine variables and numbers into expressions such as 3x + 2. Learning to read and build expressions is the first step toward solving equations.",
            resources: [
              { type: "VIDEO", title: "Intro video", url: "https://example.com/video" },
              { type: "PDF", title: "Worksheet 1", url: "https://example.com/worksheet.pdf" },
            ],
            quizId: "q1",
          },
          {
            id: "l2",
            title: "Solving Linear Equations",
            duration: "18 min",
            content:
              "To solve a linear equation we isolate the variable using inverse operations, keeping both sides balanced. Practice with one-step and two-step equations.",
            resources: [
              { type: "LINK", title: "Practice problems", url: "https://example.com/practice" },
            ],
            quizId: null,
          },
        ],
      },
      {
        id: "s2",
        title: "Going Further",
        lessons: [
          {
            id: "l3",
            title: "Systems of Equations",
            duration: "22 min",
            content:
              "A system of equations is two or more equations sharing the same variables. We can solve them by substitution or elimination.",
            resources: [],
            quizId: null,
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    title: "Programming Fundamentals",
    description:
      "Start coding from scratch. Learn variables, control flow, loops, and functions with hands-on examples.",
    instructor: "Grace Hopper",
    category: "Computer Science",
    level: "Beginner",
    color: "#caffbf",
    sessions: [
      {
        id: "s3",
        title: "Getting Started",
        lessons: [
          {
            id: "l4",
            title: "Your First Program",
            duration: "10 min",
            content:
              "Every journey starts with a single line of code. We'll write a program that prints a message to the screen and explore how code is executed top to bottom.",
            resources: [
              { type: "VIDEO", title: "Setup guide", url: "https://example.com/setup" },
            ],
            quizId: null,
          },
          {
            id: "l5",
            title: "Loops and Iteration",
            duration: "16 min",
            content:
              "Loops let us repeat work without rewriting it. We'll compare for, while and do...while loops and learn when to use each.",
            resources: [
              { type: "INFO_TEXT", title: "Cheat sheet", url: "https://example.com/loops" },
            ],
            quizId: "q2",
          },
        ],
      },
    ],
  },
  {
    id: "c3",
    title: "Spanish for Beginners",
    description:
      "Greet, introduce yourself, and hold simple conversations in Spanish. Perfect for absolute beginners.",
    instructor: "Sofía Reyes",
    category: "Languages",
    level: "Beginner",
    color: "#ffd6a5",
    sessions: [
      {
        id: "s4",
        title: "First Words",
        lessons: [
          {
            id: "l6",
            title: "Greetings",
            duration: "8 min",
            content:
              "Hola, buenos días, buenas tardes. In this lesson you'll learn the most common Spanish greetings and how to introduce yourself.",
            resources: [],
            quizId: null,
          },
        ],
      },
    ],
  },
];

// Helper lookups used across pages.
export const lessonsById = {};
export const courseByLessonId = {};
courses.forEach((course) => {
  course.sessions.forEach((session) => {
    session.lessons.forEach((lesson) => {
      lessonsById[lesson.id] = lesson;
      courseByLessonId[lesson.id] = course.id;
    });
  });
});

export function getCourse(courseId) {
  return courses.find((c) => c.id === courseId);
}

export function countLessons(course) {
  return course.sessions.reduce((sum, s) => sum + s.lessons.length, 0);
}

// Mutable-ish seed state managed by the AppStore reducer.
export const initialEnrollments = {
  c1: { courseId: "c1", status: "ACTIVE", enrolledAt: "2026-01-15" },
  c2: { courseId: "c2", status: "ACTIVE", enrolledAt: "2026-02-01" },
};

export const initialLessonProgress = {
  l1: true,
  l2: true,
  l4: true,
};

export const initialInvites = [
  {
    id: "inv1",
    direction: "received",
    courseId: "c3",
    from: "Sofía Reyes",
    message: "Join my Spanish study group!",
    status: "PENDING",
  },
  {
    id: "inv2",
    direction: "sent",
    courseId: "c1",
    to: "maria@example.com",
    message: "Let's learn algebra together.",
    status: "PENDING",
  },
];

export const initialNotifications = [
  { id: "n1", message: "Alice passed you on the leaderboard!", read: false, createdAt: "2026-06-17" },
  { id: "n2", message: "New lesson added to Programming Fundamentals.", read: false, createdAt: "2026-06-15" },
  { id: "n3", message: "You earned a certificate for Introduction to Algebra.", read: true, createdAt: "2026-06-10" },
];

export const initialCertificates = [
  { id: "cert1", courseId: "c1", courseTitle: "Introduction to Algebra", issuedAt: "2026-06-10" },
];

export const initialComments = {
  l1: [
    { id: "cm1", author: "Bob", content: "Great explanation of variables!", createdAt: "2026-06-12" },
  ],
};
