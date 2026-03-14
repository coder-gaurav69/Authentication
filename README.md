# Scalable Auth & Task Management System

A production-ready full-stack application built for the Backend Developer Intern assignment. Featuring JWT authentication, Role-Based Access Control (RBAC), and a sleek modern dashboard.

## 🚀 Key Features

### Backend (Node.js & Express)
- **Authentication**: Secure registration and login with bcrypt password hashing.
- **JWT Authorization**: Stateless authentication using JSON Web Tokens.
- **RBAC**: Admin vs User roles. Admins can view and manage all tasks, while users only see their own.
- **Task CRUD**: Full Create, Read, Update, Delete functionality for tasks.
- **API Versioning**: Scalable routing structure starting with `/api/v1`.
- **Validation**: Input validation for secure data handling.
- **Interactive Documentation**: Integrated Swagger UI for API testing.

### Frontend (React & Vite)
- **State Management**: Context API for global authentication state.
- **Protected Routes**: Secure navigation logic preventing unauthorized access.
- **Clean UI**: Professional, standard CSS-based interface for broad compatibility.
- **Responsive**: Fully responsive dashboard for all device sizes.
- **Real-time Feedback**: Success and error messaging for all API interactions.

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt, Swagger, Cookie-Parser.
**Frontend:** React, Vite, Axios, Lucide React, Clean CSS.

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB (Atlas account recommended)

### 1. Backend Setup
```bash
cd backend
npm install
# Ensure .env has correct MONGODB_URI
npm start
```
*API will be running on `http://localhost:5000`*
*Swagger Docs available at `http://localhost:5000/api-docs`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend will be running on `http://localhost:5173`*

---

## 📈 Scalability & Future Improvements

To handle millions of users and high throughput, this architecture can be evolved:

1. **Caching (Redis)**: Implement Redis for caching frequently accessed data (like user profiles or task lists).
2. **Microservices**: Decouple the Auth and Task modules into separate microservices.
3. **Database Optimization**: 
   - Implement **Sharding** and **Replication** in MongoDB.
   - Use indexing on `userId` and `email` for faster queries.
4. **Load Balancing**: Deploy behind a Load Balancer (AWS ELB or Nginx) to distribute traffic.
5. **Rate Limiting**: Use `express-rate-limit` to prevent Brute Force and DDoS attacks.

---

## 📄 API Documentation Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| GET | `/api/v1/auth/me` | Get current user info | Private |
| GET | `/api/v1/tasks` | Get all tasks (User's or All if Admin) | Private |
| POST | `/api/v1/tasks` | Create new task | Private |
| PUT | `/api/v1/tasks/:id` | Update task | Private (Owner/Admin) |
| DELETE | `/api/v1/tasks/:id` | Delete task | Private (Owner/Admin) |

---

Developed with ❤️ for the Primetrade Team.
