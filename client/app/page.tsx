"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans selection:bg-primary/10">
      {/* Navigation */}
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-primary" />
          <span className="text-xl font-semibold tracking-tight">ResumeLens</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="#how-it-works" className="text-foreground/60 transition-colors hover:text-foreground">How it works</Link>
          <button className="btn-primary flex items-center justify-center">Sign Up</button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Land your dream job with <br />
            <span className="text-foreground/50">AI-optimized resumes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
            ResumeLens analyzes your resume against job descriptions to help you bypass ATS filters and stand out to recruiters instantly.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="btn-primary w-full text-lg sm:w-auto">Analyze My Resume</button>
            <button className="text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors">
              See how it works →
            </button>
          </div>
        </section>

        {/* Core Benefits */}
        <section className="mx-auto max-w-5xl px-6 py-24 border-t border-border">
          <div className="grid gap-12 sm:grid-cols-3">
            {[
              {
                title: "ATS Optimization",
                desc: "Ensure your resume passes through Applicant Tracking Systems with ease."
              },
              {
                title: "Keyword Matching",
                desc: "Identify the exact keywords and skills recruiters are looking for."
              },
              {
                title: "Instant Scoring",
                desc: "Get an immediate score and actionable feedback to improve your odds."
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simplified Process */}
        <section id="how-it-works" className="bg-accent py-24 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Three simple steps.</h2>
            <div className="mt-16 grid gap-8 text-left sm:grid-cols-3">
              {[
                { step: "01", title: "Upload", desc: "Drop your resume." },
                { step: "02", title: "Analyze", desc: "AI scans for gaps." },
                { step: "03", title: "Apply", desc: "Export and land jobs." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-foreground/30">{item.step}</div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Get your resume scored today.</h2>
          <p className="mt-4 text-foreground/60">Join thousands of job seekers who improved their interview rates.</p>
          <button className="btn-primary mt-10">Get Started for Free</button>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="text-sm text-foreground/40">© 2025 ResumeLens. Minimalist AI resume tools.</span>
          <div className="flex gap-8 text-xs font-medium text-foreground/40">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
