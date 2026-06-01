/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Brain, Compass, Users, Heart } from 'lucide-react';
import { MBTI_QUESTIONS } from '../data/mbtiData';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const totalQuestions = MBTI_QUESTIONS.length;
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-natural-sand/70 border border-natural-border/70 text-natural-charcoal px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 dark:bg-zinc-800/80 dark:border-zinc-700 dark:text-zinc-300"
      >
        <Sparkles size={13} className="text-natural-green animate-pulse" />
        <span>基于荣格心理分析学派思想</span>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center max-w-2xl mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-natural-charcoal dark:text-white mb-5 leading-snug">
          MBTI <span className="text-natural-green">16型人格</span> 深度探索测试
        </h1>
        <p className="text-base md:text-lg text-natural-charcoal/80 dark:text-natural-gray font-serif italic leading-relaxed">
          探索那些深藏于潜意识中的行为模式，透视你与现实世界、自我以及他人的内在连接关系。
          <span className="block mt-2 text-sm text-natural-green font-sans font-medium not-italic">
            • 全套共 {totalQuestions} 道精选探索题 • 预计耗时 5 分钟 •
          </span>
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12"
      >
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#25211d] border border-natural-border/60 dark:border-zinc-800 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-shadow">
          <div className="h-10 w-10 rounded-xl bg-natural-green/15 dark:bg-natural-green/20 flex items-center justify-center text-natural-green mb-4">
            <Brain size={20} />
          </div>
          <h3 className="text-base font-serif font-semibold text-natural-charcoal dark:text-white mb-2">多维度精神探测</h3>
          <p className="text-sm text-natural-charcoal/70 dark:text-natural-gray leading-relaxed">
            全盘审视能量源泉(EI)、感知事物(SN)、决策方式(TF)及生活规律(JP)。
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#25211d] border border-natural-border/60 dark:border-zinc-800 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-shadow">
          <div className="h-10 w-10 rounded-xl bg-[#dbe1d8] dark:bg-emerald-950/40 flex items-center justify-center text-natural-green mb-4">
            <Compass size={20} />
          </div>
          <h3 className="text-base font-serif font-semibold text-natural-charcoal dark:text-white mb-2">职业航向指南</h3>
          <p className="text-sm text-natural-charcoal/70 dark:text-natural-gray leading-relaxed">
            探索你最自然契合的行为心流状态，匹配适合你发展的职场生态位。
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#25211d] border border-natural-border/60 dark:border-zinc-800 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-shadow">
          <div className="h-10 w-10 rounded-xl bg-natural-sand dark:bg-[#34302b] flex items-center justify-center text-natural-charcoal/80 dark:text-natural-sand mb-4">
            <Users size={20} />
          </div>
          <h3 className="text-base font-serif font-semibold text-natural-charcoal dark:text-white mb-2">人际气场共鸣</h3>
          <p className="text-sm text-natural-charcoal/70 dark:text-natural-gray leading-relaxed">
            透视隐藏于沟通惯性下最核心的爱意表达和包容机制。
          </p>
        </div>
      </motion.div>

      {/* Advice Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl w-full bg-white/40 dark:bg-[#25211d]/50 border border-natural-border dark:border-zinc-800 p-6 rounded-2xl mb-12"
      >
        <h4 className="text-sm font-semibold text-natural-charcoal dark:text-white flex items-center gap-2 mb-3.5">
          <Heart size={16} className="text-natural-green" />
          <span>测评舒适指南：</span>
        </h4>
        <ul className="space-y-2.5 text-xs md:text-sm text-natural-charcoal/80 dark:text-natural-gray">
          <li className="flex items-start gap-1.5">
            <span className="text-natural-green font-bold">•</span>
            <span><strong>无拘无束：</strong> 请倾听你最初的潜意识直觉，挑选符合你最真实本能的观点，而不是期望社会认可的正确答案。</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-natural-green font-bold">•</span>
            <span><strong>莫过深思：</strong> 若选项产生疑虑纠结，第一灵感即是你在舒适状态下的第一表达选择。</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-natural-green font-bold">•</span>
            <span><strong>安静独处：</strong> 全套测验共 {totalQuestions} 题。请在沏上一杯暖茶或伴有微风的和煦时刻，静心体验这场有趣的交心。</span>
          </li>
        </ul>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button
          onClick={onStart}
          id="btn-start-test"
          className="group relative inline-flex items-center justify-center gap-3 bg-natural-charcoal hover:bg-natural-charcoal-hover text-natural-bg dark:bg-[#ece7e0] dark:hover:bg-[#fbf9f6] dark:text-natural-charcoal font-semibold text-lg px-12 py-4 rounded-full shadow-lg shadow-natural-charcoal/10 hover:shadow-natural-charcoal/20 active:scale-98 transition-all cursor-pointer overflow-hidden"
        >
          <span>开启深度探索之旅</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
}
