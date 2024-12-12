# Chat Application

A simple real-time chat application built using **Next.js**, **Socket.IO**, **Redis**, and **Express**. Authentication is handled with **NextAuth**. This application allows users to create password-protected chat rooms, share the room links, and chat securely within the rooms.

## Features

- **User Authentication**: Login securely using NextAuth.
- **Room Creation**: Authenticated users can create chat rooms with a unique name and a password.
- **Secure Room Access**: Users must enter their name and the correct room password to join a chat room.
- **Real-Time Chat**: Messages are exchanged in real-time using Socket.IO.
- **Scalability**: Redis is used to store and manage session data and room information.

## Tech Stack

- **Next.js**: Frontend framework for server-side rendering and seamless integration with APIs.
- **Socket.IO**: Enables real-time, bidirectional communication between clients and the server.
- **Redis**: Used as a fast and reliable in-memory data store for managing chat rooms and session data.
- **Express**: Backend framework for handling API routes and WebSocket connections.
- **NextAuth**: Provides authentication mechanisms for the app.

## Getting Started

Follow these steps to set up and run the chat application locally.

### Prerequisites

- Node.js (v16 or higher)
- Redis server
- A Git client

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and configure the following variables:

   ```env
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your_nextauth_secret>

   # Redis
   REDIS_URL=redis://localhost:6379

   # Socket.IO
   SOCKET_SERVER_URL=http://localhost:3000
   ```

4. **Start the Redis server**:

   Ensure Redis is running on your machine. Use the following command to start it:

   ```bash
   redis-server
   ```

5. **Run the development server**:

   ```bash
   bun dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. **Login**:

   - Navigate to the login page and authenticate using your credentials.

2. **Create a Room**:

   - After logging in, create a chat room by specifying a name and a password.

3. **Share Room Link**:

   - Copy the generated room link and share it with others.

4. **Join a Room**:

   - Enter the room link, your name, and the room password to join the chat.

5. **Chat**:
   - Start chatting in real-time with other participants in the room.

## Scripts

- **`npm run dev`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Starts the production server.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](issues_url) to contribute.

---

Happy Chatting! 🎉
