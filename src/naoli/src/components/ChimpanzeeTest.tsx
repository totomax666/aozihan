import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, RotateCcw, Heart, AlertCircle, ChevronLeft, VolumeX } from 'lucide-react';

interface ChimpanzeeTestProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type GameState = 'idle' | 'showing' | 'playing' | 'failed' | 'strike_out';

interface Position {
  row: number;
  col: number;
}

interface Tile {
  id: number; // 1 to N
  pos: Position;
  revealed: boolean;
  clicked: boolean;
}

export default function ChimpanzeeTest({ onSaveScore, onBack, bestScore }: ChimpanzeeTestProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [numCount, setNumCount] = useState<number>(4); // Started with 4 digits (1, 2, 3, 4)
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [expectedNext, setExpectedNext] = useState<number>(1);
  const [hideNumbers, setHideNumbers] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [strikeThisRound, setStrikeThisRound] = useState<boolean>(false);

  const rows = 5;
  const cols = 8;

  const generateBoard = (count: number) => {
    // Generate distinct random positions on a 5x8 grid
    const totalCells = rows * cols;
    const availableCells: number[] = Array.from({ length: totalCells }).map((_, i) => i);
    const shuffled: number[] = [...availableCells].sort(() => Math.random() - 0.5);

    const positions: Position[] = shuffled.slice(0, count).map(index => {
      const r = Math.floor(index / cols);
      const c = index % cols;
      return { row: r, col: c };
    });

    const newTiles: Tile[] = positions.map((pos, index) => ({
      id: index + 1, // 1 to N
      pos,
      revealed: true,
      clicked: false
    }));

    setTiles(newTiles);
    setExpectedNext(1);
    setHideNumbers(false);
    setStrikeThisRound(false);
  };

  const startLevel = (count: number) => {
    setGameState('playing');
    generateBoard(count);
  };

  const handleTileClick = (tile: Tile) => {
    if (gameState !== 'playing') return;
    if (tile.clicked) return;

    if (tile.id === expectedNext) {
      // Correct click!
      const updatedTiles = tiles.map(t =>
        t.id === tile.id ? { ...t, clicked: true, revealed: false } : t
      );
      setTiles(updatedTiles);

      // Hide numbers once the FIRST tile (1) is clicked
      if (tile.id === 1) {
        setHideNumbers(true);
      }

      const nextExpected = expectedNext + 1;
      if (nextExpected > numCount) {
        // Round Win! Increase numbers by 1
        const nextCount = numCount + 1;
        setNumCount(nextCount);
        setTimeout(() => {
          startLevel(nextCount);
        }, 600);
      } else {
        setExpectedNext(nextExpected);
      }
    } else {
      // Incorrect click!
      const updatedLives = lives - 1;
      setLives(updatedLives);
      setStrikeThisRound(true);

      if (updatedLives <= 0) {
        setGameState('strike_out');
        onSaveScore(numCount, `成功连续击破 ${numCount - 1} 块极速变化板`);
      } else {
        setGameState('failed');
      }
    }
  };

  const handleContinueAfterStrike = () => {
    // Retry this count again
    setGameState('playing');
    generateBoard(numCount);
  };

  const handleReset = () => {
    setNumCount(4);
    setLives(3);
    setGameState('playing');
    generateBoard(4);
  };

  // Convert row, col to index or check if a cell contains a tile
  const getTileAt = (r: number, c: number): Tile | undefined => {
    return tiles.find(t => t.pos.row === r && t.pos.col === c);
  };

  return (
    <div className="w-full max-w-3xl mx-auto" id="chimpanzee-test-container">
      {/* Back Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          id="btn-back-to-menu"
        >
          <ChevronLeft className="w-4 h-4" /> 返回主单
        </button>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`}
              />
            ))}
          </div>
          <div className="text-right text-xs font-mono text-slate-500">
            最佳成绩: {bestScore ? `${bestScore} 个` : '无记录'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
        {/* Top Panel Banner */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-800">黑猩猩短期记忆测试 (Chimpanzee Test)</span>
          </div>
          <div className="font-mono text-sm font-semibold text-slate-500 select-none">
            {gameState !== 'idle' ? `当前目标: 依次记忆点击 ${numCount} 个数字` : '就绪'}
          </div>
        </div>

        {/* Board Canvas Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50/10 min-h-[380px]">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-md py-6"
                id="chimp-idle-view"
              >
                <div className="p-4 rounded-full bg-orange-50 text-orange-600 border border-orange-100 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Layers className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">黑猩猩记忆空间试验</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  这是京都大学极著名的黑猩猩对照测试。网格中会出现若干个数字，<b>当你点击 1 时，其余的数字都会隐藏</b>。请凭借短期脑干记忆，按正确的升序（1 → 2 → 3...）点击每个方格！
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                  id="btn-start-chimp"
                >
                  开始试验
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="gameboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-xl mx-auto flex flex-col items-center"
              >
                {/* Board Layout */}
                <div className="grid grid-cols-8 gap-2 w-full aspect-[8/5] bg-slate-900 p-3 rounded-2xl border border-slate-950 shadow-inner">
                  {Array.from({ length: rows }).map((_, r) => (
                    <React.Fragment key={r}>
                      {Array.from({ length: cols }).map((_, c) => {
                        const tile = getTileAt(r, c);
                        return (
                          <div key={c} className="w-full h-full aspect-square flex items-center justify-center">
                            {tile ? (
                              <button
                                disabled={tile.clicked}
                                onClick={() => handleTileClick(tile)}
                                className={`w-full h-full rounded-lg font-mono font-bold text-lg flex items-center justify-center transition-all ${
                                  tile.clicked
                                    ? 'bg-transparent border-none text-transparent'
                                    : hideNumbers
                                    ? 'bg-blue-600 border border-blue-500 hover:bg-blue-500 text-transparent shadow-xs active:scale-95'
                                    : 'bg-white border-2 border-slate-400 hover:bg-slate-100 text-indigo-900 shadow-md transform hover:scale-102 active:scale-95'
                                }`}
                                id={`chimp-tile-${tile.id}`}
                              >
                                {!hideNumbers && tile.id}
                              </button>
                            ) : (
                              <div className="w-full h-full rounded-lg bg-slate-800/20" />
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>

                <div className="mt-4 text-xs font-medium text-slate-400">
                  点击数字 1 后，其他数字将全部消失。
                </div>
              </motion.div>
            )}

            {gameState === 'failed' && (
              <motion.div
                key="strike"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-sm py-6"
                id="chimp-strike-view"
              >
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-4 border border-amber-100 animate-pulse">
                  <AlertCircle className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">失误一次！</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  糟糕！点击了错误的数字格。你失去了一颗爱心，还剩 <b>{lives}</b> 次机会。
                </p>
                <button
                  onClick={handleContinueAfterStrike}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                  id="btn-chimp-continue"
                >
                  继续本次试航 ({numCount} 个数字)
                </button>
              </motion.div>
            )}

            {gameState === 'strike_out' && (
              <motion.div
                key="strike_out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm py-6"
                id="chimp-strikeout-view"
              >
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">测试落幕</h2>
                <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-3 block">击破的最大模块数</span>
                <div className="text-6xl font-black text-indigo-600 font-mono tracking-tight mb-4 text-center">
                  {numCount} <span className="text-lg font-normal text-slate-400">个</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                  <div className="font-semibold text-slate-700 text-sm mb-1">
                    人类 vs 黑猩猩
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed text-left">
                    一般成年人在面临 9 个数字时就开始出现困难，而受过训练的年轻黑猩猩能秒杀 15-18 个且准确率高达 80% 以上！勤加锻炼，你可以变得更快！
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                    id="btn-chimp-retry"
                  >
                    重新战斗
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl text-sm border border-slate-200 transition-colors"
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
