/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { calculateMBTI } from './utils/mbtiCalculator';
import { Answers, ScoreType } from './types';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [answers, setAnswers] = useState<Answers>({});
  const [resultType, setResultType] = useState<string>('');
  const [resultScores, setResultScores] = useState<ScoreType | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

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
    <div className={`relative overflow-hidden min-h-screen bg-black text-natural-sand transition-colors duration-300 font-sans ${isDarkMode ? 'dark' : ''}`}>
      
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

      <footer className="border-t-[3px] border-dark bg-white py-10 mt-12 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3">
          <p className="font-black text-xl text-dark text-center">
            The future is being built. Join us, or watch from the sidelines.
            <br />
            未来正在被建造。要么加入，要么旁观。
          </p>
          <span className="font-medium text-gray-500 italic">© 2026 敖AO. All rights reserved.</span>
          <p className="max-w-2xl text-[12px] leading-relaxed text-gray-600 font-medium">
            声明：本测评基于荣格心理分析学派大样本行为推论，旨在提供高质感的自我关照，性格绝无好恶优劣之分。
          </p>
        </div>
      </footer>
    </div>
  );
}
