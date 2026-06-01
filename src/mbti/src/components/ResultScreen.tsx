/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RefreshCw, 
  Share2, 
  FileText, 
  Check, 
  Briefcase, 
  Heart, 
  BookOpen, 
  Users, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { Answers, ScoreType } from '../types';
import { PERSONALITY_MAP } from '../data/mbtiData';

interface ResultScreenProps {
  type: string;
  scores: ScoreType;
  onRestart: () => void;
}

export default function ResultScreen({ type, scores, onRestart }: ResultScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'career' | 'relationship' | 'famous'>('overview');
  const [copied, setCopied] = useState(false);

  const safeType = (type || '').trim().toUpperCase() || 'INTJ';
  const info = PERSONALITY_MAP[safeType] || PERSONALITY_MAP['INTJ']; // Fallback index

  // Get temperament group name safely
  const getTemperamentGroup = (mbtiType: string) => {
    const code = (mbtiType || 'INTJ').toUpperCase();
    const second = code[1] || 'N';
    const third = code[2] || 'T';
    if (second === 'N') {
      return third === 'T' ? { name: '分析家 (Analysts)', desc: '理性、求真、崇尚秩序与宏大智力模型' } : { name: '外交家 (Diplomats)', desc: '温情、同理、致力于发掘人类美好理想' };
    } else {
      return third === 'J' ? { name: '守护者 (Sentinels)', desc: '敬职、务实、社会各行各业的勤恳脊梁' } : { name: '探险家 (Explorers)', desc: '随性、敏锐、用行动和感官定义当下的艺术家' };
    }
  };

  const group = getTemperamentGroup(safeType);

  // Generate share summary text safely
  const handleCopyShare = () => {
    const text = `🎉 【MBTI 16型人格专业测评报告】
我测出了我的MBTI人格类型是：✨ ${info.type} —— ${info.name} ✨
🧭 身份：${info.nickname}
🌟 特征标签：${info.strengths.slice(0, 3).join(' | ')}
💼 理想职业：${info.careers.slice(0, 3).join('、')}
🧠 匹配人际气场：${info.relationships.matchingTypes.join(' & ')}
快来看看你属于哪种精神图谱吧！
    `;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.left = "-99999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  // Dimensions labels for the custom Bidirectional slider
  const dimensionMetadata = [
    {
      id: 'EI',
      leftChar: 'E', leftName: '外向 Extraversion',
      rightChar: 'I', rightName: '内向 Introversion',
      desc: '获取能量的途径：客户世界或自我思考'
    },
    {
      id: 'SN',
      leftChar: 'S', leftName: '实感 Sensing',
      rightChar: 'N', rightName: '直觉 Intuition',
      desc: '处理信息的倾向：事实细节或抽象可能性'
    },
    {
      id: 'TF',
      leftChar: 'T', leftName: '理性 Thinking',
      rightChar: 'F', rightName: '感性 Feeling',
      desc: '决策判定的习惯：因果逻辑或主观同理'
    },
    {
      id: 'JP',
      leftChar: 'J', leftName: '条理 Judging',
      rightChar: 'P', rightName: '随性 Perceiving',
      desc: '生活安排的偏好：日程规则或弹性自流'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-12">
      {/* Dynamic Temperature Gradient Outer Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`rounded-[36px] p-8 md:p-12 text-white bg-gradient-to-br ${info.color} shadow-lg mb-8 relative overflow-hidden`}
      >
        {/* Subtle geometric circles matching typography colors */}
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-12 h-48 w-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
              <span>{group.name}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-2.5 flex items-baseline gap-3">
              <span>{info.type}</span>
              <span className="text-2xl md:text-3xl font-normal font-sans opacity-95">({info.name})</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif italic font-medium opacity-95 max-w-xl leading-snug mb-4">
              『 {info.nickname} 』
            </p>
            <p className="text-xs md:text-sm opacity-85 max-w-xl tracking-wide leading-relaxed font-serif">
              {group.desc}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center h-28 w-28 rounded-[28px] bg-white/15 backdrop-blur-md border border-white/10 text-5xl shrink-0 shadow-sm">
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              {info.badgeEmoji}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Grid: Stats Bars on Left, Core Tabs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        
        {/* Left Side: Bidirectional Dimension Slider Cards (4 columns on huge screens) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white/95 dark:bg-[#25211d] border border-natural-border/70 dark:border-neutral-800 p-6 rounded-[28px] shadow-sm animate-fade-in">
            <h2 className="text-lg font-serif font-bold text-natural-charcoal dark:text-white mb-1 flex items-center gap-2">
              <TrendingUp size={18} className="text-natural-green" />
              <span>本能维度倾向解析</span>
            </h2>
            <p className="text-xs text-natural-gray dark:text-neutral-500 mb-6 font-sans">
              比例分布揭示了你在不同状态下的下意识偏好
            </p>

            <div className="space-y-6">
              {dimensionMetadata.map((dim) => {
                const percentage = (scores && scores[dim.id as keyof ScoreType]) 
                  ? scores[dim.id as keyof ScoreType].percentage 
                  : 50;
                // left is E/S/T/J, right is I/N/F/P
                const isLeftDominant = percentage >= 50;
                
                return (
                  <div key={dim.id} className="group">
                    {/* Header values */}
                    <div className="flex justify-between items-center text-xs font-mono mb-2 px-0.5">
                      <span className={`font-semibold ${isLeftDominant ? 'text-natural-green font-bold text-sm' : 'text-natural-gray'}`}>
                        {dim.leftChar} ({percentage}%)
                      </span>
                      <span className={`font-semibold ${!isLeftDominant ? 'text-natural-green font-bold text-sm' : 'text-natural-gray'}`}>
                        {dim.rightChar} ({100 - percentage}%)
                      </span>
                    </div>

                    {/* slider track bar */}
                    <div className="h-2 w-full bg-natural-sand dark:bg-[#2e2a25] rounded-full relative flex items-center">
                      {/* Midline reference checker marker */}
                      <div className="absolute left-1/2 h-3.5 w-0.5 bg-natural-border dark:bg-neutral-800 -translate-x-1/2 z-10" />

                      {/* Sliding fill background */}
                      <div 
                        style={{ 
                          left: isLeftDominant ? `${100 - percentage}%` : '50%',
                          right: isLeftDominant ? '50%' : `${percentage}%`
                        }}
                        className={`absolute h-full rounded-full transition-all duration-500 bg-natural-green`}
                      />

                      {/* Sliding Handle (Thumb indicator) */}
                      <motion.div
                        style={{ left: `${percentage}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute h-4 w-4 bg-white dark:bg-zinc-950 border-2 border-natural-charcoal dark:border-natural-sand rounded-full shadow z-20 -translate-x-1/2 cursor-default"
                      />
                    </div>

                    {/* Labels definitions */}
                    <div className="flex justify-between items-center text-[10px] md:text-xs text-natural-gray dark:text-neutral-500 mt-1.5 max-w-full font-serif">
                      <span className={isLeftDominant ? 'font-semibold text-natural-charcoal dark:text-natural-sand' : ''}>
                        {dim.leftName.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-natural-border dark:text-neutral-800 hidden md:inline">|</span>
                      <span className={!isLeftDominant ? 'font-semibold text-natural-charcoal dark:text-natural-sand' : ''}>
                        {dim.rightName.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt warning card */}
          <div className="bg-natural-sand/15 dark:bg-[#1c1a17]/50 p-5 rounded-2xl border border-natural-border/60 dark:border-neutral-900/60 flex items-start gap-4 shadow-sm">
            <Lightbulb size={20} className="text-natural-green mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-serif font-semibold text-natural-charcoal dark:text-natural-sand mb-1">倾向性启示</h4>
              <p className="text-xs text-natural-charcoal/80 dark:text-natural-gray leading-relaxed">
                维度在 40% ~ 60% 之间通常代表你具备极高的人格韧性，能够顺应不同的环境需求，在相应机制下自由伸缩。
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Tab Controllers with framer bento */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Tab Controller row */}
          <div className="flex bg-[#ece7e0]/60 dark:bg-[#201d1a]/80 p-1.5 rounded-2xl w-full border border-natural-border/75 dark:border-neutral-850 shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-[#2c2723] text-natural-charcoal dark:text-white shadow-sm'
                  : 'text-natural-gray hover:text-natural-charcoal dark:text-neutral-500 dark:hover:text-natural-sand'
              }`}
            >
              <BookOpen size={16} />
              <span>精神特质</span>
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'career'
                  ? 'bg-white dark:bg-[#2c2723] text-natural-charcoal dark:text-white shadow-sm'
                  : 'text-natural-gray hover:text-natural-charcoal dark:text-neutral-500 dark:hover:text-natural-sand'
              }`}
            >
              <Briefcase size={16} />
              <span>理想心流</span>
            </button>
            <button
              onClick={() => setActiveTab('relationship')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'relationship'
                  ? 'bg-white dark:bg-[#2c2723] text-natural-charcoal dark:text-white shadow-sm'
                  : 'text-natural-gray hover:text-natural-charcoal dark:text-neutral-500 dark:hover:text-natural-sand'
              }`}
            >
              <Heart size={16} />
              <span>人际气场</span>
            </button>
            <button
              onClick={() => setActiveTab('famous')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'famous'
                  ? 'bg-white dark:bg-[#2c2723] text-natural-charcoal dark:text-white shadow-sm'
                  : 'text-natural-gray hover:text-natural-charcoal dark:text-neutral-500 dark:hover:text-natural-sand'
              }`}
            >
              <Users size={16} />
              <span>同频殿堂</span>
            </button>
          </div>

          {/* Active Panel visual details */}
          <div className="bg-white/95 dark:bg-[#25211d] border border-natural-border/70 dark:border-neutral-800 p-6 md:p-8 rounded-[28px] shadow-sm min-h-[350px]">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-base font-serif font-bold text-natural-charcoal dark:text-white mb-3 pb-2.5 border-b border-natural-border/50 dark:border-neutral-800">
                    性格内核谱系
                  </h3>
                  <p className="text-sm text-natural-charcoal/90 dark:text-natural-gray leading-relaxed font-serif text-justify italic">
                    {info.summary}
                  </p>
                </div>

                {/* Strengths & Weaknesses row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Strengths */}
                  <div className="bg-natural-green/10 dark:bg-natural-green/15 p-5 rounded-2xl border border-natural-green-light/25 dark:border-emerald-950/10">
                    <h4 className="text-sm font-serif font-bold text-natural-green dark:text-natural-green-light mb-3 flex items-center gap-1.5">
                      <Check size={16} />
                      <span>天赐天赋优势 (Strengths)</span>
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-natural-charcoal/85 dark:text-neutral-300">
                      {info.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-natural-green font-bold text-xs">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-natural-sand/25 dark:bg-[#34302b]/15 p-5 rounded-2xl border border-natural-border dark:border-neutral-900/10">
                    <h4 className="text-sm font-serif font-bold text-[#817a70] dark:text-natural-gray mb-3 flex items-center gap-1.5">
                      <AlertTriangle size={15} />
                      <span>认知盲点盲区 (Weaknesses)</span>
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-natural-charcoal/85 dark:text-neutral-300">
                      {info.weaknesses.map((weak, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-natural-gray font-bold text-xs">•</span>
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'career' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-base font-serif font-bold text-natural-charcoal dark:text-white mb-3 pb-2.5 border-b border-natural-border/50 dark:border-neutral-800">
                    天赋心流职业锚点
                  </h3>
                  <p className="text-sm text-natural-charcoal/80 dark:text-natural-gray leading-relaxed mb-6 font-serif">
                    你在处理信息、判断决策或调整秩序时所表现出的本能惯性，能在特定领域中形成无可比拟的职业先发之势。以下是激发你高频心流表现的星级职业航向：
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {info.careers.map((career, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 bg-natural-light-sand dark:bg-[#1f1b18] p-4 rounded-xl border border-natural-border/50 dark:border-[#38332d]">
                        <div className="h-9 w-9 bg-[#dbe1d8] dark:bg-[#34302b] flex items-center justify-center text-natural-charcoal dark:text-natural-sand rounded-xl shrink-0 text-xs font-serif font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-xs md:text-sm font-serif font-medium text-natural-charcoal dark:text-natural-sand">
                          {career}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-natural-green/10 dark:bg-[#20271c] border border-natural-green-light/25 dark:border-emerald-900/10 rounded-xl">
                  <h4 className="text-xs font-serif font-bold text-natural-green dark:text-natural-green-light mb-1">最佳职业生境：</h4>
                  <p className="text-xs text-natural-charcoal/80 dark:text-natural-gray leading-relaxed">
                    崇尚科学与自我探索，尊重个人在进程安排上的完全独立思考性，对层级繁缛的刻板规则极度包容或能有效绕过的工作环境。
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'relationship' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-base font-serif font-bold text-natural-charcoal dark:text-white mb-3 pb-2.5 border-b border-natural-border/50 dark:border-neutral-800">
                    同频灵魂伴侣及交往精髓
                  </h3>
                  
                  {/* Matching types bubble list */}
                  <div className="mb-6">
                    <h4 className="text-xs font-serif font-semibold text-natural-gray mb-2.5 uppercase tracking-wider">配对人际气场：</h4>
                    <div className="flex gap-2.5 flex-wrap">
                      {info.relationships.matchingTypes.map((mt) => {
                        const mtDetails = PERSONALITY_MAP[mt];
                        return (
                          <div 
                            key={mt} 
                            className="inline-flex items-center gap-1.5 bg-natural-green/15 border border-natural-green-light/35 text-natural-charcoal px-3.5 py-1.5 rounded-xl dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-natural-green-light"
                          >
                            <span className="text-xs font-mono font-bold tracking-wider">{mt}</span>
                            <span className="text-xs font-serif">({mtDetails?.name || '相知'})</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-serif font-semibold text-natural-gray mb-3 uppercase tracking-wider">相处默契方略 (Tips)：</h4>
                  <div className="space-y-3.5">
                    {info.relationships.tips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="h-5.5 w-5.5 bg-[#dbe1d8] dark:bg-[#34302b] text-natural-charcoal dark:text-natural-sand flex items-center justify-center text-xs rounded-full shrink-0 font-serif font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-xs md:text-sm text-natural-charcoal/80 dark:text-natural-gray leading-relaxed font-serif italic text-justify">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'famous' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-base font-serif font-bold text-natural-charcoal dark:text-white mb-3 pb-2.5 border-b border-natural-border/50 dark:border-neutral-800">
                  同频名人精神殿堂
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {info.famousPeople.map((person, idx) => (
                    <div 
                      key={idx} 
                      className="bg-natural-light-sand dark:bg-[#1f1b18] p-5 rounded-2xl border border-natural-border/45 dark:border-[#38332d] flex flex-col items-center text-center shadow-sm"
                    >
                      <div className="h-14 w-14 rounded-full bg-[#dbe1d8] dark:bg-[#34302b] flex items-center justify-center text-3xl mb-3 shadow-sm border border-natural-border/60">
                        {person.avatar}
                      </div>
                      <h4 className="text-sm font-serif font-bold text-natural-charcoal dark:text-white mb-2">
                        {person.name}
                      </h4>
                      <p className="text-xs text-natural-gray dark:text-neutral-500 leading-relaxed font-serif text-center">
                        {person.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Controllers: Restart & Sharing */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-natural-border/60 dark:border-neutral-800 pt-8 mt-4">
        {/* Restart Button */}
        <button
          onClick={onRestart}
          id="btn-restart"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-natural-border hover:border-natural-gray bg-white hover:bg-natural-sand/20 dark:bg-zinc-900 dark:border-neutral-800 dark:hover:bg-zinc-800 text-natural-charcoal dark:text-natural-sand font-serif font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all active:scale-98 text-sm cursor-pointer"
        >
          <RefreshCw size={15} />
          <span>重返探索之旅</span>
        </button>

        {/* Share Button (Action) */}
        <button
          onClick={handleCopyShare}
          id="btn-share"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-natural-charcoal hover:bg-natural-charcoal-hover text-natural-bg dark:bg-[#ece7e0] dark:hover:bg-[#fbf9f6] dark:text-natural-charcoal font-serif font-bold px-8 py-3.5 rounded-full shadow-md active:scale-98 text-sm cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={15} className="animate-pulse" />
              <span>气场摘要已拓至剪贴板</span>
            </>
          ) : (
            <>
              <Share2 size={15} />
              <span>拓下精神档案去分享</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
