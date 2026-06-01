import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, RotateCcw, ChevronLeft, Heart, Award } from 'lucide-react';

interface VerbalMemoryProps {
  onSaveScore: (score: number, details?: string) => void;
  onBack: () => void;
  bestScore?: number;
}

type GameState = 'idle' | 'playing' | 'failed';

// A dictionary of 150 diverse, evocative words for memory test
const WORD_DICT = [
  '天空', '苹果', '火箭', '吉他', '冰淇淋', '书籍', '电脑', '自行车', '咖啡', '向日葵',
  '时间', '梦想', '河流', '森林', '火焰', '风筝', '海洋', '琥珀', '落叶', '雨伞',
  '齿轮', '钥匙', '城堡', '极光', '微风', '珊瑚', '指针', '泡沫', '星辰', '白云',
  '飞鸟', '月光', '清晨', '暮色', '指甲', '大树', '野草', '石头', '沙滩', '雪人',
  '眼镜', '面包', '牛奶', '齿轮', '地图', '钟表', '蜡烛', '风铃', '窗户', '铅笔',
  '书包', '硬币', '信件', '灯泡', '相机', '风扇', '镜子', '枕头', '毛毯', '地毯',
  '皮鞋', '外套', '围巾', '帽子', '手套', '雨靴', '手帕', '项链', '戒指', '耳环',
  '草莓', '西瓜', '香蕉', '葡萄', '柠檬', '樱桃', '桃子', '菠萝', '椰子', '芒果',
  '玫瑰', '百合', '郁金香', '蒲公英', '康乃馨', '菊花', '茉莉', '桂花', '荷花', '梅花',
  '猫咪', '小狗', '兔子', '小熊', '松鼠', '狐狸', '梅花鹿', '海豚', '企鹅', '考拉',
  '蝴蝶', '蜻蜓', '蜜蜂', '金鱼', '海星', '贝壳', '水母', '章鱼', '海马', '鹦鹉',
  '长城', '铁塔', '故宫', '金字塔', '火山', '瀑布', '峡谷', '沙漠', '草原', '冰川',
  '红色', '蓝色', '黄色', '绿色', '橙色', '紫色', '粉色', '白色', '黑色', '金色',
  '圆形', '方形', '三角形', '星形', '心形', '钻石', '椭圆', '梯形', '六角形', '扇形',
  '快乐', '温暖', '静谧', '明亮', '温柔', '轻盈', '芬芳', '闪耀', '澄澈', '澎湃'
];

