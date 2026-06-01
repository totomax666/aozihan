/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Question, Answers } from '../types';
import { MBTI_QUESTIONS } from '../data/mbtiData';

interface QuizScreenProps {
  onComplete: (answers: Answers) => void;
  onBackToWelcome: () => void;
}

export default function QuizScreen({ onComplete, onBackToWelcome }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  const totalQuestions = MBTI_QUESTIONS.length;
  const currentQuestion: Question = MBTI_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);
  const answeredCount = Object.keys(answers).length;

  // Handle setting a Likert response value (-2 to 2)
  const handleSelectOption = (value: number) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    // Auto-advance with a slight delay for better sensory feedback
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setSlideDirection('forward');
        setCurrentIndex((prev) => prev + 1);
      }, 240);
    } else {
      // Finished all questions!
      setTimeout(() => {
        onComplete(updatedAnswers);
      }, 350);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setSlideDirection('backward');
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBackToWelcome();
    }
  };

  const skipToQuestion = (index: number) => {
    // Only allow skipping to already answered questions or the first unanswered one
    const isAnswered = answers[MBTI_QUESTIONS[index]?.id] !== undefined;
    const isNextUnanswered = index === Object.keys(answers).length;
    
    if (isAnswered || isNextUnanswered) {
      setSlideDirection(index > currentIndex ? 'forward' : 'backward');
      setCurrentIndex(index);
    }
  };

  // Define scale option circle buttons
  const options = [
    { value: 2, label: '同意', sizeClass: 'h-14 w-14 md:h-16 md:w-16', colorClass: 'border-natural-green bg-natural-green-lighter dark:bg-[#2a3028] dark:border-natural-green/70 text-natural-charcoal dark:text-natural-sand', ringClass: 'ring-natural-green/35' },
    { value: 1, label: '稍微同意', sizeClass: 'h-11 w-11 md:h-13 md:w-13', colorClass: 'border-natural-green-light bg-natural-green-lighter/30 dark:bg-[#232721] dark:border-natural-green-light/40 text-natural-charcoal/80 dark:text-natural-sand', ringClass: 'ring-natural-green-lighter/50' },
    { value: 0, label: '中立', sizeClass: 'h-9 w-9 md:h-10 md:w-10', colorClass: 'border-natural-border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-natural-gray dark:text-natural-gray-dark', ringClass: 'ring-natural-sand' },
    { value: -1, label: '稍微反对', sizeClass: 'h-11 w-11 md:h-13 md:w-13', colorClass: 'border-natural-gray bg-[#faf8f5]/60 dark:bg-[#34302b]/10 dark:border-[#a8a297]/30 text-natural-charcoal/80 dark:text-[#a8a297]', ringClass: 'ring-natural-border' },
    { value: -2, label: '反对', sizeClass: 'h-14 w-14 md:h-16 md:w-16', colorClass: 'border-natural-gray bg-natural-sand dark:bg-[#34302b]/40 dark:border-[#817a70]/50 text-natural-charcoal dark:text-natural-sand', ringClass: 'ring-natural-sand/75' },
  ];

  const variants = {
    initial: (direction: string) => ({
      opacity: 0,
      x: direction === 'forward' ? 120 : -120,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: string) => ({
      opacity: 0,
      x: direction === 'forward' ? -120 : 120,
    }),
  };

  const activeValue = answers[currentQuestion.id];

  const getDimensionLabel = (dim: string) => {
    switch (dim) {
      case 'EI': return '情绪与能量态度 (E/I)';
      case 'SN': return '客观与直觉感知 (S/N)';
      case 'TF': return '理性与感性抉择 (T/F)';
      case 'JP': return '条理与随机姿态 (J/P)';
      default: return `核心维度: ${dim}`;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-12 flex flex-col justify-between min-h-[75vh]">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={handlePrevQuestion}
          id="btn-back-step"
          className="flex items-center gap-1.5 text-sm font-medium text-natural-gray hover:text-natural-charcoal dark:text-neutral-400 dark:hover:text-natural-sand transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{currentIndex === 0 ? '返回大厅' : '上一题'}</span>
        </button>

        {/* Dynamic Badge indicating Axis */}
        <div className="text-xs font-serif font-medium tracking-wide bg-natural-sand text-natural-charcoal px-3.5 py-1 rounded-full dark:bg-[#2e2a25] dark:text-natural-sand">
          {getDimensionLabel(currentQuestion.dimension)} • ({currentIndex + 1}/{totalQuestions})
        </div>
      </div>

      {/* Modern High-Precision Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-end text-sm mb-2">
          <span className="font-serif font-semibold text-natural-charcoal dark:text-natural-sand flex flex-wrap items-baseline gap-2">
            <span>探索进度</span>
            <span className="text-natural-green text-base font-bold">{progressPercent}%</span>
            <span className="text-xs font-sans font-normal text-natural-gray dark:text-neutral-400">
              (已答 {answeredCount} 题 / 共 {totalQuestions} 题)
            </span>
          </span>
          <span className="text-xs text-natural-gray dark:text-neutral-500">
            还剩 {totalQuestions - answeredCount} 步探寻
          </span>
        </div>
        <div className="h-1.5 w-full bg-natural-sand dark:bg-[#2a2622] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-natural-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 80 }}
          />
        </div>
      </div>

      {/* Immersion deck slide container */}
      <div className="relative min-h-[260px] md:min-h-[220px] flex items-center justify-center mb-10 overflow-hidden py-4">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentIndex}
            custom={slideDirection}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full flex flex-col items-center text-center px-2"
          >
            <div className="inline-flex text-natural-green mb-5 bg-[#dbe1d8]/55 dark:bg-emerald-950/30 p-3 rounded-full">
              <HelpCircle size={22} className="animate-wiggle" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-serif font-medium text-natural-charcoal dark:text-white leading-relaxed px-4 md:px-8 max-w-2xl italic">
              「 {currentQuestion.text} 」
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Likert Selector Matrix */}
      <div className="bg-white/70 dark:bg-[#25211d]/50 border border-natural-border/70 dark:border-neutral-850 rounded-[32px] p-6 md:p-10 mb-8 shadow-sm">
        {/* Scale Direction Labels */}
        <div className="flex justify-between items-center px-2 md:px-8 mb-6 text-xs md:text-sm font-serif font-semibold text-natural-charcoal/90 dark:text-natural-sand/90">
          <span className="text-natural-green flex items-center gap-1.5 font-bold">
            很契合
          </span>
          <span className="hidden md:block text-xs font-sans font-normal text-natural-gray dark:text-neutral-500">
            选择符合真实下意识一刻的选择
          </span>
          <span className="text-[#a8a297] dark:text-neutral-400 flex items-center gap-1.5 font-bold">
            不契合
          </span>
        </div>

        {/* Central interactive bubble rail */}
        <div className="flex flex-row items-center justify-between gap-1.5 max-w-xl mx-auto relative py-2">
          {/* Horizontal matching track line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-natural-sand dark:bg-[#34302b] -translate-y-1/2 z-0" />

          {options.map((opt) => {
            const isSelected = activeValue === opt.value;
            return (
              <div key={opt.value} className="flex flex-col items-center gap-3 z-10">
                <button
                  onClick={() => handleSelectOption(opt.value)}
                  style={{ touchAction: 'manipulation' }}
                  className={`
                    rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm
                    ${opt.sizeClass} ${opt.colorClass}
                    ${isSelected ? `ring-4 ${opt.ringClass} scale-110 !border-natural-charcoal dark:!border-natural-sand z-20` : 'hover:scale-105 active:scale-95'}
                  `}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white dark:text-natural-dark-bg"
                    >
                      <CheckCircle2 size={24} className="fill-natural-charcoal dark:fill-natural-sand text-white dark:text-natural-dark-bg" />
                    </motion.div>
                  )}
                </button>
                <span className={`text-[10px] md:text-xs font-serif tracking-tight px-1 rounded transition-colors ${
                  isSelected 
                    ? 'text-natural-charcoal dark:text-natural-sand font-bold' 
                    : 'text-natural-gray dark:text-neutral-500'
                }`}>
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discrete Pagination Breadcrumbs / Timeline Jump Rail */}
      <div className="flex justify-center gap-1.5 flex-wrap mt-2 overflow-x-auto max-w-full py-2 px-1">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answers[MBTI_QUESTIONS[index].id] !== undefined;
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => skipToQuestion(index)}
              className={`h-1.5 rounded-full cursor-pointer transition-all duration-150 ${
                isActive
                  ? 'w-6 bg-natural-charcoal dark:bg-natural-sand'
                  : isAnswered
                    ? 'w-2 bg-natural-green'
                    : 'w-1.5 bg-natural-border dark:bg-[#34302b]'
              }`}
              title={`跳转至：第 ${index + 1} 题`}
            />
          );
        })}
      </div>
    </div>
  );
}
