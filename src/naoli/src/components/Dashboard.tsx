import React from 'react';
import { GAMES_LIST, GameType, ScoreRecord } from '../types';
import {
  Zap,
  Grid,
  Layers,
  Hash,
  BookOpen,
  Target,
  FileText,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  RefreshCw,
  Clock
} from 'lucide-react';

const IconMap: Record<string, React.ComponentType<any>> = {
  Zap,
  Grid,
  Layers,
  Hash,
  BookOpen,
  Target,
  FileText
};

interface DashboardProps {
  scores: Record<GameType, ScoreRecord[]>;
  onSelectGame: (gameId: GameType) => void;
  onClearHistory: () => void;
}

export default function Dashboard({ scores, onSelectGame, onClearHistory }: DashboardProps) {
  // Find best score for each game
  const getBestScore = (gameId: GameType): ScoreRecord | null => {
    const trials = scores[gameId] || [];
    if (trials.length === 0) return null;

    if (gameId === GameType.REACTION_TIME || gameId === GameType.AIM_TRAINER) {
      // For reaction and aim trainer, lower ms score is better
      return [...trials].sort((a, b) => a.score - b.score)[0];
    } else {
      // For others, higher score is better
      return [...trials].sort((a, b) => b.score - a.score)[0];
    }
  };

  // Human benchmark averages
  const getAverageBenchmark = (gameId: GameType) => {
    switch (gameId) {
      case GameType.REACTION_TIME: return { value: 250, label: "250 ms" };
      case GameType.SEQUENCE_MEMORY: return { value: 8, label: "8 阶" };
      case GameType.CHIMPANZEE_TEST: return { value: 8, label: "8 个" };
      case GameType.NUMBER_MEMORY: return { value: 8, label: "8 位" };
      case GameType.VERBAL_MEMORY: return { value: 40, label: "40 分" };
      case GameType.AIM_TRAINER: return { value: 450, label: "450 ms" };
      case GameType.TYPING_TEST: return { value: 50, label: "50 WPM" };
      default: return { value: 1, label: "" };
    }
  };

  // Calculate efficiency percentage for a best score versus human averages
  const getEfficiency = (gameId: GameType, best: number): number => {
    const avg = getAverageBenchmark(gameId).value;
    let ratio = 100;

    if (gameId === GameType.REACTION_TIME || gameId === GameType.AIM_TRAINER) {
      // Lower is better. If reaction is 200ms and average is 250ms, efficiency = (250/200)*100 = 125%
      ratio = (avg / best) * 100;
    } else {
      // Higher is better. If sequence level is 10 and average is 8, efficiency = (10/8)*100 = 125%
      ratio = (best / avg) * 100;
    }
    // Cap efficiency ratio
    return Math.round(Math.min(200, Math.max(10, ratio)));
  };

  // Gather active statistics
  const activeGamesWithScores = GAMES_LIST.filter(g => getBestScore(g.id) !== null);
  const totalCompletedCount = Object.values(scores).reduce((sum, list) => sum + list.length, 0);

  // Overall index (Brain Power Quotient)
  const brainPowerQuotient = activeGamesWithScores.length > 0
    ? Math.round(
        activeGamesWithScores.reduce((sum, g) => {
          const best = getBestScore(g.id)!.score;
          return sum + getEfficiency(g.id, best);
        }, 0) / activeGamesWithScores.length
      )
    : 0;

  const getQuotientGrade = (q: number) => {
    if (q >= 130) return { title: "天仙超凡脑能", color: "text-purple-600 bg-purple-50border border-purple-100", desc: "哇！你有极度敏锐的工作内存空间和惊人的反应速度，远大于99%的人群。" };
    if (q >= 110) return { title: "智脑精锐级", color: "text-indigo-600 bg-indigo-50 border border-indigo-100", desc: "反应敏捷，记忆出众。你的短期和状态专注度极强，处于绝对优等生水准。" };
    if (q >= 90) return { title: "健全黄金脑能", color: "text-emerald-500 bg-emerald-50 border border-emerald-100", desc: "表现非常扎实，各项记忆和纯反应速度跟均等人类线持平，非常棒！" };
    return { title: "基础观察级", color: "text-amber-500 bg-amber-50 border border-amber-100", desc: "稍微有些偏慢。充足的睡眠、补水和反复针对性训练可以让该指数飙升30%以上。" };
  };

  const GameThemeMap: Record<GameType, {
    bgColor: string;
    shadowColor: string;
    badgeBg: string;
    badgeText: string;
    textColor: string;
    secTextColor: string;
    hoverColor: string;
    iconBg: string;
    iconText: string;
    borderAccent: string;
  }> = {
    [GameType.REACTION_TIME]: {
      bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700",
      shadowColor: "shadow-blue-500/10 hover:shadow-blue-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-blue-100",
      textColor: "text-white",
      secTextColor: "text-blue-100",
      hoverColor: "hover:from-blue-700 hover:to-indigo-800",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-blue-400/20"
    },
    [GameType.SEQUENCE_MEMORY]: {
      bgColor: "bg-gradient-to-br from-purple-600 to-fuchsia-700",
      shadowColor: "shadow-purple-500/10 hover:shadow-purple-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-purple-100",
      textColor: "text-white",
      secTextColor: "text-purple-100",
      hoverColor: "hover:from-purple-700 hover:to-fuchsia-800",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-purple-400/20"
    },
    [GameType.CHIMPANZEE_TEST]: {
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
      shadowColor: "shadow-amber-500/10 hover:shadow-amber-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-amber-100",
      textColor: "text-white",
      secTextColor: "text-amber-50",
      hoverColor: "hover:from-amber-600 hover:to-orange-700",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-amber-400/20"
    },
    [GameType.NUMBER_MEMORY]: {
      bgColor: "bg-gradient-to-br from-orange-500 to-rose-600",
      shadowColor: "shadow-orange-500/10 hover:shadow-orange-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-orange-100",
      textColor: "text-white",
      secTextColor: "text-orange-100",
      hoverColor: "hover:from-orange-600 hover:to-rose-700",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-orange-400/20"
    },
    [GameType.VERBAL_MEMORY]: {
      bgColor: "bg-gradient-to-br from-emerald-600 to-teal-700",
      shadowColor: "shadow-emerald-500/10 hover:shadow-emerald-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-emerald-100",
      textColor: "text-white",
      secTextColor: "text-emerald-100",
      hoverColor: "hover:from-emerald-700 hover:to-teal-800",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-emerald-400/20"
    },
    [GameType.AIM_TRAINER]: {
      bgColor: "bg-gradient-to-br from-rose-600 to-red-700",
      shadowColor: "shadow-rose-500/10 hover:shadow-rose-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-rose-100",
      textColor: "text-white",
      secTextColor: "text-rose-100",
      hoverColor: "hover:from-rose-700 hover:to-red-800",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-rose-400/20"
    },
    [GameType.TYPING_TEST]: {
      bgColor: "bg-gradient-to-br from-cyan-600 to-blue-700",
      shadowColor: "shadow-cyan-500/10 hover:shadow-cyan-500/20",
      badgeBg: "bg-white/10",
      badgeText: "text-cyan-100",
      textColor: "text-white",
      secTextColor: "text-cyan-100",
      hoverColor: "hover:from-cyan-700 hover:to-blue-800",
      iconBg: "bg-white/15",
      iconText: "text-white",
      borderAccent: "border-cyan-400/20"
    }
  };

  const getPercentileLabel = (gameId: GameType, scoreVal: number) => {
    if (gameId === GameType.REACTION_TIME) {
      if (scoreVal < 180) return "Top 3% (人类巅峰)";
      if (scoreVal < 220) return "Top 15% (优秀反应)";
      if (scoreVal < 260) return "Top 45% (平均水平)";
      return "需要更多练习";
    }
    if (gameId === GameType.SEQUENCE_MEMORY) {
      if (scoreVal > 12) return "Top 1% (记忆大师)";
      if (scoreVal > 8) return "Top 15% (超强工作内存)";
      if (scoreVal > 5) return "Top 50% (正常认知)";
      return "请继续训练";
    }
    if (gameId === GameType.CHIMPANZEE_TEST) {
      if (scoreVal > 11) return "Top 1% (空间感知神话)";
      if (scoreVal > 7) return "Top 20% (高能瞬间编码)";
      if (scoreVal > 4) return "Top 55% (中等注意力)";
      return "建议更加专注";
    }
    if (gameId === GameType.NUMBER_MEMORY) {
      if (scoreVal > 12) return "Top 1% (数字容载天才)";
      if (scoreVal > 8) return "Top 20% (高效率记忆)";
      if (scoreVal > 5) return "Top 60% (基础数字链)";
      return "短期锁链较浅";
    }
    if (gameId === GameType.VERBAL_MEMORY) {
      if (scoreVal > 55) return "Top 5% (高维认知归纳)";
      if (scoreVal > 30) return "Top 35% (常规词汇记忆)";
      if (scoreVal > 15) return "Top 70% (标准基础词汇)";
      return "识别出现疲倦";
    }
    if (gameId === GameType.AIM_TRAINER) {
      if (scoreVal < 280) return "Top 2% (神射反射定位)";
      if (scoreVal < 380) return "Top 15% (极速肌肉记忆)";
      if (scoreVal < 480) return "Top 55% (流畅点击能力)";
      return "建议多次校准";
    }
    if (gameId === GameType.TYPING_TEST) {
      if (scoreVal > 75) return "Top 3% (疾风盲打大师)";
      if (scoreVal > 50) return "Top 25% (熟练行云流水)";
      if (scoreVal > 35) return "Top 60% (标准办公录入)";
      return "指位配合在提升";
    }
    return "已存储成绩";
  };

  const activeDailyStreak = totalCompletedCount > 0 ? Math.min(15, activeGamesWithScores.length * 2 + 1) : 0;

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area (8/12 grid span) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Banner with Circular Highlights & Custom layout */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-blue-500/10 text-white min-h-[260px] border border-blue-500/10">
            {/* Ambient Graphic circles in white opacity */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-white opacity-10 rounded-full pointer-events-none"></div>
            <div className="absolute right-16 bottom-16 w-16 h-16 border-4 border-white opacity-15 rounded-full pointer-events-none"></div>
            <div className="absolute left-1/3 top-8 w-8 h-8 bg-white opacity-5 rounded-full pointer-events-none"></div>

            {/* Brain Score Circular Gauge on Banner */}
            {brainPowerQuotient > 0 ? (
              <div className="relative z-10 flex flex-col items-center shrink-0">
                <div className="relative w-36 h-36 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                  <svg className="absolute w-full h-full transform -rotate-90 p-2">
                    <circle
                      cx="72"
                      cy="72"
                      r="58"
                      className="stroke-white/10"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="58"
                      className="stroke-white transition-all duration-1000"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={Math.max(0, 364.4 - (364.4 * Math.min(100, (brainPowerQuotient / 150) * 100)) / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black font-mono tracking-tight text-white">{brainPowerQuotient}</span>
                    <span className="text-[10px] text-blue-100 font-bold uppercase tracking-widest mt-0.5">智商基准商</span>
                  </div>
                </div>
                <div className="mt-2.5 px-3 py-1 bg-white/20 rounded-full text-[11px] font-bold tracking-wider text-blue-50 flex items-center gap-1.5 border border-white/10 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> PR 92.5%
                </div>
              </div>
            ) : (
              <div className="relative z-10 shrink-0 w-36 h-36 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-4 shadow-lg border border-white/10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2.5">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">未解锁脑力商</span>
                <span className="text-[9px] text-blue-100/80 mt-1 lines-clamp-2">完成测试评估认知状态</span>
              </div>
            )}

            {/* Intro text */}
            <div className="relative z-10 flex-1 space-y-3 text-center md:text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-blue-100 uppercase bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/20 inline-block">
                  人类多维认知力学量化平台
                </span>
                <h1 className="text-2xl md:text-3.5xl font-black tracking-tight text-white mt-1.5">
                  脑压力学基准测试
                </h1>
              </div>
              
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-xl">
                欢迎来到神经认知机制评测点。此面板针对人类的短期工作记忆容量、手指微操作肌肉速率以及位置判断编码，提供7款科学实验挑战。
              </p>

              {brainPowerQuotient > 0 ? (
                <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-left">
                  <div className="font-bold text-xs flex items-center gap-1.5 text-white">
                    <Award className="w-4 h-4 text-amber-300" /> 解锁尊勋评级：{getQuotientGrade(brainPowerQuotient).title}
                  </div>
                  <p className="text-[11px] text-blue-100 mt-1 leading-relaxed">
                    表现非常优异！您的短期认知和大脑操作记忆流展现出极高专注度，属于出众状态。
                  </p>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] text-blue-50/80 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>您当前尚未检测任何科目。请在下方选择任意脑能分类，完成首轮解锁。</span>
                </div>
              )}
            </div>
          </div>

          {/* Test Panel Heading */}
          <div>
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-800 flex items-center gap-2">
                <Grid className="w-5 h-5 text-blue-600" />
                <span>测试实验室面板 (7 个科目)</span>
              </h2>
              {totalCompletedCount > 0 && (
                <button
                  onClick={onClearHistory}
                  className="text-xs text-rose-600 hover:text-white font-semibold flex items-center gap-1.5 bg-rose-50 hover:bg-rose-600 border border-rose-100 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> 
                  <span>重置所有历史</span>
                </button>
              )}
            </div>

            {/* Elegant Colorful Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="game-cards-grid">
              {GAMES_LIST.map((game) => {
                const IconComponent = IconMap[game.icon] || Zap;
                const best = getBestScore(game.id);
                const benchmark = getAverageBenchmark(game.id);
                const testCount = scores[game.id]?.length || 0;
                const t = GameThemeMap[game.id];

                return (
                  <div
                    key={game.id}
                    onClick={() => onSelectGame(game.id)}
                    className={`${t.bgColor} ${t.shadowColor} border ${t.borderAccent} rounded-2.5xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-xl group cursor-pointer flex flex-col justify-between min-h-[228px] relative overflow-hidden`}
                    id={`game-card-${game.id}`}
                  >
                    {/* Glossy light effect overlay */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors pointer-events-none" />

                    <div className="space-y-3.5 relative">
                      {/* Top Header Row of Tile */}
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 ${t.iconBg} rounded-xl ${t.iconText} shadow-inner`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {best ? (
                          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 ${t.badgeBg} ${t.badgeText} rounded-full border border-white/10`}>
                            完成 {testCount} 次
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/15 text-white/70 rounded-full">
                            待挑战
                          </span>
                        )}
                      </div>

                      {/* Labels and name */}
                      <div className="space-y-0.5 text-white">
                        <h3 className="font-extrabold text-lg text-white group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          {game.name}
                        </h3>
                        <div className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                          {game.englishName}
                        </div>
                      </div>

                      {/* Description wordings */}
                      <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-light">
                        {game.description}
                      </p>
                    </div>

                    {/* Bottom stats summary */}
                    <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono relative text-white/90">
                      <div>
                        {best ? (
                          <div className="space-y-0.5">
                            <div className="text-[9px] uppercase font-bold text-white/60">最佳战绩</div>
                            <div className="font-black text-base text-white">
                              {best.score} <span className="text-[11px] font-normal text-white/70">{game.unit}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-white/60 flex items-center gap-1 text-[11px] font-medium leading-none">
                            <Clock className="w-3.5 h-3.5 text-white/80" /> 未测试
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-[9px] uppercase font-bold text-white/60">世界平均标准</div>
                        <div className="font-extrabold text-white text-sm">{benchmark.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Space (4/12 grid span) with Personal Bests & Streaks */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card structure matching right side */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-100 flex flex-col gap-6">
            
            {/* Heading section */}
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>个人脑图档案</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                记录您每项认知参数在世界平均线中的百分比分箱。
              </p>
            </div>

            {/* List entries */}
            <div className="space-y-3">
              {GAMES_LIST.map((game) => {
                const best = getBestScore(game.id);
                const IconComponent = IconMap[game.icon] || Zap;

                return (
                  <div 
                    key={game.id}
                    onClick={() => onSelectGame(game.id)}
                    className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-2xl flex items-center justify-between border border-slate-100 hover:border-blue-200/50 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">{game.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {best ? getPercentileLabel(game.id, best.score) : "尚未开展激活测试"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      {best ? (
                        <div className="text-xs font-black text-indigo-700">
                          {best.score} <span className="text-[10px] font-normal text-slate-400">{game.unit}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          待解锁
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Daily Streak Indicator inside the box footer */}
            <div className="p-4 bg-slate-900 rounded-2.5xl text-white shadow-lg shadow-slate-950/20 relative overflow-hidden">
              {/* Graphic background */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">连续脑健打卡</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-black italic text-blue-400">{activeDailyStreak} 天</span>
                    {activeDailyStreak > 0 && <span className="text-[10px] text-green-400">正在保持冲刺！</span>}
                  </div>
                </div>

                {/* Staggered progress lines */}
                <div className="flex gap-1 items-end h-6 pb-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                    const isPassed = activeDailyStreak >= num;
                    return (
                      <div 
                        key={num}
                        className={`w-1.5 h-4 rounded-full transition-all duration-300 ${
                          isPassed ? "bg-blue-400 h-6" : "bg-slate-700"
                        }`}
                        title={`Day ${num}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Quick cognitive tip */}
          <div className="bg-slate-50 rounded-2.5xl p-5 border border-slate-100 text-xs text-slate-500 leading-relaxed shadow-inner">
            <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>测试提效指南：</span>
            </div>
            实验证明：保持7.5至8小时的高质量深度睡眠有利于在神经反应时间中提高约等25ms的速度极限；使用咖啡因能轻微在定位和盲打测试中得到收益，但是在短时图像数列保持力中会有反面抗击。
          </div>

        </div>

      </div>
    </div>
  );
}
