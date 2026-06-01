import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, RotateCcw, ChevronLeft, Award } from 'lucide-react';

interface AimTrainerProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type GameState = 'idle' | 'playing' | 'completed';

interface TargetCoords {
  x: number; // percentage (left)
  y: number; // percentage (top)
}

export default function AimTrainer({ onSaveScore, onBack, bestScore }: AimTrainerProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentClick, setCurrentClick] = useState<number>(0);
  const [targetPos, setTargetPos] = useState<TargetCoords>({ x: 50, y: 50 });
  const [clicksHistory, setClicksHistory] = useState<number[]>([]);

  const totalTargets = 30;
  const startTimeRef = useRef<number>(0);
  const lastClickTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setCurrentClick(0);
    setClicksHistory([]);
    setTargetPos({ x: 50, y: 50 });
    setGameState('playing');
    startTimeRef.current = performance.now();
    lastClickTimeRef.current = performance.now();
  };

  const getNewRandomPos = (): TargetCoords => {
    // Keep targets slightly away from the container edges
    const x = Math.floor(Math.random() * 84) + 8; // 8% to 92%
    const y = Math.floor(Math.random() * 76) + 12; // 12% to 88%
    return { x, y };
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering misclicks on container
    if (gameState !== 'playing') return;

    const now = performance.now();
    const elapsedSinceLast = now - lastClickTimeRef.current;
    lastClickTimeRef.current = now;

    const nextClickCount = currentClick + 1;
    setCurrentClick(nextClickCount);

    const updatedHistory = [...clicksHistory, elapsedSinceLast];
    setClicksHistory(updatedHistory);

    if (nextClickCount >= totalTargets) {
      // Game end! Calculate total runtime
      const totalElapsed = now - startTimeRef.current;
      const averageMs = Math.round(totalElapsed / totalTargets);
      setGameState('completed');
      onSaveScore(averageMs, `共耗时: ${(totalElapsed / 1000).toFixed(2)}秒 点击完30个靶点`);
    } else {
      setTargetPos(getNewRandomPos());
    }
  };

  const handleMisclick = () => {
    // In humanbenchmark, misclicks can be tracked but let's make it a minor delay penalty
    // or just let them fire away. To keep gameplay satisfying, misclicks don't abort, just increase total time.
  };

  const currentAvg = clicksHistory.length > 0
    ? Math.round(clicksHistory.reduce((a, b) => a + b, 0) / clicksHistory.length)
    : 0;

  const getFeedback = (avg: number) => {
    if (avg < 200) return "终极神射手！微秒精确度爆表。";
    if (avg < 300) return "专业电竞大佬！完美的定位与极速点击。";
    if (avg < 400) return "高水平！拥有灵动的手眼配合。";
    if (avg < 550) return "正常水平，具备健康的人机协调。";
    return "点击稍显吃力。可以尝试优化鼠标灵敏度或用大屏测试。";
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="aim-trainer-container">
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
          最佳成绩: {bestScore ? `${bestScore} ms` : '无记录'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
        {/* Top Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-800">靶点追踪精确度训练 (Aim Trainer)</span>
          </div>
          <div className="font-mono text-sm font-semibold text-slate-500 select-none">
            {gameState === 'playing' ? `点击配额: ${currentClick}/${totalTargets}` : '就绪'}
          </div>
        </div>

        {/* Shoot Area */}
        <div className="flex-1 flex flex-col items-stretch relative min-h-[380px] bg-slate-50/50">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                id="aim-idle"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 border border-blue-100 shadow-xs">
                  <Target className="w-8 h-8" fill="rgba(59, 130, 246, 0.1)" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">手眼协调靶点定位测试</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                  请迅速用指针或点按手势击中在测试盘里随机闪显的 30 个环形标靶。本测试将精准测出你的像素定位响应平均耗时。
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                  id="btn-start-aim"
                >
                  开启瞄准镜
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="shooting-range"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={containerRef}
                onClick={handleMisclick}
                className="absolute inset-0 select-none cursor-crosshair overflow-hidden"
                id="aim-canvas"
              >
                {/* Dynamically Populating Current Ring */}
                <motion.button
                  key={currentClick}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  onClick={handleTargetClick}
                  className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 outline-hidden z-20"
                  style={{
                    left: `${targetPos.x}%`,
                    top: `${targetPos.y}%`,
                  }}
                  id={`aim-bullseye-${currentClick}`}
                >
                  {/* Visual target concentric design */}
                  <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-25" />
                  <div className="absolute inset-0 bg-indigo-600/90 rounded-full border border-white flex items-center justify-center shadow-md">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3.5 h-3.5 bg-indigo-600 rounded-full" />
                    </div>
                  </div>
                </motion.button>

                <div className="absolute bottom-4 left-4 font-mono text-xs font-semibold text-slate-400 bg-white/80 border border-slate-100 px-3 py-1.5 rounded-lg">
                  实时平均: {currentAvg} ms
                </div>
              </motion.div>
            )}

            {gameState === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                id="aim-completed"
              >
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-xs">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">测试完成！</h2>
                <span className="text-xs text-slate-400 font-mono uppercase bg-slate-100 text-slate-600 px-3.5 py-1 rounded-full font-bold mb-4 block">
                  平均靶点点击时差
                </span>
                <div className="text-5xl font-mono font-black text-indigo-600 tracking-tight mb-3">
                  {currentAvg} <span className="text-xl font-normal text-slate-500">ms</span>
                </div>

                <div className="bg-slate-50 text-xs text-slate-500 border border-slate-100 rounded-xl p-4 mb-6 leading-relaxed max-w-sm text-left">
                  <span className="font-semibold text-slate-700 block mb-0.5">表现定位:</span>
                  {getFeedback(currentAvg)}
                </div>

                <div className="flex gap-4 w-full max-w-sm">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                    id="btn-aim-retry"
                  >
                    重新训练
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
