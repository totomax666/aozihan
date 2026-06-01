import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, RotateCcw, AlertCircle, Award, ChevronLeft } from 'lucide-react';
import { ScoreRecord } from '../types';

interface ReactionTimeProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type TestState = 'idle' | 'waiting' | 'ready' | 'early' | 'result' | 'completed';

export default function ReactionTime({ onSaveScore, onBack, bestScore }: ReactionTimeProps) {
  const [gameState, _setGameState] = useState<TestState>('idle');
  const gameStateRef = useRef<TestState>('idle');
  
  const setGameState = (state: TestState) => {
    gameStateRef.current = state;
    _setGameState(state);
  };

  const [trials, setTrials] = useState<number[]>([]);
  const trialsRef = useRef<number[]>([]);

  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = 5;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const screenRef = useRef<HTMLDivElement>(null);

  const onSaveScoreRef = useRef(onSaveScore);
  useEffect(() => {
    onSaveScoreRef.current = onSaveScore;
  }, [onSaveScore]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startTest = () => {
    setGameState('waiting');
    if (screenRef.current) {
      screenRef.current.style.backgroundColor = '';
    }

    const delay = Math.random() * 3000 + 1500; // 1.5s to 4.5s
    timerRef.current = setTimeout(() => {
      // 1. Paint screen green instantly in the DOM
      if (screenRef.current) {
        screenRef.current.style.backgroundColor = '#10b981'; // bg-emerald-500
      }
      
      // 2. Capture the exact timestamp of the frame when this style gets painted
      requestAnimationFrame((timestamp) => {
        startTimeRef.current = timestamp;
        setGameState('ready');
      });
    }, delay);
  };

  const handleScreenTrigger = (clickTimeToCheck?: number) => {
    const currentState = gameStateRef.current;
    
    if (currentState === 'waiting') {
      // Clicked too early!
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('early');
    } else if (currentState === 'ready') {
      // Clicked exactly in time!
      const clickTime = clickTimeToCheck || performance.now();
      const elapsed = Math.round(clickTime - startTimeRef.current);
      
      // Safety bounds check
      const finalElapsed = Math.max(1, elapsed);
      
      const newTrials = [...trialsRef.current, finalElapsed];
      trialsRef.current = newTrials;
      setTrials(newTrials);
      
      // Clear style overrides in preparation for states showing standard styling
      if (screenRef.current) {
        screenRef.current.style.backgroundColor = '';
      }
      
      setGameState('result');
    } else if (currentState === 'idle') {
      startTest();
    } else if (currentState === 'early' || currentState === 'result') {
      if (trialsRef.current.length >= maxRounds) {
        setGameState('completed');
        const avg = Math.round(trialsRef.current.reduce((a, b) => a + b, 0) / maxRounds);
        onSaveScoreRef.current(avg, `5轮测试详情: ${trialsRef.current.map(t => t + 'ms').join(', ')}`);
      } else {
        setCurrentRound(trialsRef.current.length + 1);
        startTest();
      }
    }
  };

  const handleScreenTriggerRef = useRef(handleScreenTrigger);
  useEffect(() => {
    handleScreenTriggerRef.current = handleScreenTrigger;
  });

  // Ultra-precise native event listener bound directly to the viewport element only ONCE on mount
  useEffect(() => {
    const screenElement = screenRef.current;
    if (!screenElement) return;

    const handleNativeTrigger = (e: PointerEvent) => {
      // Screen clicks: only left clicks for mouse or any screen touches
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      
      e.preventDefault();
      e.stopPropagation();

      // Use e.timeStamp representing when OS-registered hardware level touch/click occurred
      let clickTime = e.timeStamp && e.timeStamp > 0 ? e.timeStamp : performance.now();
      if (clickTime > performance.now() + 1000) {
        clickTime = performance.now();
      }
      handleScreenTriggerRef.current(clickTime);
    };

    // Use capturing phase for near-instant dispatch (faster than bubble phase)
    screenElement.addEventListener('pointerdown', handleNativeTrigger, { capture: true, passive: false });

    return () => {
      screenElement.removeEventListener('pointerdown', handleNativeTrigger, { capture: true });
    };
  }, []); // Bound once on mount with zero state lifecycle delays!

  const resetAll = () => {
    trialsRef.current = [];
    setTrials([]);
    setCurrentRound(1);
    setGameState('idle');
    if (screenRef.current) {
      screenRef.current.style.backgroundColor = '';
    }
  };

  const avgScore = trials.length > 0 ? Math.round(trials.reduce((a, b) => a + b, 0) / trials.length) : 0;

  // Render helper for results assessment
  const getFeedback = (avg: number) => {
    if (avg < 150) return { title: "神级反应！", desc: "你的反应速度可以媲美职业电竞选手！极其敏锐的反射神经。", color: "text-purple-600" };
    if (avg < 200) return { title: "优秀！", desc: "反应极快，远超平均水平（人类均值约 250ms）。", color: "text-emerald-500" };
    if (avg < 260) return { title: "正常水平", desc: "处于健康的人类平均水准，保持得很好！", color: "text-blue-500" };
    if (avg < 350) return { title: "稍显迟缓", desc: "比平均水准稍慢一些。可能现在有些疲惫，打起精神来！", color: "text-amber-500" };
    return { title: "迟钝反应", desc: "点击偏慢。可以尝试放松身心或找个明亮的环境重新测试！", color: "text-rose-500" };
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in" id="reaction-time-container">
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
          历史最佳: {bestScore ? `${bestScore} ms` : '无记录'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[580px] flex flex-col transition-all duration-300">
        {/* Progress Grid */}
        {gameState !== 'completed' && (
          <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-slate-800">反应速度测试 (大屏专注版)</span>
            </div>
            <div className="font-mono text-sm text-slate-500 flex items-center gap-3">
              <span>第 {currentRound}/{maxRounds} 轮</span>
              <div className="flex gap-1">
                {Array.from({ length: maxRounds }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < trials.length
                        ? 'bg-emerald-500'
                        : i === trials.length && gameState !== 'idle'
                        ? 'bg-indigo-400 animate-pulse'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reaction Screen Box */}
        <div className="flex-1 flex flex-col">
          {gameState !== 'completed' ? (
            <div
              ref={screenRef}
              id={`screen-reaction-${gameState}`}
              className={`flex-1 flex flex-col items-center justify-center p-12 md:p-16 text-center cursor-pointer select-none touch-none min-h-[480px] md:min-h-[520px] relative ${
                gameState === 'idle' ? 'bg-blue-600 hover:bg-blue-600/95 text-white' :
                gameState === 'waiting' ? 'bg-rose-500 text-white' :
                gameState === 'ready' ? 'bg-emerald-500 text-white' :
                gameState === 'early' ? 'bg-indigo-500 text-white' :
                'bg-slate-800 text-white'
              }`}
              style={{ contentVisibility: 'auto' }}
            >
              {gameState === 'idle' && (
                <>
                  <div className="p-5 rounded-full bg-white/10 mb-5 animate-bounce">
                    <Zap className="w-12 h-12 text-white" fill="white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 tracking-tight">反应速度测试</h2>
                  <p className="text-blue-100 max-w-md text-sm leading-relaxed mb-6">
                    当屏幕转为<span className="font-semibold text-emerald-300 font-bold"> 绿色 </span>的那秒，立即点击屏幕任意区域！
                  </p>
                  <div className="px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors">
                    点击屏幕任意地方开始
                  </div>
                </>
              )}

              {gameState === 'waiting' && (
                <>
                  <h2 className="text-4xl font-extrabold mb-3 tracking-wide animate-pulse">等等... 别点...</h2>
                  <p className="text-rose-100 font-medium">听到信号：当屏幕变成绿色时，光速点击！</p>
                </>
              )}

              {gameState === 'ready' && (
                <>
                  <h2 className="text-6xl font-black mb-2 animate-scale tracking-widest">点！！！</h2>
                  <p className="text-emerald-500">
                    <span className="bg-white/95 text-emerald-600 px-3.5 py-1.5 rounded-full font-bold text-sm tracking-wide shadow-sm">
                      NOW!
                    </span>
                  </p>
                </>
              )}

              {gameState === 'early' && (
                <>
                  <AlertCircle className="w-16 h-16 text-amber-300 mb-4 animate-bounce" />
                  <h2 className="text-3xl font-bold mb-2">抢跑啦！</h2>
                  <p className="text-indigo-100 mb-6 text-sm">在颜色变绿之前你就点击了。不要预测它，等待那一瞬间！</p>
                  <div className="px-5 py-2.5 bg-white/20 rounded-lg text-sm font-semibold transition-colors">
                    点击屏幕继续
                  </div>
                </>
              )}

              {gameState === 'result' && (
                <>
                  <span className="text-sm font-mono text-slate-400 mb-2">第 {trials.length} 轮用时</span>
                  <h2 className="text-6xl font-mono font-bold text-teal-400 mb-3 tracking-tight">
                    {trials[trials.length - 1]} <span className="text-2xl text-slate-400">ms</span>
                  </h2>
                  <p className="text-slate-300 text-sm mb-6 max-w-sm">
                    点击此处继续进行下一手测试。
                  </p>
                  <div className="px-5 py-3 bg-teal-500 text-slate-900 font-bold rounded-lg text-sm flex items-center gap-1">
                    继续下一次测试 (点击屏幕)
                  </div>
                </>
              )}
            </div>
          ) : (
            <div
              className="flex-1 flex flex-col items-center justify-center p-8 max-w-lg mx-auto"
              id="screen-reaction-completed"
            >
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-xs">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">测试完成！</h2>
              <span className="text-xs font-mono uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold mb-4">
                平均反应时间
              </span>
              <div className="text-5xl font-mono font-black text-indigo-700 tracking-tight mb-2">
                {avgScore} <span className="text-xl font-normal text-slate-500">ms</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 w-full mb-6">
                <h3 className={`font-semibold mb-1 ${getFeedback(avgScore).color}`}>
                  {getFeedback(avgScore).title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {getFeedback(avgScore).desc}
                </p>
              </div>

              <div className="w-full space-y-2 mb-6 text-sm">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 pl-1 text-left">各轮次详情</div>
                <div className="grid grid-cols-5 gap-2 font-mono">
                  {trials.map((t, idx) => (
                    <div key={idx} className="bg-slate-100 text-slate-700 py-2.5 rounded-lg border border-slate-200/40 text-center text-xs">
                      <div className="text-[10px] text-slate-400 mb-0.5">#{idx + 1}</div>
                      <div className="font-bold">{t}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={resetAll}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                  id="btn-reaction-retry"
                >
                  <RotateCcw className="w-4 h-4" /> 重新测试
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors border border-slate-200"
                  id="btn-reaction-exit"
                >
                  返回主单
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
