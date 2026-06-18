import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import {
  initialEnrollments,
  initialLessonProgress,
  initialInvites,
  initialNotifications,
  initialCertificates,
  initialComments,
} from "../data/mockData.js";

const AppStoreContext = createContext(null);

export const ACTIONS = {
  ENROLL: "ENROLL",
  UNENROLL: "UNENROLL",
  COMPLETE_LESSON: "COMPLETE_LESSON",
  UNCOMPLETE_LESSON: "UNCOMPLETE_LESSON",
  ADD_COMMENT: "ADD_COMMENT",
  ACCEPT_INVITE: "ACCEPT_INVITE",
  DECLINE_INVITE: "DECLINE_INVITE",
  SEND_INVITE: "SEND_INVITE",
  READ_NOTIFICATION: "READ_NOTIFICATION",
  READ_ALL_NOTIFICATIONS: "READ_ALL_NOTIFICATIONS",
  RECORD_QUIZ_RESULT: "RECORD_QUIZ_RESULT",
};

const initialState = {
  enrollments: initialEnrollments,
  lessonProgress: initialLessonProgress,
  comments: initialComments,
  invites: initialInvites,
  notifications: initialNotifications,
  certificates: initialCertificates,
  quizResults: {},
};

let idCounter = 1000;
const nextId = (prefix) => `${prefix}${++idCounter}`;

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ENROLL:
      if (state.enrollments[action.courseId]) return state;
      return {
        ...state,
        enrollments: {
          ...state.enrollments,
          [action.courseId]: {
            courseId: action.courseId,
            status: "ACTIVE",
            enrolledAt: new Date().toISOString().split("T")[0],
          },
        },
      };

    case ACTIONS.UNENROLL: {
      const enrollments = { ...state.enrollments };
      delete enrollments[action.courseId];
      return { ...state, enrollments };
    }

    case ACTIONS.COMPLETE_LESSON:
      return {
        ...state,
        lessonProgress: { ...state.lessonProgress, [action.lessonId]: true },
      };

    case ACTIONS.UNCOMPLETE_LESSON:
      return {
        ...state,
        lessonProgress: { ...state.lessonProgress, [action.lessonId]: false },
      };

    case ACTIONS.ADD_COMMENT: {
      const existing = state.comments[action.lessonId] || [];
      const comment = {
        id: nextId("cm"),
        author: action.author,
        content: action.content,
        createdAt: new Date().toISOString().split("T")[0],
      };
      return {
        ...state,
        comments: { ...state.comments, [action.lessonId]: [...existing, comment] },
      };
    }

    case ACTIONS.ACCEPT_INVITE: {
      const invite = state.invites.find((i) => i.id === action.inviteId);
      const invites = state.invites.map((i) =>
        i.id === action.inviteId ? { ...i, status: "ACCEPTED" } : i,
      );
      const enrollments =
        invite && !state.enrollments[invite.courseId]
          ? {
              ...state.enrollments,
              [invite.courseId]: {
                courseId: invite.courseId,
                status: "ACTIVE",
                enrolledAt: new Date().toISOString().split("T")[0],
              },
            }
          : state.enrollments;
      return { ...state, invites, enrollments };
    }

    case ACTIONS.DECLINE_INVITE:
      return {
        ...state,
        invites: state.invites.map((i) =>
          i.id === action.inviteId ? { ...i, status: "DECLINED" } : i,
        ),
      };

    case ACTIONS.SEND_INVITE:
      return {
        ...state,
        invites: [
          ...state.invites,
          {
            id: nextId("inv"),
            direction: "sent",
            courseId: action.courseId,
            to: action.to,
            message: action.message,
            status: "PENDING",
          },
        ],
      };

    case ACTIONS.READ_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.notificationId ? { ...n, read: true } : n,
        ),
      };

    case ACTIONS.READ_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };

    case ACTIONS.RECORD_QUIZ_RESULT:
      return {
        ...state,
        quizResults: { ...state.quizResults, [action.quizId]: action.score },
      };

    default:
      return state;
  }
}

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStoreContext.Provider>
  );
}

AppStoreProvider.propTypes = {
  children: PropTypes.node,
};

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within an AppStoreProvider");
  return ctx;
}
