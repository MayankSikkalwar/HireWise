# 🚀 HireWise — AI Resume Screening & Candidate Ranking System

HireWise is an **AI-powered Applicant Tracking System (ATS)** that automates resume screening, evaluates candidates against job descriptions, and ranks them using **intelligent weighted scoring**.
It helps recruiters **save time, reduce bias, and make faster hiring decisions**.

🔗 **Live Demo:** [https://hirewise-ai-lilac.vercel.app](https://hirewise-ai-lilac.vercel.app)

---

## ✨ Key Features

* 🧠 **AI Resume Analysis**

  * Uses **LLaMA-3 via Groq API** for contextual resume understanding
  * Goes beyond keyword matching with semantic analysis

* 📊 **Candidate Match Percentage**

  * Calculates **resume–job match score (0–100%)**
  * Displays visual progress indicators for quick evaluation

* 💡 **Strengths & Skill Gap Detection**

  * Identifies candidate **core strengths**
  * Highlights **missing skills** relative to job requirements

* ⚖️ **Weighted Scoring Engine**

  * Recruiter-defined criteria with custom weights
  * Transparent **score breakdown + justification**

* 📄 **Resume Parsing**

  * Supports **PDF & DOCX**
  * Automated text extraction and preprocessing

* 📋 **Recruiter Dashboard**

  * Rank candidates automatically
  * Filter, review, and shortlist candidates efficiently

* 🔐 **Secure Authentication**

  * JWT-based protected routes
  * User-specific jobs and candidates

* ☁️ **Production-Ready Deployment**

  * Frontend on **Vercel**
  * Backend on **Render**
  * MongoDB Atlas for database

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer (file uploads)
* PDF-Parse & Mammoth (resume parsing)

### AI & Cloud

* LLaMA-3 via **Groq API**
* Render (Backend hosting)
* Vercel (Frontend hosting)

---

## 🔄 How HireWise Works

1. **Create a Job**

   * Add job description & scoring criteria

2. **Upload Resumes**

   * Upload multiple PDF/DOCX resumes

3. **AI Evaluation**

   * Resume compared against job + criteria
   * Generates match %, strengths, gaps, and scores

4. **Candidate Ranking**

   * Candidates sorted automatically by total score
   * Recruiter reviews top matches first

---

## 📈 Impact

* ⏱ Reduced manual resume screening time by **~75%**
* 📊 Automated candidate ranking for faster shortlisting
* 🔍 Improved hiring accuracy using AI-driven insights

---

## 🚧 Future Enhancements

* Resume bias detection
* ATS compatibility scoring
* Export reports (PDF/CSV)
* Team collaboration features
* Email notifications for shortlisted candidates

---

## 👨‍💻 Author

**Mayank Sikkalwar**

* 💼 Full Stack Developer (MERN)
* 🔗 LinkedIn: [https://linkedin.com/in/mayank-sikkalwar](https://www.linkedin.com/in/mayank-sikkalwar-ab8660213/)
* 📧 Email: [mayanksikkalwar576@gmail.com](mailto:mayanksikkalwar576@gmail.com)

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🧠 Share feedback