export default function VerbalMemory({ onSaveScore, onBack, bestScore }: VerbalMemoryProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const [currentWord, setCurrentWord] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startNewTest = () => {
    setScore(0);
    setLives(3);
    const newSeen = new Set<string>();
    setSeenWords(newSeen);
    setFeedback(null);
    setGameState('playing');

    // Pick first word
    const randWord = WORD_DICT[Math.floor(Math.random() * WORD_DICT.length)];
    setCurrentWord(randWord);
  };

  const nextWord = (currentSeen: Set<string>) => {
    // 50% probability to show a seen word (if we indeed have seen words)
    let pickSeen = Math.random() < 0.5 && currentSeen.size > 0;
    let nextWordStr = '';

    if (pickSeen) {
      const seenArray = Array.from(currentSeen);
      nextWordStr = seenArray[Math.floor(Math.random() * seenArray.length)];
    } else {
      // Find a word that hasn't been shown in the current round, or fallback to random
      const unseenList = WORD_DICT.filter(w => !currentSeen.has(w));
      if (unseenList.length > 0) {
        nextWordStr = unseenList[Math.floor(Math.random() * unseenList.length)];
      } else {
        nextWordStr = WORD_DICT[Math.floor(Math.random() * WORD_DICT.length)];
      }
    }
    setCurrentWord(nextWordStr);
  };

  const handleDecision = (wasSeenClaimed: boolean) => {
    const wordAlreadySeen = seenWords.has(currentWord);
    const isCorrect = (wasSeenClaimed && wordAlreadySeen) || (!wasSeenClaimed && !wordAlreadySeen);

    // Track active feedback flash
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    let updatedSet = new Set<string>(seenWords);
    if (!wordAlreadySeen) {
      updatedSet.add(currentWord);
      setSeenWords(updatedSet);
    }

    setTimeout(() => {
      setFeedback(null);
      if (isCorrect) {
        setScore(prev => prev + 1);
        nextWord(updatedSet);
      } else {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          setGameState('failed');
          onSaveScore(score, `认对了 ${score} 个词汇认知容量节点`);
        } else {
          nextWord(updatedSet);
        }
      }
    }, 250);
  };

  const getPercentile = (finalScore: number) => {
    if (finalScore > 80) return "神级记忆容量（前 1%）！";
    if (finalScore > 50) return "优秀水平（前 10%）！";
    if (finalScore > 30) return "前 30% 平均偏上水准！";
    if (finalScore > 15) return "常人中游水平（约在前 50%）。";
    return "记忆轨迹有些断层。可以多测试几遍唤醒神经活跃。";
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="verbal-memory-container">
      {/* Back Header */}
      <div className="flex items-center justify-between mb-6">
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
                className={`w-5 h-5 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-200'}`}
              />
            ))}
          </div>
          <div className="text-right text-xs font-mono text-slate-500">
            最佳成绩: {bestScore ? `${bestScore} 分` : '无记录'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
        {/* Header Indicator */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-800">词汇认知容量测试 (Verbal Memory)</span>
          </div>
          <div className="font-mono text-sm text-slate-500 font-semibold">
            {gameState !== 'idle' ? `当前得分: ${score} 分` : '准备'}
          </div>
        </div>

        {/* Content Panel Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-md py-6"
                id="verbal-idle"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">词汇认知容量测试</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  测试你脑中的中短期词汇追踪量。屏幕将逐一向你展示不同的词汇，判断它是此轮测试中<b>见过的词 (SEEN)</b>还是刚出现的<b>新词 (NEW)</b>。你有 3 次犯错机会。
                </p>
                <button
                  onClick={startNewTest}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                  id="btn-start-verbal"
                >
                  探索认知边界
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md text-center flex flex-col items-center"
                id="verbal-playing"
              >
                {/* Score indicators */}
                <div className="flex justify-between w-full mb-10 text-xs font-mono text-slate-400 font-semibold px-2">
                  <span>已展示极低重复词库: {seenWords.size} 词</span>
                  <span>当前分: {score}</span>
                </div>

                {/* Word Display Canvas */}
                <div
                  className={`w-full min-h-[140px] flex items-center justify-center rounded-2xl border-2 transition-all p-4 mb-10 ${
                    feedback === 'correct'
                      ? 'bg-emerald-50/80 border-emerald-300 scale-102'
                      : feedback === 'incorrect'
                      ? 'bg-rose-50/80 border-rose-300 scale-98'
                      : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <motion.div
                    key={currentWord}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-wide select-none"
                    id="verbal-active-word"
                  >
                    {currentWord}
                  </motion.div>
                </div>

                {/* Game Action Buttons */}
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => handleDecision(true)}
                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-colors hover:scale-101 active:scale-98"
                    id="btn-verbal-seen"
                  >
                    见过了 (SEEN)
                  </button>
                  <button
                    onClick={() => handleDecision(false)}
                    className="flex-1 py-4 bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold rounded-xl shadow-xs transition-all hover:scale-101 active:scale-98"
                    id="btn-verbal-new"
                  >
                    新词 (NEW)
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'failed' && (
              <motion.div
                key="failed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm py-4"
                id="verbal-failed"
              >
                <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">测试告捷</h2>
                <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-3 block">最终得到的分数</span>
                <div className="text-6xl font-black text-rose-500 font-mono tracking-tight mb-4 text-center">
                  {score} <span className="text-lg font-normal text-slate-400">分</span>
                </div>

                <div className="bg-slate-50 text-xs border border-slate-100 rounded-xl p-4 mb-6 leading-relaxed text-slate-500 text-left">
                  <span className="font-semibold text-slate-800 block mb-1">对比统计:</span>
                  {getPercentile(score)} 平均在 40 词左右会大幅增加反应出错率。
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={startNewTest}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                    id="btn-verbal-retry"
                  >
                    再战一次
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 bg-slate-101 hover:bg-slate-200 text-slate-600 font-medium rounded-xl text-sm border border-slate-200 transition-colors"
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
