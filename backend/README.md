# Nyirol Institute of Innovation and Technology - Backend

This is the backend server for the Nyirol Institute of Innovation and Technology website. It provides APIs for the website and an admin dashboard for managing the institute's operations.

## Features

- **User Authentication**: Secure login system for admin, staff, and instructors
- **Application Management**: Process and review student applications
- **Program Management**: Create and manage educational programs and specializations
- **Student Management**: Track student enrollment, progress, and outcomes
- **Donation System**: Process and manage donations
- **Volunteer Management**: Handle volunteer applications and assignments
- **Admin Dashboard**: Comprehensive dashboard for institute management

## Technology Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **MySQL**: Relational database
- **Sequelize**: ORM for database interactions
- **JWT**: Authentication using JSON Web Tokens
- **bcrypt**: Password hashing
- **EJS**: Templating engine for admin views

## Project Structure

```
backend/
├── database/           # Database scripts and migrations
├── public/             # Static assets for admin dashboard
├── src/                # Source code
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
├── views/              # EJS templates for admin dashboard
└── app.js              # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example` and configure your environment variables
5. Create the database:
   ```
   mysql -u root -p
   CREATE DATABASE nyirol_institute;
   exit;
   ```
6. Run database migrations and seed data:
   ```
   node database/seed.js
   ```

### Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `GET /api/auth/me`: Get current user
- `POST /api/auth/change-password`: Change password
- `POST /api/auth/request-password-reset`: Request password reset
- `POST /api/auth/reset-password`: Reset password

### Applications

- `POST /api/applications`: Submit new application
- `GET /api/applications`: Get all applications (admin/staff)
- `GET /api/applications/:id`: Get application by ID (admin/staff)
- `PUT /api/applications/:id/status`: Update application status (admin/staff)
- `GET /api/applications/deadline/:programId`: Check application deadline status
- `GET /api/applications/statistics`: Get application statistics (admin/staff)

### Programs

- `GET /api/programs`: Get all programs
- `GET /api/programs/:id`: Get program by ID
- `POST /api/programs`: Create new program (admin)
- `PUT /api/programs/:id`: Update program (admin)
- `DELETE /api/programs/:id`: Delete program (admin)
- `GET /api/programs/specializations`: Get all specializations
- `POST /api/programs/specializations`: Create new specialization (admin)
- `PUT /api/programs/specializations/:id`: Update specialization (admin)
- `GET /api/programs/courses`: Get all courses
- `POST /api/programs/courses`: Create new course (admin)

## Admin Dashboard

The admin dashboard is accessible at `/admin` and provides a user interface for managing all aspects of the institute. Different user roles have different levels of access:

- **Admin**: Full access to all features
- **Staff**: Access to applications, students, donations, and volunteers
- **Instructor**: Access to courses and student progress

Default admin credentials:
- Email: admin@nyirolinstitute.org
- Password: Admin123!

## Application Deadline System

The system automatically checks application deadlines when students apply. If a deadline has passed, the student will receive a message indicating that applications are closed and to check back for future opportunities.

Deadlines are configured in the `.env` file:
```
DIGITAL_LITERACY_DEADLINE=2025-08-15T23:59:59.999Z
TECH_SPECIALIZATION_DEADLINE=2025-09-01T23:59:59.999Z
UNIVERSITY_PATHWAY_DEADLINE=2025-11-30T23:59:59.999Z
```