# Smart Study Planner AI

> An AI-powered personalized study planning web application designed to help students organize their preparation and study more effectively.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://ai-study-planner-web-y37z.bolt.host/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/muqaddaskhan1/smart-study-planner-ai)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)](https://ai.google.dev/)

---

## 📌 Project Overview

Smart Study Planner AI is an AI-powered web application created to help students plan their studies in a more organized and personalized way.

Students often have multiple subjects, limited study hours, and different exam dates. Creating a balanced study schedule manually can be difficult and time-consuming.

This application helps simplify that process by allowing students to provide their study information and receive a personalized study plan generated using Google Gemini AI.

The application combines a clean and responsive interface with AI-powered study planning and user authentication.

---

## 🎯 Problem Statement

Students often struggle with deciding:

- What subject should be studied first?
- How much time should be given to each subject?
- How can available study hours be divided effectively?
- How should preparation be organized before an exam?

Smart Study Planner AI aims to make this process easier by helping students organize their available study time and generate a personalized study plan according to their academic needs.

---

## 👥 Target Users

The application is primarily designed for:

- School students
- College students
- University students
- Students preparing for examinations
- Learners who want a structured study routine

---

## 🚀 Live Application

The application is publicly deployed and can be accessed online.

### 🌐 Live Demo

https://ai-study-planner-web-y37z.bolt.host/

### 💻 GitHub Repository

https://github.com/muqaddaskhan1/smart-study-planner-ai

---

# ✨ Features

## 🤖 AI-Powered Study Plan Generator

The main feature of Smart Study Planner AI is its AI-powered study plan generator.

Students can provide information such as:

- Subjects
- Exam date
- Available daily study hours
- Study preferences
- Learning requirements

The application uses this information to request a personalized study plan from Google Gemini AI.

The generated plan is designed according to the student's available preparation time and academic requirements.

---

## 💬 AI Study Assistant

The application also provides an AI-powered study assistant.

Students can interact with the assistant and ask study-related questions.

The assistant can provide help with:

- Study planning
- Subject preparation
- Revision suggestions
- Learning guidance
- General study-related questions

Responses are generated using Google Gemini AI.

---

## 🔐 User Authentication

The application includes user authentication powered by Supabase.

Users can:

- Create an account
- Log in securely
- Access their study planning features
- Use the application through their authenticated account

---

## 📚 Subject-Based Planning

Students can enter their subjects before generating a study plan.

The provided subjects are used as part of the information sent to the AI so that the generated plan can be personalized to the student's academic requirements.

---

## 📅 Exam Date

Students can enter their upcoming examination date.

The exam date helps the AI understand the available preparation period and organize the study schedule accordingly.

---

## ⏱️ Daily Study Hours

Students can specify how many hours they are available to study each day.

The AI uses the available study time when generating the personalized plan.

---

## 🎨 Responsive User Interface

The application provides a responsive interface designed for different screen sizes.

It can be used on:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🌙 Dark Mode

The application includes a dark mode option for a more comfortable viewing experience in low-light environments.

---

## 🧭 Simple Navigation

The application provides clear navigation so students can easily access the different sections of the application and study planning features.

---

# 🧠 Artificial Intelligence

## AI Technology

Smart Study Planner AI uses the **Google Gemini API** to provide its AI-powered functionality.

Gemini is used for:

- Personalized study plan generation
- AI study assistant responses

The application sends relevant user-provided study information to Gemini and displays the generated response in the application.

---

## 🔄 How the AI Study Planner Works

The study planning process follows these steps:

1. The student logs into the application.
2. The student enters their subjects.
3. The student provides the examination date.
4. The student enters their available daily study hours.
5. The application prepares the provided information for the AI request.
6. Google Gemini processes the information.
7. Gemini generates a personalized study plan.
8. The generated plan is displayed to the student.

---

## 📝 AI System Instructions

The AI is instructed to act as a helpful and practical study-planning assistant.

The instructions guide the AI to create personalized study schedules based on the student's available time, subjects, and examination timeline.

The AI is instructed to:

- Understand the student's provided study information.
- Prioritize subjects appropriately.
- Create a practical study schedule.
- Divide preparation into manageable study sessions.
- Include revision where appropriate.
- Consider the student's available daily study time.
- Provide clear and easy-to-follow recommendations.
- Avoid unrealistic study schedules.

These instructions help guide Gemini when generating study-related responses.

---

