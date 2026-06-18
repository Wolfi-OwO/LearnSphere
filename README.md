# LearnSphere

## Overview

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

## Development Diary

This section will document the development history of the application, including major milestones, challenges faced, and solutions implemented. It will provide insights into the development process and the evolution of the application over time.

**10.02.2026** - Initial project setup and creation of the application overview document. Defined the purpose, key features, and architecture of the application.
**11.02.2026** - Added use case overview and detailed use case documents.
**18.06.2026** - Built the first interactive prototype (React + Vite + Bootstrap): main layout, home leaderboard podium, and an editable user profile page with an activity board. Migrated the repository to GitHub.

## Prototype

A clickable frontend prototype lives in [`prototype/`](prototype/). It is built with React 19, Vite and React-Bootstrap.

```bash
# Clone the repository
git clone https://github.com/Wolfi-OwO/LearnSphere.git

# Navigate to the prototype
cd LearnSphere/prototype

# Install dependencies
npm install

# Start the dev server
npm run dev

# Lint and build
npm run lint
npm run build
```



## Developer Notes

### How to test the application

There two ways how to test the application:

1. Cloning the repository and running the tests locally.

    ```bash
    # Clone the repository

    git clone https://github.com/Wolfi-OwO/LearnSphere.git

    # Navigate to the project directory
    cd learning-app/app

    # Install dependencies
    npm install

    # run the tests
    npm test # or npm run test
    ```

2. Using the CI/CD pipeline to run tests automatically on each commit or pull request.

### How to run the application

There are two three ways on how to run the application:

1. Running the application locally using a development server.

    ```bash
    # Clone the Repository
    git clone https://github.com/Wolfi-OwO/LearnSphere.git

    # Navigate to the project directory
    cd learning-app/app/client

    # Install dependencies
    npm install

    # Build the frontend
    npm run build
    
    # go back to the root app directory
    cd ..

    # start the application
    npm start # or npm run start
    ```

2. Using Docker to containerize the application and run it in a consistent environment.

    ```bash
    # Clone the Repository
    docker pull example-registry/learning-app:latest

    # Create a virtual network for the application
    docker network create learning-app-network

    # Run the MongoDB Database

    docker run -d \
        --name learning-app-mongodb \
        --network learning-app-network \
        -p 27017:27017 \
        mongo:latest


    # Run the Docker container
    docker run --rm \
        --network learning-app-network \
        -p 8080:8080 \
        example-registry/learning-app:latest
    ```

3. Testing the deployed application on a staging or production environment to ensure it works as expected.

    ```bash
    # Access the deployed application
    http://your-deployment-url.com
    ```

### How to build the application

To build the application, you can use the following commands:

```bash
# Clone the Repository
git clone https://github.com/Wolfi-OwO/LearnSphere.git

# Navigate to the project directory
cd learning-app/app/client

# Install dependencies
npm install

# Build the frontend
npm run build

# go back to the root app directory
cd ..

# Build the Docker image
docker build -t learning-app:local .

# Tag the Docker image
docker tag learning-app:local example-registry/learning-app:v1.0.0
docker tag learning-app:local example-registry/learning-app:latest

# Push the Docker image to the registry
docker push example-registry/learning-app:v1.0.0
docker push example-registry/learning-app:latest
```

> **Info:** The above commands are examples and may need to be adjusted based on the specific setup and configuration of the application. Always refer to the official documentation for the most accurate and up-to-date instructions. The placeholder URLs will be later replaced with the correct URLs.
