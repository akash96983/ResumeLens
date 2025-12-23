import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-border/40 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight">ResumeLens</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">How it works</Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">Pricing</Link>
          </div>
          <button className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-hero-glow blur-3xl opacity-50" />
          <div className="mx-auto max-w-7xl text-center animate-fade-in-up">
            <div className="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <span className="mr-2">✨</span> AI-Powered Resume Optimization
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
              Optimize Your Resume for <span className="text-gradient">Success</span> in Minutes
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/60">
              Stop guessing why you aren't getting interviews. ResumeLens uses advanced AI to analyze your resume against job descriptions, helping you land your dream job faster.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="w-full rounded-2xl bg-primary px-8 py-4 text-center font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 sm:w-auto">
                Analyze My Resume
              </button>
              <button className="w-full rounded-2xl border border-border glass px-8 py-4 text-center font-bold transition-all hover:bg-foreground/5 sm:w-auto">
                View Sample Report
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl rounded-3xl border border-border glass bg-white/5 p-8 dark:bg-black/20">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: "Resumes Analyzed", value: "50k+" },
                { label: "Success Rate", value: "94%" },
                { label: "Average Score Improvement", value: "35%" },
                { label: "Job Seekers Joined", value: "10k+" },
              ].map((stat, i) => (
                <div key={i} className="text-center reveal">
                  <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to <span className="text-gradient">stand out</span></h2>
              <p className="mt-4 text-foreground/60">Powerful tools designed to help you bypass ATS and impress recruiters.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "AI Analysis",
                  description: "Deep content scanning to identify gaps and opportunities in your resume narrative.",
                  icon: "🧠"
                },
                {
                  title: "Keywords Matching",
                  description: "Ensure your resume contains the exact keywords recruiters are looking for.",
                  icon: "🔍"
                },
                {
                  title: "ATS Optimization",
                  description: "Structure and format your resume to ensure it passes through Applicant Tracking Systems.",
                  icon: "🚀"
                }
              ].map((feature, i) => (
                <div key={i} className="group rounded-3xl border border-border p-8 transition-all hover:border-primary/50 hover:bg-primary/5">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-foreground/60 transition-colors group-hover:text-foreground/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-6 py-24 bg-accent/30 relative overflow-hidden">
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It <span className="text-gradient">Works</span></h2>
              <p className="mt-4 text-foreground/60">Land your dream job in three simple steps.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: "01", title: "Upload Resume", desc: "Drag and drop your PDF or DOCX file to our secure server." },
                { step: "02", title: "Analyze & Score", desc: "Our AI compares your resume against target job descriptions." },
                { step: "03", title: "Optimize", desc: "Follow personalized suggestions to fix gaps and boost your score." }
              ].map((item, i) => (
                <div key={i} className="group relative rounded-3xl border border-border bg-background p-8 transition-all hover:-translate-y-2">
                  <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-xl shadow-primary/30">
                    {item.step}
                  </div>
                  <h3 className="mb-3 mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="text-foreground/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
              <p className="mt-4 text-foreground/60">Choose the plan that's right for your career journey.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { name: "Basic", price: "$0", features: ["1 Resume Analysis/mo", "Basic Score", "General Tips"], cta: "Start for Free", popular: false },
                { name: "Pro", price: "$19", features: ["Unlimited Analysis", "Detailed Keyword Report", "ATS Formatting", "AI Summary Generator"], cta: "Go Pro Now", popular: true },
                { name: "Career", price: "$49", features: ["Everything in Pro", "LinkedIn Optimization", "Cover Letter AI", "1-on-1 Strategy Session"], cta: "Contact Sales", popular: false },
              ].map((plan, i) => (
                <div key={i} className={`relative flex flex-col rounded-3xl border p-8 transition-all hover:scale-[1.02] ${plan.popular ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'}`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">MOST POPULAR</div>}
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-sm text-foreground/60">/month</span>}
                  </div>
                  <ul className="mt-8 flex-1 space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-foreground/80">
                        <span className="text-primary">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-8 w-full rounded-2xl py-4 font-bold transition-all ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'border border-border hover:bg-foreground/5'}`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-6 py-24 bg-accent/30">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <div className="space-y-4">
              {[
                { q: "Is ResumeLens secure?", a: "Yes, we use bank-level encryption to ensure your personal data and resume content are completely secure." },
                { q: "Can I use it for free?", a: "Absolutely! Our Basic plan allows for one full resume analysis every month at no cost." },
                { q: "How accurate is the AI?", a: "Our AI is trained on thousands of successful resumes and industry-standard ATS algorithms for high accuracy." },
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-bold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-12">
          <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-lg font-bold">ResumeLens</span>
            </div>
            <p className="text-sm text-foreground/40 text-center">© 2025 ResumeLens. Empouring job seekers with AI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </footer>
      </main>
    </div >
  );
}
