"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnalysisResult } from "@/components/AnalysisResult";
import { InterviewCoach } from "@/components/InterviewCoach";

type ViewState = "landing" | "intake" | "analyzing" | "result" | "interview";

export default function Home() {
  const [view, setView] = useState<ViewState>("landing");
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jd.trim()) return;

    setView("analyzing");
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setAnalysis(data);
      setView("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      setView("intake");
    }
  };

  const startInterview = async () => {
    setIsGeneratingInterview(true);
    try {
      const response = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          missingKeywords: analysis.missingKeywords,
          jobDescription: jd
        }),
      });
      const data = await response.json();
      setQuestions(data.questions);
      setView("interview");
    } catch (error) {
      console.error("Interview generation failed:", error);
    } finally {
      setIsGeneratingInterview(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container-width flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("landing")}>
            <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ResumeLens</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted hover:text-primary transition-colors">How it works</Link>
          </div>
          <button
            onClick={() => setView("intake")}
            className="btn-primary py-2 text-sm"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main>
        {view === "landing" && (
          <>
            {/* Hero */}
            <section className="section-padding">
              <div className="container-width text-center">
                <div className="reveal mx-auto mb-6 inline-block rounded-full border border-border bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                  Hackathon Ready: AI Interviewer
                </div>
                <h1 className="reveal mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                  Don't just analyze. <span className="text-primary">Practice</span> for the win.
                </h1>
                <p className="reveal mx-auto mt-6 max-w-xl text-lg text-muted">
                  Identify your resume gaps and fill them through real-time AI mock interviews specifically tailored to your dream job.
                </p>
                <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button onClick={() => setView("intake")} className="btn-primary w-full sm:w-auto">Start Analysis Now</button>
                  <button className="btn-outline w-full sm:w-auto">How it works</button>
                </div>
              </div>
            </section>

            {/* Stats, Features etc. (Keeping them simple below) */}
            <section className="border-y border-border bg-accent/30 py-12">
              <div className="container-width grid grid-cols-2 gap-8 md:grid-cols-4">
                {[
                  { label: "Semantic Match", value: "LLM Power" },
                  { label: "Feedback", value: "STAR" },
                  { label: "Interview", value: "Dynamic" },
                  { label: "Optimization", value: "ATS-Ready" },
                ].map((stat, i) => (
                  <div key={i} className="reveal text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs font-medium text-muted uppercase tracking-wide mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {view === "intake" && (
          <section className="section-padding">
            <div className="container-width max-w-2xl">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold mb-2">Initialize Your Success</h2>
                <p className="text-muted">Upload your resume and the target Job Description.</p>
              </div>
              <form onSubmit={handleAnalyze} className="card-simple space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-muted">Resume (PDF)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-muted">Job Description</label>
                  <textarea
                    rows={8}
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full rounded-xl border border-border bg-accent/50 p-4 text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-lg">Analyze Resume</button>
              </form>
            </div>
          </section>
        )}

        {view === "analyzing" && (
          <div className="section-padding flex flex-col items-center justify-center min-h-[60vh]">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Analyzing your potential...</h2>
            <p className="text-muted">Gemini is scanning for semantic matches and keyword gaps.</p>
          </div>
        )}

        {view === "result" && analysis && (
          <div className="relative">
            {isGeneratingInterview && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                <p className="font-bold">Generating mock interview questions...</p>
              </div>
            )}
            <AnalysisResult analysis={analysis} onStartInterview={startInterview} />
          </div>
        )}

        {view === "interview" && questions.length > 0 && (
          <InterviewCoach questions={questions} />
        )}

        <footer className="border-t border-border py-12 mt-20">
          <div className="container-width flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
            <div className="flex items-center gap-2 opacity-50">
              <div className="h-4 w-4 rounded bg-foreground"></div>
              <span className="text-sm font-bold tracking-tight">ResumeLens</span>
            </div>
            <p className="text-[10px] text-muted uppercase tracking-widest">© 2025 ResumeLens. AI Mentor for HR-Tech.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-muted hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="text-xs text-muted hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
