**# CampusHub**



**!\[Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)**

**!\[Flask](https://img.shields.io/badge/Flask-Backend-black?logo=flask)**

**!\[React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)**

**!\[MySQL](https://img.shields.io/badge/MySQL-Database-orange?logo=mysql)**

**!\[TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8?logo=tailwindcss)**

**!\[JWT](https://img.shields.io/badge/Auth-JWT-green)**

**!\[Status](https://img.shields.io/badge/Project-Complete-brightgreen)**

**!\[License](https://img.shields.io/badge/License-MIT-blue)**

**CampusHub**



**CampusHub** is a full-stack campus management platform designed to centralize campus activities such as events and announcements. The application allows students to discover events, register for them, and stay updated with official campus announcements, while administrators can manage events and post announcements.



The project demonstrates a modern full-stack architecture using React for the frontend and Flask for the backend, along with JWT authentication and a MySQL database.



Features

Authentication \& Security



Secure user authentication using JWT tokens



Password hashing and validation



Role-based access control (Admin / Student)



Student Capabilities



Browse campus events



Register or unregister for events



View event details



Read campus announcements



Dashboard with activity overview



Admin Capabilities



Create and manage events



Open or close event registrations



View event attendees



Post campus announcements



Dashboard with system overview



User Experience



Modern dark UI theme



Glassmorphism design elements



Responsive layout



Smooth navigation using React Router



Interactive UI with hover and transition effects



Tech Stack

Frontend



React



Vite



Tailwind CSS



Framer Motion



Axios



Backend



Python



Flask



MySQL



JWT Authentication



Tools



Git



GitHub



npm



Project Structure

campushub

│

├── backend

│   ├── app.py

│   ├── routes

│   ├── models

│   ├── services

│   ├── database

│   └── utils

│

├── campushub-frontend

│   ├── src

│   │   ├── components

│   │   ├── pages

│   │   ├── assets

│   │   ├── services

│   │   ├── App.jsx

│   │   └── main.jsx

│   │

│   └── package.json

│

└── README.md

Installation

1\. Clone the repository

git clone https://github.com/YOUR\_USERNAME/CampusHub.git

cd CampusHub

2\. Backend Setup



Navigate to the backend folder and install dependencies.



cd backend

pip install flask flask-cors mysql-connector-python python-dotenv PyJWT



Create a .env file:



SECRET\_KEY=your\_secret\_key



DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=your\_password

DB\_NAME=campushub



Run the backend server:



python run.py



The backend runs on:



http://127.0.0.1:5000

3\. Frontend Setup



Navigate to the frontend folder:



cd campushub-frontend

npm install



Run the development server:



npm run dev



Frontend runs on:



http://localhost:5173

API Overview

Authentication

POST /auth/signup

POST /auth/login

POST /auth/logout

POST /auth/refresh

Events

GET /events

POST /events

POST /events/{id}/register

DELETE /events/{id}/unregister

POST /events/{id}/close

Announcements

GET /announcements

POST /announcements

Dashboard

GET /dashboard



Future Improvements



Email notifications for announcements



Event reminders



Event detail pages



User profile page



Deployment with Docker



Admin analytics dashboard



Learning Outcomes



This project demonstrates practical experience with:



Full-stack web development



REST API design



Authentication systems



Role-based authorization



Modern React UI design



Database integration



Author



Sujash Mittal



GitHub:

https://github.com/Sujash01



License



This project is created for educational and portfolio purposes.



Next thing you should do

