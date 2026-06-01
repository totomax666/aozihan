import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hash, RotateCcw, ChevronLeft, Award, HelpCircle, Check, X } from 'lucide-react';

interface NumberMemoryProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type GameState = 'idle' | 'showing' | 'answering' | 'result' | 'failed';

export default function NumberMemory({ onSaveScore, onBack, bestScore }: NumberMemoryProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState<number>(1);
  const [numberStr, setNumberStr] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(100); // percentage for progress bar

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerDurationRef = useRef<number>(3000); // dynamic duration

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const generateNumber = (length: number): string => {
    let result = '';
    // Generate first digit non-zero, then rest
    result += Math.floor(Math.random() * 9 + 1).toString();
    for (let i = 1; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  };

  const startNextLevel = (lvl: number) => {
    setLevel(lvl);
    const num = generateNumber(lvl);
    setNumberStr(num);
    setUserInput('');
    setGameState('showing');
    setTimeLeft(100);

    // Dynamic timer duration: more digits, more time to read (extra 800ms per digit)
    const duration = 2000 + lvl * 1000;
    timerDurationRef.current = duration;

    const intervalStep = 50; // ms
    let elapsed = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      elapsed += intervalStep;
      const percentage = Math.max(0, 100 - (elapsed / duration) * 100);
      setTimeLeft(percentage);

      if (elapsed >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setGameState('answering');
      }
    }, intervalStep);
  };

  const handleStart = () => {
    startNextLevel(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    if (userInput.trim() === numberStr) {
      setGameState('result');
    } else {
      setGameState('failed');
      onSaveScore(level - 1, `最终挑战失败于 ${level} 位数数字，错误输入为: "${userInput}"`);
    }
  };

  const handleNext = () => {
    startNextLevel(level + 1);
  };

  const handleReset = () => {
    setNumberStr('');
    setUserInput('');
    startNextLevel(1);
  };

  // Difference highlighter between what user typed vs actual
  const renderDiff = () => {
    const minLen = Math.min(userInput.length, numberStr.length);
    const result: React.ReactNode[] = [];

    for (let i = 0; i < numberStr.length; i++) {
      const userChar = userInput[i];
      const actualChar = numberStr[i];

      if (userChar === undefined) {
        result.push(
          <span key={i} className="text-slate-400 border-b-2 border-slate-300">
            {actualChar}
          </span>
        );
      } else if (userChar === actualChar) {
        result.push(
          <span key={i} className="text-emerald-500 font-bold">
            {actualChar}
          </span>
        );
      } else {
        result.push(
          <span key={i} className="text-rose-500 font-bold bg-rose-50 underline decoration-rose-600 line-through">
            {userChar}
          </span>
        );
      }
    }

    if (userInput.length > numberStr.length) {
      for (let i = numberStr.length; i < userInput.length; i++) {
        result.push(
          <span key={i} className="text-rose-500 font-bold opacity-75 line-through">
            {userInput[i]}
          </span>
        );
      }
    }

    return result;
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="number-memory-container">
      {/* Back Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          id="btn-back-to-menu"
        >
          <ChevronLeft className="w-4 h-4" /> 返回主单
        </button>
        <div className="text-right text-xs font-mono text-slate-500">
          最佳成绩: {bestScore ? `${bestScore} 位数` : '无记录'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
        {/* Header Indicator */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-800">数字长短记忆测试</span>
          </div>
          <div className="font-mono text-sm text-slate-500 font-semibold">
            {gameState !== 'idle' ? `当前字数: ${level} 位数` : '准备'}
          </div>
        </div>

        {/* Action Content Box */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-md py-6 animate-fade-in"
                id="number-idle"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Hash className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">数字长短记忆</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  测试你的工作数字逻辑保持容量上限。屏幕将会限时闪烁一组长数字，阅读完毕后，请输入刚才你看到的那组数字。每上一关，数字就会拉长1位！
                </p>
                <button
                  onClick={handleStart}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                  id="btn-start-number"
                >
                  挑战长数
                </button>
              </motion.div>
            )}

            {gameState === 'showing' && (
              <motion.div
                key="showing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg text-center flex flex-col items-center justify-center"
                id="number-showing"
              >
                <div className="text-sm text-slate-400 font-semibold tracking-wider uppercase mb-8">
                  快速记住显示数字
                </div>

                {/* Number Monospace Display */}
                <div className="text-4xl md:text-5xl font-mono font-black text-slate-800 tracking-wider mb-8 break-all max-w-[420px] leading-snug select-none bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                  {numberStr}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden max-w-[420px]">
                  <motion.div
                    className="h-full bg-indigo-600"
                    style={{ width: `${timeLeft}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              </motion.div>
            )}

            {gameState === 'answering' && (
              <motion.div
                key="answering"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-md text-center"
                id="number-answering"
              >
                <div className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-6">
                  你刚才看到的数字是多少？
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    autoFocus
                    required
                    maxLength={level + 3}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-3.5 text-center font-mono text-3xl font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                    placeholder="输入记下的数字"
                    id="input-number-value"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
                    id="btn-submit-number"
                  >
                    提交答案
                  </button>
                </form>
              </motion.div>
            )}

            {gameState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm"
                id="number-result"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">拼写正确！</h3>
                <span className="text-xs text-slate-400 font-mono block mb-4">你的回答是</span>
                <div className="bg-slate-50 font-mono text-2xl font-bold py-2 px-5 text-indigo-800 rounded-xl max-w-xs mx-auto border border-slate-100 mb-6 break-all">
                  {userInput}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-102 active:scale-98 text-white font-semibold rounded-xl text-sm transition-all shadow-xs"
                  id="btn-number-next"
                >
                  继续进阶第 {level + 1} 关
                </button>
              </motion.div>
            )}

            {gameState === 'failed' && (
              <motion.div
                key="failed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-md"
                id="number-failed"
              >
                <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">拼写错误！</h3>
                <span className="text-xs text-slate-400 font-mono block mb-6">历史最终记录: {level - 1} 位数</span>

                {/* Highlights Difference */}
                <div className="space-y-3.5 mb-6 text-sm text-left px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="grid grid-cols-4 gap-2 items-center">
                    <span className="text-xs text-slate-400 font-semibold uppercase">标准答案</span>
                    <span className="col-span-3 font-mono text-lg font-semibold text-slate-700 break-all">{numberStr}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 items-center border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-400 font-semibold uppercase">你的拼写</span>
                    <span className="col-span-3 font-mono text-lg font-semibold break-all">{renderDiff()}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                    id="btn-retry-number"
                  >
                    重新测试
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl text-sm border border-slate-200 transition-colors"
                  >
                    返回菜单
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
