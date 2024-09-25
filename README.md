Employee Work Time Monitoring System
Overview

The Employee Work Time Monitoring System is a web application built using MEAN architecture that enables companies to track and manage employee work hours. The system provides real-time data on employee attendance, work start/end times, and the total hours worked. This is crucial for optimizing productivity and maintaining transparency in the workplace.
Features

    Real-time monitoring of employee work hours.
    Start/End Work Session: Employees can log in to start and end their work sessions.
    Daily, Weekly, and Monthly Reports: Admins can view detailed reports of employees' work hours.
    Role-based Access Control (RBAC): Different access levels for employees, managers, and admins.
    Mobile-friendly Interface: Optimized for both desktop and mobile use.

Prerequisites

Before setting up the project, ensure you have the following:

    Node.js (version 14.x or above)
    Next.js (version 12.x or above)
    PostgreSQL database
    Docker

Setup Instructions
1. Clone the Repository

git clone https://github.com/elena-risteska/wp-app
cd wp-app

2. Install Dependencies

npm install

3. Environment Variables

Create a .env.local file at the root of your project and configure the following environment variables:

DATABASE_URL=<your-database-connection-url>
JWT_SECRET=<your-jwt-secret>
NEXT_PUBLIC_API_URL=<backend-api-url>

4. Run Migrations

Run the necessary migrations for your database setup:

npx prisma migrate dev

5. Start the Development Server

npm run dev

This will run the application on http://localhost:3000.

Core Components
1. Employee Dashboard

Employees log in and access a dashboard where they can:

    Start Work: A button that records the start time of the employee's work session.
    End Work: A button to stop the work session, saving the end time.
    Work Session History: Employees can view their past work sessions and total hours worked.

2. HR Dashboard

Admin users have access to additional functionality:

    Employee Overview: View all employee data, including daily/weekly/monthly reports.
    Employee Management: Add or remove employees, assign roles, and manage accounts.
    Work Hours Reports: Generate detailed reports on the total work hours for individuals or teams.

3. API Endpoints
Authentication API

    POST /api/auth/login: Login to the system and receive a JWT token.
    POST /api/auth/register: Register a new employee.

Work Session API

4. Database Models

Using Prisma, the following database models are set up:

    User: Stores employee data (id, name, role, etc.).
    WorkSession: Stores individual work session data (startTime, endTime, duration, userId).

Example schema for Prisma:

prisma

model User {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  password String
  role     String   // admin, employee
  sessions WorkSession[]
}

model WorkSession {
  id        Int      @id @default(autoincrement())
  startTime DateTime
  endTime   DateTime
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}

Authentication

The system uses JWT (JSON Web Tokens) for secure authentication. Each user logs in with their credentials, and a token is generated that must be included in subsequent API requests.
Example JWT Header:

json

{
  "Authorization": "Bearer <token>"
}

Ensure all protected API routes check for a valid token before proceeding.
Reports and Analytics
Report Types

    Daily Report: Summarizes the hours worked on a specific day.
    Weekly Report: Provides a weekly summary, including total hours worked and average hours per day.
    Monthly Report: Displays an overview of all hours worked in the current month.

Visualization

Reports are visualized using Chart.js for clear and intuitive graphs.
Deployment

To deploy the application, follow these steps:

    Build the application:

npm run build

Start the production server:

    npm run start

Alternatively, you can deploy to platforms like Vercel, Netlify, or AWS by following their deployment guides for Next.js applications.
Contributing

To contribute to the project, please fork the repository and create a pull request. Ensure all code changes are thoroughly tested and documented.

This documentation provides a detailed overview and setup instructions for the Next.js Employee Work Time Monitoring System. It can be expanded based on specific features or integrations you plan to include.
