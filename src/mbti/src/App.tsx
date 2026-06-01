/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { calculateMBTI } from './utils/mbtiCalculator';
import { Answers, ScoreType } from './types';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [answers, setAnswers] = useState<Answers>({});
  const [resultType, setResultType] = useState<string>('');
  const [resultScores, setResultScores] = useState<ScoreType | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync theme configurations with document body classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle questionnaire final completion submission
  const handleQuizComplete = (finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    const result = calculateMBTI(finalAnswers);
    setResultType(result.type);
    setResultScores(result.scores);
    setStep('result');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };

  const handleStartQuiz = () => {
    setAnswers({});
    setResultType('');
    setResultScores(null);
    setStep('quiz');
  };

  const handleRestart = () => {
    setAnswers({});
    setResultType('');
    setResultScores(null);
    setStep('welcome');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-natural-bg text-natural-charcoal dark:bg-natural-dark-bg dark:text-natural-sand transition-colors duration-300 font-sans">
      
      {/* Soft Organic Blur Backdrops */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#dbe1d8]/60 dark:bg-emerald-950/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#e9e4dc]/70 dark:bg-[#2a2622]/35 blur-[120px] pointer-events-none -z-10" />

      {/* Top Navbar Header */}
      <header className="border-b border-natural-border/65 bg-natural-light-sand/80 dark:bg-natural-dark-bg/85 dark:border-neutral-800/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleRestart} id="header-logo">
            <div className="h-10 w-10 bg-natural-green rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-sm">
              ψ
            </div>
            <span className="font-serif font-bold text-natural-charcoal dark:text-white tracking-tight flex items-center gap-1.5 text-lg md:text-xl">
              <span>MBTI</span>
              <span className="text-natural-green font-normal">探索测试</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Elegant Theme toggle switch */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              id="btn-toggle-theme"
              className="p-2.5 rounded-full border border-natural-border dark:border-neutral-800 text-natural-gray dark:text-neutral-500 hover:text-natural-charcoal dark:hover:text-white hover:bg-natural-sand/35 dark:hover:bg-neutral-900 transition-all cursor-pointer"
              title={isDarkMode ? "亮阳模式" : "幽谷模式"}
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="max-w-6xl mx-auto py-10 min-h-[calc(100vh-140px)] flex flex-col justify-center relative z-10 px-4">
        {step === 'welcome' && (
          <WelcomeScreen onStart={handleStartQuiz} />
        )}
        
        {step === 'quiz' && (
          <QuizScreen 
            onComplete={handleQuizComplete} 
            onBackToWelcome={handleRestart}
          />
        )}

        {step === 'result' && (
          <ResultScreen 
            type={resultType} 
            scores={resultScores || {
              EI: { left: 0, right: 0, percentage: 50 },
              SN: { left: 0, right: 0, percentage: 50 },
              TF: { left: 0, right: 0, percentage: 50 },
              JP: { left: 0, right: 0, percentage: 50 },
            }} 
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Humble Footer */}
      <footer className="border-t border-natural-border/50 bg-natural-sand/15 dark:bg-natural-dark-bg/25 dark:border-neutral-900/60 py-10 text-center text-xs text-natural-gray dark:text-neutral-500 space-y-2.5">
        <div className="flex items-center justify-center gap-2 font-mono font-medium tracking-widest uppercase">
          <Sparkles size={11} className="text-natural-green" />
          <span>MYERS-BRIGGS TYPE INDICATOR (MBTI) COMPASS</span>
        </div>
        <p className="max-w-md mx-auto px-6 leading-relaxed">
          声明：本测评基于荣格心理分析学派大样本行为推论，旨在提供高质感的自我关照，性格绝无好恶优劣之分。
        </p>
      </footer>
    </div>
  );
}
