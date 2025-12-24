import React from 'react';

interface AnalysisResultProps {
    analysis: {
        matchScore: number;
        missingKeywords: string[];
        sectionCritique: {
            Skills: string;
            Experience: string;
            Education: string;
            General: string;
        };
    };
    onStartInterview: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onStartInterview }) => {
    return (
        <div className="container-width section-padding animate-fade-in-up">
            <div className="reveal active flex flex-col items-center text-center">
                <div className="relative mb-8 h-32 w-32">
                    <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                        <circle
                            className="stroke-accent fill-none"
                            strokeWidth="10"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                        <circle
                            className="stroke-primary fill-none transition-all duration-1000 ease-out"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 40}
                            strokeDashoffset={2 * Math.PI * 40 * (1 - analysis.matchScore / 100)}
                            strokeLinecap="round"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                        {analysis.matchScore}%
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">Match Score</h2>
                <p className="max-w-xl text-muted">
                    Your resume is a {analysis.matchScore < 70 ? 'moderate' : 'strong'} match for this role.
                    Focus on the missing keywords below to improve your score.
                </p>
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-2">
                <div className="reveal active card-simple">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-red-500">⚠</span> Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {analysis.missingKeywords.map((keyword, i) => (
                            <span key={i} className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-100">
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="reveal active card-simple">
                    <h3 className="text-xl font-bold mb-6">Section-by-Section Critique</h3>
                    <div className="space-y-6">
                        {Object.entries(analysis.sectionCritique).map(([section, critique], i) => (
                            <div key={i}>
                                <h4 className="font-bold text-sm uppercase tracking-wider text-muted mb-2">{section}</h4>
                                <p className="text-sm leading-relaxed">{critique}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="reveal active mt-16 flex justify-center">
                <button
                    onClick={onStartInterview}
                    className="btn-primary flex items-center gap-2 px-10 py-4 text-lg"
                >
                    Practice for this Role →
                </button>
            </div>
        </div>
    );
};
