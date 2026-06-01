import React, { useState, useEffect } from 'react';
import { GameType, ScoreRecord } from './types';
import Dashboard from './components/Dashboard';
import ReactionTime from './components/ReactionTime';
import SequenceMemory from './components/SequenceMemory';
import ChimpanzeeTest from './components/ChimpanzeeTest';
import NumberMemory from './components/NumberMemory';
import VerbalMemory from './components/VerbalMemory';
import AimTrainer from './components/AimTrainer';
import TypingTest from './components/TypingTest';
import { Brain, Star, CheckCircle, Activity, Github } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'human_benchmark_scores_v1';

const INITIAL_SCORES: Record<GameType, ScoreRecord[]> = {
  [GameType.REACTION_TIME]: [],
  [GameType.SEQUENCE_MEMORY]: [],
  [GameType.CHIMPANZEE_TEST]: [],
  [GameType.NUMBER_MEMORY]: [],
  [GameType.VERBAL_MEMORY]: [],
  [GameType.AIM_TRAINER]: [],
  [GameType.TYPING_TEST]: []
};

export default function App() {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [scores, setScores] = useState<Record<GameType, ScoreRecord[]>>(INITIAL_SCORES);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Load scores from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with INITIAL_SCORES to support any missing games
        const mergedScores = { ...INITIAL_SCORES };
        Object.keys(parsed).forEach((key) => {
          if (key in mergedScores) {
            mergedScores[key as GameType] = parsed[key];
          }
        });
        setScores(mergedScores);
      }
    } catch (e) {
      console.error("Failed to parse local storage scores:", e);
    }
  }, []);

  // Save score callback
  const handleSaveScore = (gameId: GameType, score: number, details?: string) => {
    try {
      const newRecord: ScoreRecord = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        score,
        unit: getUnitForGame(gameId),
        details
      };

      const updatedScores = {
        ...scores,
        [gameId]: [newRecord, ...(scores[gameId] || [])]
      };

      setScores(updatedScores);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedScores));

      // Trigger a success toast
      setShowToast(`已成功保存挑战记录: ${score} ${getUnitForGame(gameId)}`);
      setTimeout(() => setShowToast(null), 3000);
    } catch (e) {
      console.error("Failed to save score:", e);
    }
  };

  const clearHistory = () => {
    if (window.confirm("确定要清空您所有的测试记录和历史最佳成绩吗？这项操作不可逆。")) {
      setScores(INITIAL_SCORES);
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setShowToast("历史记录已全部清空。");
        setTimeout(() => setShowToast(null), 2500);
      } catch (e) {
        console.error("Failed to clear scores:", e);
      }
    }
  };

  const getUnitForGame = (gameId: GameType): string => {
    switch (gameId) {
      case GameType.REACTION_TIME:
      case GameType.AIM_TRAINER:
        return 'ms';
      case GameType.SEQUENCE_MEMORY:
        return '阶';
      case GameType.CHIMPANZEE_TEST:
        return '个';
      case GameType.NUMBER_MEMORY:
        return '位';
      case GameType.VERBAL_MEMORY:
        return '分';
      case GameType.TYPING_TEST:
        return 'WPM';
      default:
        return '';
    }
  };

  const getBestScoreVal = (gameId: GameType): number | undefined => {
    const list = scores[gameId] || [];
    if (list.length === 0) return undefined;

    if (gameId === GameType.REACTION_TIME || gameId === GameType.AIM_TRAINER) {
      return [...list].sort((a, b) => a.score - b.score)[0].score;
    } else {
      return [...list].sort((a, b) => b.score - a.score)[0].score;
    }
  };

  // Switch to render corresponding active game panel
  const renderActiveGame = () => {
    if (!activeGame) return null;

    const props = {
      onSaveScore: (score: number, details?: string) => handleSaveScore(activeGame, score, details),
      onBack: () => setActiveGame(null),
      bestScore: getBestScoreVal(activeGame)
    };

    switch (activeGame) {
      case GameType.REACTION_TIME:
        return <ReactionTime {...props} />;
      case GameType.SEQUENCE_MEMORY:
        return <SequenceMemory {...props} />;
      case GameType.CHIMPANZEE_TEST:
        return <ChimpanzeeTest {...props} />;
      case GameType.NUMBER_MEMORY:
        return <NumberMemory {...props} />;
      case GameType.VERBAL_MEMORY:
        return <VerbalMemory {...props} />;
      case GameType.AIM_TRAINER:
        return <AimTrainer {...props} />;
      case GameType.TYPING_TEST:
        return <TypingTest {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-700 antialiased" id="app-root">
      {/* Toast popup */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold tracking-wide border-indigo-500 animate-slide-up">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Main Brand Ribbon Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div
            onClick={() => setActiveGame(null)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* The signature rotated white square design layout */}
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-4 h-4 border-t-2 border-r-2 border-white rotate-45 translate-x-[-1px] translate-y-[1px]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-blue-600 leading-none">
                MINDMETRIC
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">
                脑力学基准平台
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-slate-500 uppercase select-none">
            <span 
              onClick={() => setActiveGame(null)} 
              className={`hover:text-slate-850 cursor-pointer transition-colors ${!activeGame ? 'text-blue-600' : ''}`}
            >
              测评首页
            </span>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-slate-650 font-semibold text-[11px]">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>1,248 ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Primary Layout Flow */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 flex flex-col justify-start">
        {activeGame ? (
          renderActiveGame()
        ) : (
          <Dashboard
            scores={scores}
            onSelectGame={setActiveGame}
            onClearHistory={clearHistory}
          />
        )}
      </main>

      {/* Tiny clean footer */}
      <footer className="border-t border-slate-200/60 bg-white py-6 mt-12 text-center text-[11px] text-slate-400 font-medium select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            &copy; 2026 脑力基准评测中心. 保持好奇，挑战极限灵敏度。
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by React & Tailwind 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