# 🛠️ Technologies Used

## Frontend

### React

React is used to build the application's user interface and interactive components.

### TypeScript

TypeScript is used for type-safe and maintainable application development.

### Tailwind CSS

Tailwind CSS is used for styling and responsive interface design.

### Lucide React

Lucide React is used for interface icons.

---

## Backend and Services

### Supabase

Supabase is used for authentication and backend-related functionality.

It provides the authentication infrastructure required for user account management.

### Google Gemini API

Google Gemini provides the application's AI functionality, including personalized study plan generation and AI assistant responses.

---

## Development and Project Tools

### Bolt.new

Bolt.new was used as an AI-powered development environment to assist with building and developing the web application.

### GitHub

GitHub is used for source-code management and public repository hosting.

### Web Deployment

The application is deployed online and made publicly accessible for users and project evaluation.

---
# 📸 Screenshots

The following screenshots demonstrate the application's interface and functionality.

## 🏠 Dashboard

![Dashboard](dashboard.png)

The dashboard provides the main entry point for students to access the application's study planning features.

---

## 🤖 AI Study Planner

![AI Study Planner](planner.png)

The AI Study Planner allows students to provide their study information and generate a personalized AI-powered study plan.

---

## 👤 Profile

![Profile](profile.png)

The profile section provides the user's account-related information.

---

## ⚙️ Settings

![Settings](settings.png)

The settings section provides available application preferences.

---

## 🌙 Dark Mode

![Dark Mode](darkmode.png)

The application also provides a dark mode interface for a more comfortable user experience.

---

# 📂 Project Structure

The project follows a structured React and TypeScript architecture.

```text
smart-study-planner-ai/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

# 🔑 Environment Variables

The application uses environment variables for sensitive configuration.

For local development, create a `.env` file in the project root.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Security

API keys and sensitive credentials should never be committed to GitHub.

The `.env` file should remain excluded through `.gitignore`.

For production deployment, environment variables should be configured through the hosting platform's environment-variable settings.

---

# 💻 How to Run the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/muqaddaskhan1/smart-study-planner-ai.git
```

---

## 2. Open the Project

```bash
cd smart-study-planner-ai
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file in the project root.

Add the required Supabase and Gemini environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Do not commit the `.env` file to GitHub.

---

## 5. Start the Development Server

```bash
npm run dev
```

The application will start on the local development server.

---

## 6. Open the Application

Open the local URL shown in the terminal.

Usually:

```text
http://localhost:5173
```

---

# 🏗️ Production Build

To create a production build:

```bash
npm run build
```

The generated application can then be deployed using a compatible hosting platform.

---

# 🧪 Development Commands

## Start Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Run Lint

```bash
npm run lint
```

## Type Check

```bash
npm run typecheck
```

---

# 🔒 Security Practices

The project follows basic security practices for sensitive configuration.

- API keys are stored using environment variables.
- Sensitive credentials are not included in the source code.
- Environment files should not be committed to GitHub.
- Supabase authentication is used for user account management.
- Production secrets should be configured through the deployment platform.

---

# 📱 Responsive Design

The application has been designed to provide a consistent experience across different devices.

The interface adapts to:

- Mobile screens
- Tablets
- Laptops
- Desktop screens

This allows students to access their study planning tools from different devices.

---

# 🎨 User Experience

The application focuses on keeping the study-planning process simple and easy to follow.

The overall user flow is:

```text
Sign Up / Login
       ↓
Dashboard
       ↓
Enter Study Information
       ↓
Generate AI Study Plan
       ↓
Review Personalized Plan
       ↓
Use AI Study Assistant
```

---

# 🌐 Deployment

The application is publicly deployed and accessible through the following URL:

### Live Application

https://ai-study-planner-web-y37z.bolt.host/

### Public GitHub Repository

https://github.com/muqaddaskhan1/smart-study-planner-ai

---

# 👩‍💻 Developer

**Muqaddas Khan**

Student  
Dow University of Health Sciences

This project was developed as an individual final project for the ACT-AI course.

---

# 🙏 Acknowledgements

I would like to sincerely thank the **ACT-AI Team**, **Higher Education Commission (HEC)**, **Prime Minister's Youth Programme (PMYP)**, and **AI SkillBridge** for providing the opportunity to learn and work with modern AI technologies.

Special thanks to the instructors and everyone involved in organizing the course and providing guidance throughout the learning journey.

---
