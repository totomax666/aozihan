import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, RotateCcw, ChevronLeft, Award } from 'lucide-react';

interface TypingTestProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type GameState = 'idle' | 'playing' | 'completed';

const PASSAGES = [
  "时间像一条静静流淌的小河，带走了昨天的回忆，却在我们的心底留下了深刻的印记。在科技飞速发展的时代，保持内心的专注和宁静变得越来越珍贵。每一次键盘的跳动，都是我们与数字世界最真切的对话和碰撞。",
  "生命的价值不仅在于我们追求高度，更在于我们拓宽视野的广度。在每一次脑力和敏捷反应的训练中，我们不仅在对抗物理上的衰老，也是在为自己的脑细胞开辟新的通路。保持好奇心，不断探索未知的边界，就是年轻最好的秘诀。",
  "每一个程序员的生活中都少不了一行行代码。这些由字母和标点符号拼凑出来的魔法，正在夜以继日地改变着这个真实世界的样貌。我们用逻辑构建大厦，用严谨规范行为。打字并不只是单纯的手指敲击，而是将脑中跳跃的思想转化为实体力量的过程。",
  "深呼吸，闭上眼，去感受指腹触碰键盘的质感。在这里，每一个字符都是一次对当下注意力的重新校正。我们的手指在平坦的按键上起舞，拼接着逻辑、信念、或者只是一段温暖平静的旅途。专注、冷静、坚定，直到最后一个句号落下。"
];

export default function TypingTest({ onSaveScore, onBack, bestScore }: TypingTestProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [passage, setPassage] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [wpm, setWpm] = useState<number>(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTest = () => {
    const randomPassage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
    setPassage(randomPassage);
    setTypedText('');
    setStartTime(null);
    setElapsedSeconds(0);
    setAccuracy(100);
    setWpm(0);
    setGameState('playing');

    if (timerRef.current) clearInterval(timerRef.current);

    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (gameState !== 'playing') return;

    const value = e.target.value;

    // Start timer on first keystroke
    let activeStartTime = startTime;
    if (startTime === null && value.length > 0) {
      activeStartTime = performance.now();
      setStartTime(activeStartTime);

      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    setTypedText(value);

    // Calculate accuracy (%)
    let correctCount = 0;
    const minLen = Math.min(value.length, passage.length);
    for (let i = 0; i < value.length; i++) {
      if (value[i] === passage[i]) {
        correctCount++;
      }
    }
    const currentAccuracy = value.length > 0 ? Math.round((correctCount / value.length) * 100) : 100;
    setAccuracy(currentAccuracy);

    // Check completion
    if (value.length >= passage.length) {
      // Complete!
      if (timerRef.current) clearInterval(timerRef.current);

      const endTime = performance.now();
      const timeTakenMinutes = (endTime - (activeStartTime || endTime)) / 60000;
      // Formula: (Correct Characters / 5) / Time (Minutes)
      // Since it's Chinese text, WPM is often measured directly in Chinese Characters Per Minute (CPM) or standard WPM.
      // Let's do standard CPM / 2 or direct characters per minute as a hybrid WPM that looks standard.
      const finalWpm = timeTakenMinutes > 0 ? Math.round((correctCount) / timeTakenMinutes) : 0;

      setWpm(finalWpm);
      setGameState('completed');
      onSaveScore(finalWpm, `准确率: ${currentAccuracy}%, 耗时: ${Math.round((endTime - (activeStartTime || endTime)) / 1000)}秒`);
    }
  };

  const triggerFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const currentWpm = () => {
    if (!startTime || elapsedSeconds === 0) return 0;
    let correctCount = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === passage[i]) {
        correctCount++;
      }
    }
    const timeTakenMinutes = elapsedSeconds / 60;
    return Math.round(correctCount / timeTakenMinutes);
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="typing-test-container">
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
          最佳成绩: {bestScore ? `${bestScore} WPM` : '无记录'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
        {/* Top Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-800">键盘极速打字测试 (Typing Test)</span>
          </div>
          {gameState === 'playing' && (
            <div className="font-mono text-xs flex items-center gap-4 text-slate-500 select-none">
              <span>时间: <b className="text-indigo-600">{elapsedSeconds}</b> 秒</span>
              <span>实时字速: <b className="text-emerald-500">{currentWpm()}</b> 字/分</span>
              <span>精准: <b className="text-amber-500">{accuracy}%</b></span>
            </div>
          )}
        </div>

        {/* Display screen */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-sm mx-auto py-6"
                id="typing-idle"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-500 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">极速键盘盲打测试</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  测试你对实体键盘或者虚拟触键底层的肌群反射。系统将任意挑出一段励志短文，请保持双手专注，最快最准地拼打出对应文本！
                </p>
                <button
                  onClick={startTest}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                  id="btn-start-typing"
                >
                  指尖起舞
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="typing-arena"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full text-left"
                onClick={triggerFocus}
              >
                {/* Passage Typography */}
                <div className="relative text-lg md:text-xl font-medium tracking-wide bg-slate-50/70 hover:bg-slate-50 border border-slate-100 p-6 rounded-2xl cursor-text leading-relaxed select-none mb-6">
                  {passage.split('').map((char, index) => {
                    let charClass = "text-slate-400"; // default unentered
                    if (index < typedText.length) {
                      charClass = typedText[index] === char
                        ? "text-emerald-500 font-bold border-b-2 border-emerald-400/30"
                        : "text-rose-500 font-bold bg-rose-50 border-b-2 border-rose-400";
                    } else if (index === typedText.length) {
                      charClass = "text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600 animate-pulse";
                    }

                    return (
                      <span key={index} className={`${charClass} transition-colors duration-100`}>
                        {char}
                      </span>
                    );
                  })}
                </div>

                {/* Invisible input capture text */}
                <textarea
                  ref={inputRef}
                  value={typedText}
                  onChange={handleTextChange}
                  className="w-full opacity-0 h-0 p-0 m-0 absolute -top-40 outline-hidden pointer-events-none"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  placeholder="在这里开始打字"
                  id="typing-input-area"
                />

                <div className="text-center text-xs text-indigo-400 select-none animate-pulse">
                  点击上方空白文本框即可唤醒输入光标，并直接开始击键。
                </div>
              </motion.div>
            )}

            {gameState === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm mx-auto py-6"
                id="typing-completed"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">指法测试告捷！</h2>
                <span className="text-xs text-slate-400 font-mono uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold mb-4 block">
                  平均键盘输出字速 (CPM/WPM)
                </span>
                <div className="text-5.55xl font-mono font-black text-indigo-700 tracking-tight mb-2">
                  {wpm} <span className="text-lg font-normal text-slate-500">字/分钟</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 font-mono bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <div className="text-center border-r border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">准确率</div>
                    <div className="text-2xl font-bold text-slate-700">{accuracy}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">输入总时</div>
                    <div className="text-2xl font-bold text-slate-700">{elapsedSeconds}s</div>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={startTest}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                    id="btn-typing-retry"
                  >
                    <RotateCcw className="w-4 h-4 inline mr-1" /> 再次战斗
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 bg-slate-101 hover:bg-slate-200 text-slate-600 font-medium rounded-xl text-sm border border-slate-200 transition-colors"
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
