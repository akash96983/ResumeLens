"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container-width flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ResumeLens</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted hover:text-primary transition-colors">Pricing</Link>
          </div>
          <button className="btn-primary py-2 text-sm">Get Started</button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="section-padding">
          <div className="container-width text-center">
            <div className="reveal mx-auto mb-6 inline-block rounded-full border border-border bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
              AI-Powered Success
            </div>
            <h1 className="reveal mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Perfect your resume with the power of AI.
            </h1>
            <p className="reveal mx-auto mt-6 max-w-xl text-lg text-muted">
              Stop sending resumes into a black hole. Get instant, actionable feedback to bypass ATS and land more interviews.
            </p>
            <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="btn-primary w-full sm:w-auto">Analyze My Resume</button>
              <button className="btn-outline w-full sm:w-auto">View Sample Report</button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-accent/30 py-12">
          <div className="container-width grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Resumes Analyzed", value: "50,000+" },
              { label: "Success Rate", value: "94%" },
              { label: "Score Gained", value: "+35%" },
              { label: "Users Active", value: "10,000+" },
            ].map((stat, i) => (
              <div key={i} className="reveal text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs font-medium text-muted uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section-padding">
          <div className="container-width">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
              <p className="mt-2 text-muted">Designed to give you a competitive edge.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "Smart Analysis", desc: "AI-driven content scanning to identify narrative gaps.", icon: "🧠" },
                { title: "Targeted Keywords", desc: "Align your resume with specific job requirements.", icon: "🔍" },
                { title: "ATS Check", desc: "Ensure your document is readable by common systems.", icon: "🚀" }
              ].map((f, i) => (
                <div key={i} className="reveal card-simple">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section-padding bg-accent/30">
          <div className="container-width">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
              <p className="mt-2 text-muted">Start in seconds, succeed in minutes.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { s: "01", t: "Upload", d: "Drop your resume in any format." },
                { s: "02", t: "Analyze", d: "Get an instant industry-standard score." },
                { s: "03", t: "Improve", d: "Apply AI suggestions and apply with confidence." }
              ].map((step, i) => (
                <div key={i} className="reveal flex flex-col items-center text-center p-6 border border-transparent">
                  <div className="mb-4 text-4xl font-black text-primary/10 tracking-tighter">{step.s}</div>
                  <h3 className="text-lg font-bold mb-2">{step.t}</h3>
                  <p className="text-sm text-muted">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="section-padding">
          <div className="container-width">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Simple Pricing</h2>
              <p className="mt-2 text-muted">Choose the plan that fits your career stage.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { n: "Basic", p: "Free", f: ["1 Analysis/mo", "Basic Score"] },
                { n: "Pro", p: "$19", f: ["Unlimited Analysis", "Keywords Report", "ATS Optimization"], featured: true },
                { n: "Career", p: "$49", f: ["Everything in Pro", "LinkedIn SEO", "Cover Letter AI"] }
              ].map((p, i) => (
                <div key={i} className={`reveal card-simple relative ${p.featured ? 'border-primary ring-1 ring-primary' : ''}`}>
                  {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 text-[10px] font-bold text-white rounded-full">POPULAR</span>}
                  <h3 className="text-lg font-bold">{p.n}</h3>
                  <div className="mt-4 text-3xl font-bold">{p.p}</div>
                  <ul className="mt-8 space-y-3 mb-8">
                    {p.f.map((feat, j) => (
                      <li key={j} className="text-sm text-muted flex items-center gap-2">
                        <span className="text-primary text-xs">●</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${p.featured ? 'bg-primary text-white' : 'border border-border hover:bg-accent'}`}>
                    {p.p === "Free" ? "Start Free" : "Get Started"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="container-width flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2 opacity-50">
              <div className="h-4 w-4 rounded bg-foreground"></div>
              <span className="text-sm font-bold tracking-tight">ResumeLens</span>
            </div>
            <p className="text-[10px] text-muted uppercase tracking-widest">© 2025 ResumeLens. Minimalist Design.</p>
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
