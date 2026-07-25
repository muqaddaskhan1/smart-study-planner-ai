# 📚 Smart Study Planner AI

### An AI-Powered Personalized Study Planning Web Application

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)
![GitHub](https://img.shields.io/badge/GitHub-Public%20Repository-black?logo=github)
![Bolt.new](https://img.shields.io/badge/Built%20With-Bolt.new-orange)

---

# 📖 Project Overview

**Smart Study Planner AI** is an AI-powered web application designed to help students create personalized study schedules based on their subjects, exam dates, and available daily study hours.

Instead of manually planning study routines, students simply enter their study details, and the application generates a structured study plan that helps improve productivity, manage time efficiently, and prepare effectively for examinations.

---

# 🎯 Problem Statement

Many students struggle with:

- Managing multiple subjects
- Planning daily study routines
- Preparing effectively for examinations
- Maintaining consistency while studying

Creating a realistic study schedule manually is often time-consuming and difficult.

**Smart Study Planner AI** solves this real-world problem by generating personalized AI-powered study plans that help students stay organized, productive, and focused throughout their exam preparation.

---

# 👨‍🎓 Target Users

- University Students
- College Students
- School Students
- Self Learners
- Competitive Exam Students

---

# 🌐 Live Application

**Live Demo**

https://ai-study-planner-web-y37z.bolt.host

---

# 💻 Public GitHub Repository

https://github.com/muqaddaskhan1/smart-study-planner-ai

---

# ✨ Features

- 🤖 AI-Powered Study Plan Generator
- 🔐 Secure User Registration & Login
- 📚 Subject-Based Study Planning
- 📅 Exam Date Selection
- ⏰ Daily Study Hours Planning
- 📋 Personalized Study Schedule
- 👤 User Profile
- 🌙 Dark Mode Support
- 📱 Responsive Design
- ⚡ Fast Performance
- 🔒 Secure Authentication using Supabase

---

# 🤖 AI Feature

Smart Study Planner AI uses Artificial Intelligence to generate personalized study schedules based on each student's learning requirements.

The AI analyzes:

- Subject Name
- Exam Date
- Daily Available Study Hours

Based on the provided information, the application generates a structured study schedule that divides learning into manageable daily tasks while encouraging effective time management and consistent study habits.

---

# 🧠 AI System Prompt

```text
You are an intelligent AI Study Planner.

Generate a personalized study schedule based on the student's subject, available study hours, and exam date.

Break large topics into manageable daily tasks.

Maintain a balanced schedule.

Include revision sessions before examinations.

Avoid overloading the student.

Provide motivational study tips.

Return the study plan in a clean, structured, and easy-to-read format.
```

---

# 🛠 Technologies Used

## Frontend

- React.js
- TypeScript
- Vite

## Backend

- Supabase
- Supabase Authentication
- PostgreSQL Database

## AI & Development

- Bolt.new
- Prompt Engineering

## Version Control

- Git
- GitHub

## Deployment

- Bolt Hosting

---

# 📸 Application Screenshots

The following screenshots demonstrate the key features and functionality of the Smart Study Planner AI application.

## 🏠 Dashboard

![Dashboard](dashboard.png)

The dashboard provides an overview of the application and allows users to access their study planner.

---

## 📅 Study Planner

![Planner](planner.png)

Students can generate personalized AI-powered study schedules by entering the subject name, exam date, and available daily study hours.

---

## 👤 Profile

![Profile](profile.png)

Users can securely view and manage their personal profile information.

---

## ⚙️ Settings

![Settings](settings.png)

The settings page allows users to customize their application preferences.

---

## 🌙 Dark Mode

![Dark Mode](darkmode.png)

The application supports both Light Mode and Dark Mode for a better user experience.

---

# 📂 Project Structure

```text
src/
├── components/
├── hooks/
├── pages/
├── services/
├── supabase/
├── public/
├── App.tsx
├── main.tsx
└── index.css
```
---

# ⚙️ Installation Guide

### Prerequisites

Before running the project locally, make sure the following tools are installed:

- Node.js (v18 or later)
- npm (comes with Node.js)
- Git

---

### Clone the Repository

```bash
git clone https://github.com/muqaddaskhan1/smart-study-planner-ai.git
```

Move into the project folder:

```bash
cd smart-study-planner-ai
```

---

### Install Dependencies

```bash
npm install
```

---

### Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> These values are available in your Supabase Dashboard under **Settings → API**.

---

### Run the Development Server

```bash
npm run dev
```

The application will start locally and can be accessed in your browser.

---

### Build for Production

```bash
npm run build
```

---

### Preview the Production Build

```bash
npm run preview
```

---

# 🔒 Security & Privacy

Smart Study Planner AI follows secure authentication and privacy practices.

Security features include:

- Secure user authentication using Supabase Authentication.
- User passwords are securely managed by Supabase.
- Each user's study data is associated only with their own account.
- Sensitive credentials are stored using environment variables and are not included in the public GitHub repository.
- Communication between the application and backend services is protected using HTTPS.

---

# 👩‍💻 Developer

**Muqaddas Khan**

Dow University of Health Sciences
Karachi, Pakistan

---

# 📄 License

This project was developed for educational purposes as part of the **Week 7 – Final Project (Ship Your AI App)**.

---

# 🙏 Acknowledgements

This project was built using modern web technologies and AI-assisted development tools.

Special thanks to:

- **Bolt.new** for AI-assisted application development.
- **Supabase** for backend services and secure authentication.
- **React.js**, **TypeScript**, and **Vite** for modern web development.
- **GitHub** for version control and project hosting.

---

⭐ Thank you for reviewing **Smart Study Planner AI**.
