# ResumeLens 🚀

*AI Resume Analyzer & Role-Specific Mock Interviewer*

---

## 📌 Project Overview

**ResumeLens** is an AI-powered HR-Tech tool designed to solve the *"black box"* problem in job applications. Instead of simply matching keywords like traditional ATS systems, ResumeLens explains **why** a resume does not match a job description and actively helps candidates close those gaps through **targeted mock interviews and feedback**.

This project was built during **Hackathon 1: Fundamentals & Prompt Engineering (Days 1–3)** with a focus on **prompt design, structured JSON outputs, and agentic workflows** — *no vector databases used*.

---

## 🎯 Problem Statement

Most candidates never understand why their resume gets rejected. ATS systems act as black boxes, offering no feedback. As a result:

* Candidates don't know what skills are missing
* Resume improvements are guess-based
* Interview preparation is unfocused

**ResumeLens turns rejection into clarity and preparation.**

---

## 🧠 Solution

ResumeLens acts as a **career mentor**, not just a scanner:

1. Analyzes resume vs job description
2. Explains mismatches clearly
3. Generates interview questions *only* for weak or missing areas
4. Gives structured feedback using the **STAR framework**

---

## 🔄 User Workflow

### 1️⃣ Resume & Job Description Intake

* User uploads resume (PDF)
* User pastes a specific Job Description

### 2️⃣ AI Resume Analysis (Agentic Step 1)

The backend sends resume text + JD to the LLM.

The AI returns a **structured JSON response** containing:

```json
{
  "matchScore": 72,
  "missingKeywords": ["System Design", "Team Leadership"],
  "sectionCritique": {
    "Skills": "Lacks explicit system design experience",
    "Experience": "Leadership impact not clearly stated"
  }
}
```

### 3️⃣ Feedback Dashboard

* Match score visualization
* Missing skills highlighted in red
* Section-by-section resume critique

### 4️⃣ Interview Practice (Agentic Step 2)

* User clicks **"Practice for this Role"**
* AI generates **3–5 interview questions** targeting weak areas

### 5️⃣ Mock Interview & Feedback

* User answers in a chat interface
* AI provides **real-time feedback** using the **STAR framework**

---

## ✨ Core Features

* **Semantic Keyword Gap Mapping**  
  Understands meaning, not just exact words (e.g., *"Managed 5 people"* ≈ *"Team Leadership"*)

* **Dynamic Interview Engine**  
  AI stays in character as a professional recruiter using a system prompt

* **Structured JSON Outputs**  
  Reliable, frontend-friendly AI responses

---

## 🌱 Optional / Stretch Features

* **STAR Bullet Rewriter** – Rewrite weak resume points into impact-driven statements
* **Job-Readiness Scorecard** – Downloadable PDF summary of resume + interview feedback

---

## 🛠 Tech Stack

* **Frontend:** React
* **Backend:** Node.js / Express
* **AI:** LLM via prompt engineering
* **Parsing:** PDF text extraction

---

## 📈 Hackathon Focus

* Prompt engineering
* JSON-structured outputs
* Multi-step agentic reasoning
* No embeddings or vector databases

---

## 🚧 Current Status

✅ Research & problem framing completed  
✅ User workflow designed  
✅ Prompt strategy planned  
⏳ Backend & frontend implementation in progress

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* API key for LLM service

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ResumeLens.git
cd ResumeLens

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built as part of Hackathon 1 – Fundamentals & Prompt Engineering*
