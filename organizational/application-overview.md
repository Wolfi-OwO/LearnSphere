# Application Overview

This document provides an overview of the application, including its purpose, key features, and architecture.

## Purpose

The application is designed to help users learn and practice skills, topics and school subjects. It provides a platform for users to access educational content, track their progress, and engage with interactive learning materials.

## Key Features

- **Own Landing Page**: Users have a personalized landing page where they can access their courses, track their progress, and receive recommendations based on their interests and learning history.
- **Course Catalog**: A comprehensive catalog of courses covering a wide range of subjects and skills, allowing users to find content that matches their learning goals.
- **Progress Tracking**: Users can track their progress through courses, see their achievements, and receive feedback on their performance.
- **Interactive Learning Materials**: The application includes interactive quizzes, exercises, and multimedia content to enhance the learning experience and keep users engaged.
- **Community Features**: Users can connect with other learners, participate in discussions, and share their learning experiences.

**Later on:**

- **Personal AI Tutor**: An AI-powered tutor that provides personalized guidance, answers questions, and offers support to users as they navigate their learning journey.
- **Gamification Elements**: Incorporating gamification features such as badges, leaderboards, and rewards to motivate users and make learning more enjoyable.

## Architecture

This is a short overview which classes and components exist in the application and how they interact with each other. Notice, that the user doesn't has any saved password, because we will use OAuth 2.0 in our Application - connected with: Google and Microsoft.

```plantuml
@startuml

class User {
    UUID id
    String email
    String name
    String profilePictureUrl
    DateTime createdAt
    DateTime updatedAt
    DateTime lastActiveAt
    STATUS status
    ROLE role
}

enum STATUS {
    ONLINE
    OFFLINE
    IDLE
    IN_COURSE
}

enum ROLE {
    STUDENT
    INSTRUCTOR
    ADMIN
}

class Log {
    UUID id
    LOG_TYPE type
    String message
    DateTime timestamp
    UUID userId
    String entityType
    UUID entityId
}

enum LOG_TYPE {
    INFO
    WARNING
    ERROR
}

class Notification {
    UUID id
    UUID userId
    String message
    Boolean read
    DateTime createdAt
}

class Course {
    UUID id
    String title
    String description
    DateTime createdAt
    DateTime updatedAt
}

class Session {
    UUID id
    UUID courseId
    DateTime availableFrom
    DateTime availableTo
    DateTime createdAt
    DateTime updatedAt
}

class Enrollment {
    UUID id
    UUID userId
    UUID courseId
    ENROLLMENT_STATUS status
    DateTime enrolledAt
    DateTime completedAt
    Double progressPercentage
}

enum ENROLLMENT_STATUS {
    ACTIVE
    COMPLETED
    DROPPED
}

class Lesson {
    UUID id
    UUID sessionId
    String title
    String content
    Integer orderIndex
    DateTime createdAt
    DateTime updatedAt
}

class Resource {
    UUID id
    UUID lessonId
    RESOURCE_TYPE type
    String url
    DateTime createdAt
    DateTime updatedAt
}

enum RESOURCE_TYPE {
    VIDEO
    PDF
    LINK
    INFO_TEXT
}

class LessonProgress {
    UUID id
    UUID userId
    UUID lessonId
    Boolean completed
    DateTime completedAt
}

class Comment {
    UUID id
    UUID userId
    UUID lessonId
    String content
    DateTime createdAt
    DateTime updatedAt
}

class Quiz {
    UUID id
    UUID lessonId
    String title
    Integer totalQuestions
    DateTime createdAt
    DateTime updatedAt
}

class Question {
    UUID id
    UUID quizId
    String text
    QUESTION_TYPE type
    DateTime createdAt
    DateTime updatedAt
}

enum QUESTION_TYPE {
    MULTIPLE_CHOICE
    TRUE_FALSE
    SHORT_ANSWER
    ESTIMATION
}

class Answer {
    UUID id
    UUID questionId
    String text
    Boolean isCorrect
}

class QuizResult {
    UUID id
    UUID userId
    UUID quizId
    Double score
    DateTime completedAt
}

class Certificate {
    UUID id
    UUID userId
    UUID courseId
    DateTime issuedAt
    String certificateUrl
}

User "1" -- "*" Enrollment : enrolls >
User "1" -- "*" Log : generates >
User "1" -- "*" Course : creates >
User "1" -- "*" Session : creates >
User "1" -- "*" Lesson : creates >
User "1" -- "*" Quiz : creates >
User "1" -- "*" Question : creates >
User "1" -- "*" Answer: creates >
User "1" -- "*" Notification : receives >
User "1" -- "*" LessonProgress : tracks >
User "1" -- "*" QuizResult : completes >
User "1" -- "*" Comment : writes >

Course "1" -- "*" Session : has >
Course "1" -- "*" Enrollment : tracks >

Session "1" -- "*" Lesson : contains >

Lesson "1" -- "*" Resource : includes >
Lesson "1" -- "*" Quiz : contains >
Lesson "1" -- "*" LessonProgress : tracked by >
Lesson "1" -- "*" Comment : commented on >

Quiz "1" -- "*" Question : contains >
Question "1" -- "*" Answer : provides >

Course "1" -- "*" Certificate : issues >

@enduml
```
