import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, RotateCcw, Award, ChevronLeft, HelpCircle } from 'lucide-react';

interface SequenceMemoryProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type GameState = 'idle' | 'showing' | 'playing' | 'failed' | 'complete';

export default function SequenceMemory({ onSaveScore, onBack, bestScore }: SequenceMemoryProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userIndex, setUserIndex] = useState<number>(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);

  const playingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stop timeout on clean up
  useEffect(() => {
    return () => {
      if (playingTimeoutRef.current) clearTimeout(playingTimeoutRef.current);
    };
  }, []);

  const startGame = () => {
    const startSeq = [Math.floor(Math.random() * 9)];
    setSequence(startSeq);
    setLevel(1);
    setUserIndex(0);
    playSequence(startSeq);
  };

  const playSequence = (seq: number[]) => {
    setGameState('showing');
    setUserIndex(0);

    let idx = 0;
    const playNext = () => {
      if (idx < seq.length) {
        setActiveTile(seq[idx]);
        playingTimeoutRef.current = setTimeout(() => {
          setActiveTile(null);
          playingTimeoutRef.current = setTimeout(() => {
            idx++;
            playNext();
          }, 150); // Pause between flashes
        }, 450); // Flash duration
      } else {
        setGameState('playing');
      }
    };

    // Minor delay before starting playback
    playingTimeoutRef.current = setTimeout(() => {
      playNext();
    }, 600);
  };

  const handleTileClick = (tileIdx: number) => {
    if (gameState !== 'playing' || userIndex >= sequence.length) return;

    // Direct active feedback
    setActiveTile(tileIdx);
    setTimeout(() => {
      setActiveTile(null);
    }, 150);

    if (tileIdx === sequence[userIndex]) {
      // Correct click
      const nextIndex = userIndex + 1;
      if (nextIndex === sequence.length) {
        // Round passed! Update userIndex so the display reflects completion (e.g. 1/1)
        setUserIndex(nextIndex);
        
        if (playingTimeoutRef.current) clearTimeout(playingTimeoutRef.current);
        
        // Wait 800ms before moving to the next level
        playingTimeoutRef.current = setTimeout(() => {
          const nextLevel = level + 1;
          setLevel(nextLevel);
          const nextSeq = [...sequence, Math.floor(Math.random() * 9)];
          setSequence(nextSeq);
          playSequence(nextSeq);
        }, 800);
      } else {
        setUserIndex(nextIndex);
      }
    } else {
      // Made a mistake!
      setGameState('failed');
      onSaveScore(level, `通过了 ${level - 1} 层记忆链路`);
    }
  };

  const getPercentile = (lvl: number) => {
    if (lvl > 15) return "顶尖 1%";
    if (lvl > 10) return "顶尖 10%";
    if (lvl > 7) return "前 30%";
    if (lvl > 4) return "平均水平";
    return "记忆不足，多加练习哦！";
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="sequence-memory-container">
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
          历史最佳: {bestScore ? `${bestScore} 阶` : '无记录'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
        {/* Progress Grid */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-800">闪烁序列记忆测试</span>
          </div>
          <div className="font-mono text-sm font-semibold text-indigo-600">
            {gameState === 'idle' ? '准备就绪' : `等级 (长): ${level}`}
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-md py-6"
                id="sequence-idle-view"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-xs">
                  <Grid className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">闪烁序列记忆</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  测试你的瞬时顺向视觉记忆。屏幕正中央 3×3 宫格将会依次闪烁蓝色亮块，请按同样的闪烁顺序精确点按它们！
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                  id="btn-start-sequence"
                >
                  开始记忆
                </button>
              </motion.div>
            )}

            {(gameState === 'showing' || gameState === 'playing') && (
              <motion.div
                key="gameplay"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center w-full"
                id="sequence-gameplay-view"
              >
                {/* Status Indicator Bar */}
                <div className="mb-6 text-center">
                  {gameState === 'showing' ? (
                    <span className="px-3.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-medium rounded-full text-xs animate-pulse">
                      仔细观察序列闪烁中...({sequence.length} 个步骤)
                    </span>
                  ) : (
                    <span className="px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium rounded-full text-xs">
                      请复现刚才的序列！({userIndex}/{sequence.length})
                    </span>
                  )}
                </div>

                {/* Grid Grid Layout */}
                <div className="grid grid-cols-3 gap-3 w-72 h-72 p-3 bg-slate-900 rounded-2xl shadow-inner border border-slate-950">
                  {Array.from({ length: 9 }).map((_, idx) => {
                    const isActive = activeTile === idx;
                    return (
                      <button
                        key={idx}
                        disabled={gameState !== 'playing'}
                        onClick={() => handleTileClick(idx)}
                        className={`relative rounded-xl transition-all duration-100 outline-hidden ${
                          isActive
                            ? 'bg-blue-400 border-2 border-white scale-95 shadow-lg shadow-blue-400/50 z-10'
                            : 'bg-slate-700/80 hover:bg-slate-600 hover:scale-102 border-2 border-slate-800 active:scale-95 active:bg-slate-500'
                        } aspect-square disabled:cursor-not-allowed`}
                        id={`tile-${idx}`}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}

            {gameState === 'failed' && (
              <motion.div
                key="failed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm py-4"
                id="sequence-failed-view"
              >
                <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">测试结束！</h2>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">你达到的关卡层数</div>
                <div className="text-6xl font-black text-rose-500 font-mono tracking-tight mb-4">
                  {level} <span className="text-lg font-normal text-slate-400">阶</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                  <div className="font-semibold text-slate-700 text-sm mb-1">击败率表现</div>
                  <div className="text-xs text-slate-500">{getPercentile(level)}</div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                    id="btn-retry-sequence"
                  >
                    重新挑战
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl text-sm border border-slate-200 transition-colors"
                    id="btn-exit-sequence"
                  >
                    返回主单
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
