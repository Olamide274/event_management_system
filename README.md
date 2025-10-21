# event_management_system
🎟️ Event Management System (Backend Only)
This Event Management System is a backend application built with Node.js, Express.js, and MongoDB.
It handles the server-side logic for managing events, users, and registrations — designed to connect easily with any frontend or mobile app through RESTful APIs.
🚀 Key Features
User Authentication (JWT + bcrypt)
Role-based Access for Admins and Users
CRUD Operations for Events
Event Registration System
Centralized Error Handling & Validation
MongoDB Integration using Mongoose
🧠 Tech Stack
Node.js
Express.js
MongoDB + Mongoose
JWT & bcrypt
dotenv, Morgan
⚙️ Sample API Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & get token
GET	/api/events	Get all events
POST	/api/events	Create event (Admin)

🧩 Structure
The project follows the MVC pattern:
Models → Data structure
Controllers → Business logic
Routes → API endpoints
Middleware → Authentication & error handling
🧑‍💻 How to Run
git clone https://github.com/yourusername/event-management-system.git
cd event-management-system
npm install
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the app:
npm start
📌 Note
This project contains only the backend logic.
Frontend integration can be done with React, Vue, or any preferred framework.
