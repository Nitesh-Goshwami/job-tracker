# Job Tracker

A modern, full-stack job tracking application built with React frontend and Node.js/Express backend with MongoDB database. **Now with user authentication and user-specific job tracking!** Each user can only see and manage their own job applications, ensuring complete privacy and data isolation.

## Features

- **🔐 User Authentication**: Secure user registration and login with JWT tokens
- **👤 User-Specific Data**: Each user can only access their own job applications
- **💾 Full-Stack Application**: React frontend with Node.js/Express backend
- **🗄️ Database Storage**: MongoDB database for persistent data storage
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🔍 Add Job Applications**: Track company name, position, location, status, and notes
- **📊 Status Management**: Monitor applications through different stages (Applied, Interviewing, Offered, Rejected)
- **📈 Statistics Dashboard**: Visual overview of your application progress
- **🔧 Filter & Search**: Filter applications by status
- **✏️ Edit & Delete**: Update job details and remove applications
- **🔒 Secure**: Password hashing, JWT authentication, and user data isolation

## Project Structure

```
job-tracker/
├── backend/                 # Node.js/Express API server
│   ├── models/             # MongoDB schemas
│   │   ├── User.js        # User model with authentication
│   │   └── Job.js         # Job model (user-specific)
│   ├── routes/             # API endpoints
│   │   ├── auth.js        # Authentication routes
│   │   └── jobs.js        # Job management routes
│   ├── middleware/         # Custom middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth.js    # Authentication wrapper
│   │   │   ├── Login.js   # Login form
│   │   │   ├── Register.js # Registration form
│   │   │   ├── JobForm.js # Add/edit job form
│   │   │   ├── JobList.js # Job list with filtering
│   │   │   ├── JobItem.js # Individual job display
│   │   │   └── JobStats.js # Statistics dashboard
│   │   ├── context/       # React context
│   │   │   └── AuthContext.js # Authentication state management
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Application entry point
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - JavaScript library for building user interfaces
- **Context API** - State management
- **CSS3** - Styling with modern features
- **Fetch API** - HTTP requests

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd projects/job-tracker/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env with your values:
   MONGODB_URI=mongodb://localhost:27017/job-tracker
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start the backend server:**
   ```bash
   npm run dev    # Development mode with nodemon
   # or
   npm start      # Production mode
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd projects/job-tracker/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env with your values:
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Authenticate existing user.
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current authenticated user information.
*Requires Authorization header with JWT token*

### Job Management Endpoints

**All job endpoints require authentication (JWT token in Authorization header)**

#### GET `/api/jobs`
Get all jobs for the authenticated user.

#### POST `/api/jobs`
Create a new job application.
```json
{
  "company": "Tech Corp",
  "position": "Software Engineer",
  "location": "San Francisco, CA",
  "status": "Applied",
  "notes": "Applied through company website"
}
```

#### PUT `/api/jobs/:id`
Update an existing job application.

#### DELETE `/api/jobs/:id`
Delete a job application.

## Database Schema

### User Model
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  createdAt: Date (auto-generated)
}
```

### Job Model
```javascript
{
  user: ObjectId (required, references User),
  company: String (required),
  position: String (required),
  location: String (required),
  status: String (required, enum: Applied/Interviewing/Offered/Rejected),
  appliedDate: Date (required, default: now),
  notes: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **User Data Isolation**: Users can only access their own data
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured cross-origin resource sharing
- **Environment Variables**: Sensitive data stored in .env files

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Add Jobs**: Use the form to add new job applications
3. **Track Progress**: Monitor your applications through different statuses
4. **View Statistics**: See your application progress at a glance
5. **Filter Jobs**: Filter applications by status (Applied, Interviewing, Offered, Rejected)
6. **Edit/Delete**: Update job details or remove applications as needed

## Future Enhancements

- Email notifications for status changes
- Resume/CV upload and management
- Interview scheduling and reminders
- Company research integration
- Export data to CSV/PDF
- Mobile app version
- Analytics and reporting dashboard
- Multi-user collaboration (team accounts)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please check the existing issues or create a new one in the repository.
