import React, { useState, useEffect, useRef } from 'react';

interface Question {
    id: string;
    question: string;
    focusArea: string;
}

interface Feedback {
    situation: string;
    task: string;
    action: string;
    result: string;
    overallAdvise: string;
}

interface Message {
    type: 'ai' | 'user';
    text: string;
    feedback?: Feedback;
    score?: number;
}

interface InterviewCoachProps {
    questions: Question[];
}

export const InterviewCoach: React.FC<InterviewCoachProps> = ({ questions }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (questions.length > 0) {
            setMessages([{ type: 'ai', text: questions[0].question }]);
        }
    }, [questions]);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [messages, isTyping]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isTyping) return;

        const answer = userInput.trim();
        setMessages(prev => [...prev, { type: 'user', text: answer }]);
        setUserInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/interview/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: questions[currentQuestionIndex].question, answer }),
            });

            const result = await response.json();
            setMessages(prev => [...prev, {
                type: 'ai',
                text: `Thanks for sharing. Here is your STAR feedback:`,
                feedback: result.feedback,
                score: result.score
            }]);

            if (currentQuestionIndex < questions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setMessages(prev => [...prev, { type: 'ai', text: questions[currentQuestionIndex + 1].question }]);
                }, 3000);
            } else {
                setTimeout(() => {
                    setMessages(prev => [...prev, { type: 'ai', text: "That concludes our mock interview session. You've shown great potential! Use the feedback provided to refine your stories." }]);
                }, 1500);
            }
        } catch (error) {
            console.error("Feedback error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="container-width section-padding flex flex-col h-[600px] max-w-4xl">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-6 pb-6 scroll-smooth pr-4 custom-scrollbar"
            >
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-card border border-border shadow-sm'}`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>

                            {msg.feedback && (
                                <div className="mt-4 border-t border-border pt-4 space-y-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">STAR Analysis</span>
                                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">Score: {msg.score}/10</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['situation', 'task', 'action', 'result'].map((part) => (
                                            <div key={part}>
                                                <div className="text-[10px] font-bold uppercase text-muted mb-1">{part}</div>
                                                <p className="text-xs leading-relaxed text-foreground/80">{(msg.feedback as any)[part]}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-accent p-3 rounded-xl">
                                        <div className="text-[10px] font-bold uppercase text-muted mb-1">Coach Advise</div>
                                        <p className="text-xs italic leading-relaxed">{msg.feedback.overallAdvise}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-card border border-border rounded-2xl p-4 flex gap-2">
                            <span className="h-1.5 w-1.5 bg-muted rounded-full animate-bounce"></span>
                            <span className="h-1.5 w-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="h-1.5 w-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer here..."
                    className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all"
                />
                <button
                    disabled={isTyping}
                    type="submit"
                    className="btn-primary py-3 px-6 text-sm disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    );
};
