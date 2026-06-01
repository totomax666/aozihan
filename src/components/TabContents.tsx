import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeoCard, NeoButton, NeoBadge, HighlightText } from './NeoComponents';
import { StarShape, CloudShape, EyeShape, FlowerShape } from './Illustrations';
import { ArrowRight, MoveUpRight, Zap, MessageCircle, Smile, Play, Gamepad2, Heart, X } from 'lucide-react';
import { GeminiLogo, ChatGPTLogo, DeepSeekLogo } from './AILogos';
import NukeSimulator from '../chuandaima/src/App';

const OrbitIcon = ({ 
  icon: Icon, color, textColor, 
  radius, tiltX, tiltZ, duration, reverse = false,
  startAngle = 0
}: {
  icon: React.ElementType;
  color: string;
  textColor?: string;
  radius: number;
  tiltX: number;
  tiltZ: number;
  duration: number;
  reverse?: boolean;
  startAngle?: number;
}) => {
  return (
    <div 
      className="absolute top-1/2 left-1/2 pointer-events-none" 
      style={{ 
        transformStyle: 'preserve-3d', 
        transform: `rotateZ(${tiltZ}deg) rotateX(${tiltX}deg)` 
      }}
    >
      {/* Orbit Track (hidden per request) */}
      <div 
        className="absolute top-1/2 left-1/2 rounded-full border-[2px] border-transparent opacity-0 box-border" 
        style={{ width: radius * 2, height: radius * 2, transform: 'translate(-50%, -50%) rotateX(90deg)' }} 
      />
      
      {/* Rotating Parent */}
      <motion.div 
        initial={{ rotateY: startAngle }}
        animate={{ rotateY: startAngle + (reverse ? -360 : 360) }} 
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ transform: `translateZ(${radius}px)`, transformStyle: 'preserve-3d' }} className="absolute top-0 left-0">
           {/* Counter Rotate Y */}
           <motion.div 
             initial={{ rotateY: -startAngle }}
             animate={{ rotateY: -(startAngle + (reverse ? -360 : 360)) }} 
             transition={{ duration, repeat: Infinity, ease: "linear" }}
             style={{ transformStyle: 'preserve-3d' }}
             className="absolute top-0 left-0"
           >
              {/* Counter Rotate Z and X */}
              <div 
                className="pointer-events-auto absolute"
                style={{ 
                  transform: `rotateX(${-tiltX}deg) rotateZ(${-tiltZ}deg) translate(-50%, -50%)`,
                }}
              >
                 <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-[3px] border-dark ${color} ${textColor || 'text-dark'} flex items-center justify-center shadow-[4px_4px_0_0_#000]`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10" />
                 </div>
              </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function HomeTab({ onNavigate, onShowContact }: { onNavigate: (id: string) => void, onShowContact: () => void }) {
  return (
    <div className="flex flex-col gap-16 py-8 relative">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 z-10 w-full">
          <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-black leading-[1.3] md:leading-[1.2] tracking-tight md:whitespace-nowrap">
            我是 <HighlightText color="bg-neo-yellow">敖AO</HighlightText>，<br />
            一个练习时长<HighlightText color="bg-neo-pink">两月半</HighlightText>的<br />
            <HighlightText color="bg-neo-blue text-white px-2">Vibe Coding</HighlightText> 开发者。
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-700 max-w-xl">
            自媒体创作者 <span className="opacity-50 mx-1">|</span> AI 创业者 <span className="opacity-50 mx-1">|</span> F1法拉利车队未签约车手
            <br />
            <br />
            一个有很多稀奇古怪想法的<span className="inline-block"><HighlightText color="bg-neo-yellow">白日梦想家</HighlightText></span>。
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <NeoButton variant="secondary" onClick={() => onNavigate('about')}>
              了解更多我的信息
            </NeoButton>
          </div>
        </div>
        
        {/* Right side illustration cluster */}
        <div 
          className="flex-1 relative w-full h-[300px] md:h-[400px] flex items-center justify-center mt-12 md:mt-24 group z-20 pointer-events-auto"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {/* Avatar Center */}
          <div 
            className="absolute top-1/2 left-1/2 w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-dark bg-neo-yellow flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 hover:rotate-[5deg] hover:shadow-[8px_8px_0_0_#000] z-30 cursor-pointer"
            style={{ transform: 'translate(-50%, -50%) translateZ(0)' }}
          >
            <img src="/avatar.jpg" alt="我的头像" className="w-full h-full object-cover transition-transform duration-700 hover:scale-125" />
            {/* Using a pseudo-element like border shadow to not block 3D z-index */}
            <div className="absolute inset-0 border-[4px] border-transparent shadow-[inset_-6px_-6px_0_0_rgba(0,0,0,0.1)] rounded-full pointer-events-none" />
          </div>

          <OrbitIcon icon={ChatGPTLogo} color="bg-[#10a37f]" textColor="text-white" radius={140} tiltX={15} tiltZ={45} duration={6} startAngle={0} />
          <OrbitIcon icon={GeminiLogo} color="bg-white" radius={170} tiltX={15} tiltZ={-45} duration={6} startAngle={120} />
          <OrbitIcon icon={DeepSeekLogo} color="bg-[#4d6bfe]" textColor="text-white" radius={200} tiltX={15} tiltZ={0} duration={6} startAngle={240} />
          


        </div>
      </section>

      {/* Vibe Coding Title and Work In Progress Card */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-24 z-10 w-full mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl md:text-5xl font-black flex items-center gap-4">
            我的 <HighlightText color="bg-neo-yellow">Vibe Coding</HighlightText> 创作
            <span className="text-xl font-bold text-gray-400 uppercase tracking-widest mt-2 hidden md:inline">Neo Projects</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="block group cursor-pointer">
            <NeoCard hover={true} className="flex flex-col h-full min-h-[300px] p-6 bg-white relative transition-all duration-300">
              <div className="mb-6 self-start">
                <div className="bg-[#000000] text-[#FFFFFF] text-[12px] font-bold tracking-widest px-3 py-1 border-[2px] border-dark shadow-[2px_2px_0_0_#000] inline-block uppercase">
                  # 001
                </div>
              </div>
              <h3 className="text-[24px] md:text-[28px] text-[#000000] font-black mb-4 leading-tight group-hover:text-neo-blue transition-colors">
                核爆模拟器
              </h3>
              <div className="pl-4 border-l-[3px] border-neo-pink mb-auto">
                <p className="text-[14px] md:text-[16px] text-gray-600 leading-[1.6] font-bold line-clamp-3">
                  用最直观的方式了解核武器的毁灭性威力，愿我们永远生活在和平的阳光下
                </p>
              </div>
              <div className="mt-8 w-full flex flex-col items-start">
                <button className="w-full sm:w-auto bg-white group-hover:bg-neo-yellow text-dark text-[16px] font-bold py-2.5 px-6 border-[3px] border-dark shadow-[4px_4px_0_0_#000] group-hover:shadow-[6px_6px_0_0_#000] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:outline-none">
                  View Product <ArrowRight size={18} strokeWidth={3} />
                </button>
                <div className="mt-4 text-[11px] text-gray-500 uppercase tracking-widest font-bold self-center sm:self-start">
                  RELEASED ON 2026.05.01
                </div>
              </div>
            </NeoCard>
          </div>

          <NeoCard className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] border-dashed border-[3px] border-dark bg-white shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center flex-col gap-4">
               <div className="w-10 h-10 rounded-full bg-neo-pink animate-pulse border-[2px] border-dark shadow-[2px_2px_0_0_#000]"></div>
               <p className="text-2xl font-black text-dark tracking-widest text-center">作品开发中...</p>
               <p className="text-sm font-bold text-gray-600 text-center mt-2">这里将展示我使用 Vibe Coding 理念开发的独立应用<br/>和实验性项目，敬请期待。</p>
            </div>
          </NeoCard>

        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-8 z-10 w-full mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl md:text-5xl font-black flex items-center gap-4">
            <HighlightText color="bg-neo-pink">视频</HighlightText>
            <span className="text-xl font-bold text-gray-400 uppercase tracking-widest mt-2 hidden md:inline">Latest Videos</span>
          </h2>
          <button onClick={() => onNavigate('video')} className="text-sm font-bold text-dark hover:underline flex items-center gap-1 mt-2 cursor-pointer">
            观看所有视频 <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              bvid: "BV1mZ421h7Md", 
              title: "健身偷个懒差点被发现了",
              play: "252.9w",
              like: "7.5w",
              pic: "/视频封面/视频1.webp"
            }
          ].map((video, i) => (
             <motion.a 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
               key={video.bvid} 
               href={video.bvid.startsWith('BV') ? `https://www.bilibili.com/video/${video.bvid}` : "https://space.bilibili.com/285211967/video"}
               target="_blank"
               rel="noopener noreferrer"
               className="block group"
             >
               <NeoCard className="flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0_0_#000] p-0">
                 <div className="relative aspect-video border-b-[3px] border-dark overflow-hidden bg-gray-200">
                    <img src={video.pic} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-neo-yellow border-[3px] border-dark flex items-center justify-center pl-1">
                         <Play size={24} fill="currentColor" className="text-dark" />
                      </div>
                    </div>
                 </div>
                 <div className="p-5 flex-grow flex flex-col justify-between bg-white border-none">
                   <h3 className="text-xl font-black line-clamp-2 leading-tight group-hover:text-neo-blue transition-colors">
                     {video.title}
                   </h3>
                   <div className="flex items-center gap-4 mt-4 text-sm font-bold text-gray-600">
                     <span className="flex items-center gap-1.5">
                       <div className="w-5 h-5 rounded-sm bg-neo-blue flex items-center justify-center border-[2px] border-dark">
                         <Play className="w-3 h-3 fill-white text-white" />
                       </div> {video.play}
                     </span>
                     <span className="flex items-center gap-1.5">
                       <Heart className="w-5 h-5 fill-neo-pink text-dark stroke-[2px]" /> {video.like}
                     </span>
                   </div>
                 </div>
               </NeoCard>
             </motion.a>
          ))}
          
          {/* Work In Progress Card for Video Section */}
          <NeoCard className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] border-dashed border-[3px] border-dark bg-white shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center flex-col gap-4">
               <div className="w-10 h-10 rounded-full bg-neo-pink animate-pulse border-[2px] border-dark shadow-[2px_2px_0_0_#000]"></div>
               <p className="text-2xl font-black text-dark tracking-widest text-center">视频创作中...</p>
               <p className="text-sm font-bold text-gray-600 text-center mt-2">新的整活视频正在剪辑中<br/>敬请期待</p>
            </div>
          </NeoCard>
        </div>
      </motion.section>

      {/* Articles Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-16 z-10 w-full mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl md:text-5xl font-black flex items-center gap-4">
            <HighlightText color="bg-neo-blue">文章</HighlightText>
            <span className="text-xl font-bold text-gray-400 uppercase tracking-widest mt-2 hidden md:inline">Latest Thoughts</span>
          </h2>
          <button onClick={() => onNavigate('articles')} className="text-sm font-bold text-dark hover:underline flex items-center gap-1 mt-2 cursor-pointer">
            游览全部文章 <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>
        
        <div className="space-y-6">
          {[
            { 
              date: '2025.04.08', 
              title: 'DeepSeek连夜改页面，免费的AI时代可能要结束了', 
              desc: '凌晨突发改版！DeepSeek深夜悄无声息调整模式，拆分并非简单的功能区分，而是一次精准的算力精细化管控。',
              url: 'https://mp.weixin.qq.com/s/lFmOpzVvB2YJABZpbesTLQ',
              pic: '/文章封面/文章1.jpg'
            }
          ].map((article, i) => (
            <motion.a 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.15 }}
              key={i} 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <NeoCard hover={true} className="flex flex-col md:flex-row overflow-hidden group p-0">
                {/* Image Block */}
                <div className="relative aspect-[16/9] md:aspect-auto md:w-56 border-b-[3px] md:border-b-0 md:border-r-[3px] border-dark overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
                  <img src={article.pic} alt={article.title} className="w-[120%] h-[120%] max-w-none object-cover object-left-top transition-transform duration-500 group-hover:scale-105" />
                </div>
              
              {/* Content Block */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center bg-white relative">
                 <h3 className="text-2xl font-black mb-2 pr-8 leading-tight flex items-center gap-2 group-hover:text-neo-blue transition-colors">
                   {article.title}
                 </h3>
                 <div className="inline-block bg-white border-[2px] border-dark px-2 py-0.5 text-xs font-black shadow-[2px_2px_0_0_#000] rotate-[-1deg] self-start mb-4">
                   {article.date}
                 </div>
                 <p className="font-bold text-gray-600 line-clamp-2 md:line-clamp-none">{article.desc}</p>
                 
                 <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border-[3px] border-dark bg-neo-pink flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden md:flex">
                   <ArrowRight strokeWidth={4} />
                 </div>
              </div>
            </NeoCard>
            </motion.a>
          ))}

          {/* Work In Progress Card for Articles Section */}
          <NeoCard className="flex flex-col items-center justify-center p-8 border-dashed border-[3px] border-dark bg-white shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center flex-col gap-4">
               <div className="w-10 h-10 rounded-full bg-neo-yellow animate-pulse border-[2px] border-dark shadow-[2px_2px_0_0_#000]"></div>
               <p className="text-2xl font-black text-dark tracking-widest text-center">作者努力写作中...</p>
               <p className="text-sm font-bold text-gray-600 text-center mt-2">更多的干货文章正在肝<br/>敬请期待</p>
            </div>
          </NeoCard>
        </div>
      </motion.section>


    </div>
  );
}

export function AboutTab() {
  return (
    <div className="py-8 space-y-16">
        {/* Story & Skills */}
        <div className="w-full space-y-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 flex flex-wrap items-center gap-4">
              敖AO的 <span className="bg-dark text-white px-4 py-2 border-[3px] border-dark shadow-[4px_4px_0_0_#A3E635] flex items-center gap-3 -rotate-2 hover:rotate-0 transition-transform"><Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-neo-green" /> 地球Online</span> 游戏存档处
            </h2>
            <div className="bg-white border-[3px] border-dark p-6 md:p-8 shadow-[6px_6px_0_0_#000] space-y-8">
              {/* Intro */}
              <div>
                <h3 className="font-black text-2xl mb-4 flex items-center gap-3"><div className="w-4 h-4 bg-neo-blue border-[3px] border-dark rounded-full"></div>玩家信息 INFO</h3>
                <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed border-l-[4px] border-neo-pink pl-4 md:pl-6 space-y-3">
                  <span className="block">账号创建于 <span className="bg-neo-yellow px-2 py-0.5 border-2 border-dark font-black tracking-widest">2000.11</span>，所在服务器 <span className="bg-neo-blue text-white px-2 py-0.5 border-2 border-dark font-black">中国云南</span>。</span>
                  <span className="block">出生时系统提示是 <span className="text-neo-pink font-black text-2xl border-b-4 border-neo-pink">SSR品质</span> <span className="text-sm text-gray-400">（我妈说的）</span>。</span>
                  <span className="block">大学技能点点的是 <span className="border-b-[3px] border-dark font-black text-neo-orange">人力资源管理</span>。</span>
                  <span className="block">角色当前职业：一转 <span className="bg-dark text-white px-2 py-0.5 border-2 border-dark font-black shadow-[2px_2px_0_0_#A3E635]">初级独立开发者</span> 中...</span>
                </p>
              </div>

              {/* Buffs */}
              <div>
                <h3 className="font-black text-2xl mb-4 flex items-center gap-3"><div className="w-4 h-4 bg-neo-pink border-[3px] border-dark rotate-45"></div>BUFF 加成</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-0 md:pl-7">
                  <div className="bg-gray-50 border-[3px] border-dark p-4 shadow-[4px_4px_0_0_#000] flex-1 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] transition-all">
                    <div className="font-black text-xl mb-2 flex items-center gap-2">
                      莫名自信 Buff <Zap size={20} className="text-neo-yellow fill-neo-yellow" strokeWidth={2} />
                    </div>
                    <div className="text-sm font-bold text-gray-600">对大部分事情都有莫名其妙的自信感</div>
                  </div>
                  <div className="bg-gray-50 border-[3px] border-dark p-4 shadow-[4px_4px_0_0_#000] flex-1 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] transition-all">
                    <div className="font-black text-xl mb-2 flex items-center gap-2">
                      头脑风暴 Buff <Zap size={20} className="text-neo-blue fill-neo-blue" strokeWidth={2} />
                    </div>
                    <div className="text-sm font-bold text-gray-600">有很多天马行空的想法，脑子里住着一个好莱坞剧组</div>
                  </div>
                  <div className="bg-gray-50 border-[3px] border-dark p-4 shadow-[4px_4px_0_0_#000] flex-1 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] transition-all relative">
                    <div className="absolute top-0 right-0 bg-dark text-white text-[10px] uppercase font-black py-0.5 px-2 tracking-widest -mt-[3px] -mr-[3px]">Passive</div>
                    <div className="font-black text-xl mb-2 flex items-center gap-2">
                      双面社恐 Buff <Smile size={20} className="text-neo-pink" strokeWidth={3} />
                    </div>
                    <div className="text-sm font-bold text-gray-600">生人面前挂机离线，熟人面前社交恐怖分子</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-black flex items-center gap-3">
              <div className="w-5 h-5 bg-neo-yellow border-[3px] border-dark animate-pulse"></div>
              近期喜欢的副本
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Reading */}
              <NeoCard bg="bg-white" className="p-5 border-[3px] border-dark shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] focus-within:rotate-1 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-neo-orange border-[2px] border-dark text-dark px-2 py-0.5 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000]">阅读副本</span>
                  </div>
                  <div className="font-black text-xl">《小岛经济学》</div>
                </div>
              </NeoCard>

              {/* Life */}
              <NeoCard bg="bg-white" className="p-5 border-[3px] border-dark shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] focus-within:rotate-1 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-neo-blue text-white border-[2px] border-dark px-2 py-0.5 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000]">生活副本</span>
                  </div>
                  <div className="font-black text-xl">AI编程、健身</div>
                </div>
              </NeoCard>

              {/* Movie/TV */}
              <NeoCard bg="bg-white" className="p-5 border-[3px] border-dark shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] focus-within:-rotate-1 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-neo-pink border-[2px] border-dark text-dark px-2 py-0.5 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000]">影视副本</span>
                  </div>
                  <div className="font-black text-xl leading-snug">《罗小黑战记》<br/>《F1：狂飙飞车》</div>
                </div>
              </NeoCard>

              {/* Game */}
              <NeoCard bg="bg-white" className="p-5 border-[3px] border-dark shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] focus-within:-rotate-1 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-neo-green border-[2px] border-dark text-dark px-2 py-0.5 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000]">游戏副本</span>
                  </div>
                  <div className="font-black text-xl">极速地平线系列</div>
                </div>
              </NeoCard>
            </div>
          </div>

          <div className="space-y-8 pt-8">
            <h3 className="text-3xl font-black flex items-center gap-3">
              <div className="w-5 h-5 bg-neo-pink border-[3px] border-dark animate-pulse"></div>
              我的地球Online游戏进度
            </h3>

            <div className="hidden md:flex justify-between w-full max-w-4xl mx-auto mt-8 mb-4">
              <div className="w-1/2 pr-12 text-right">
                <span className="font-black text-xl px-4 py-2 bg-dark text-neo-yellow border-[3px] border-dark shadow-[4px_4px_0_0_#A3E635] inline-block -rotate-2">
                  主线任务 / MAIN QUEST
                </span>
              </div>
              <div className="w-1/2 pl-12 text-left">
                <span className="font-black text-xl px-4 py-2 bg-white text-dark border-[3px] border-dark shadow-[4px_4px_0_0_#000] inline-block rotate-2">
                  支线任务 / SIDE QUEST
                </span>
              </div>
            </div>

            <div className="relative max-w-4xl mx-auto mt-12 pb-8 flex flex-col md:block">
              {/* Central Line (Thicker and neo-brutalist) */}
              <div className="absolute left-[24px] md:left-1/2 top-4 bottom-0 w-[6px] bg-dark -ml-[3px] z-0 hidden md:block rounded-full"></div>
              
              {/* Mobile Timeline Line */}
              <div className="absolute left-[24px] top-4 bottom-0 w-[6px] bg-dark -ml-[3px] z-0 md:hidden rounded-full"></div>

              {/* 2026.04 Side Quest (Right) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative w-full mb-12 group flex justify-end md:justify-start">
                {/* Node */}
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-yellow border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform *:origin-center rotate-45"></div>
                {/* Connector Mobile */}
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                {/* Connector Desktop */}
                <div className="hidden md:block absolute left-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-12 md:ml-auto z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-yellow px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] rotate-2">2026.04</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-white -rotate-1 shadow-[2px_2px_0_0_#000]">支线 / SIDE QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">开始AI编程，上线了我的个人网站</p>
                  </div>
                </div>
              </motion.div>

              {/* 2025.09 Main Quest (Left) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-blue border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute right-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-0 md:pr-12 z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 md:hover:translate-x-1 md:hover:shadow-[10px_10px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] transition-all relative md:text-right flex flex-col md:items-end">
                    <div className="flex flex-wrap md:justify-end items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-dark text-white px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#A3E635] -rotate-2 order-1 md:order-2">2025.09 - 至今</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-neo-yellow text-dark rotate-1 order-2 md:order-1 shadow-[2px_2px_0_0_#000]">主线 / MAIN QUEST</div>
                    </div>
                    <p className="font-bold text-lg text-dark">学习AI，在成为独立开发者的路上</p>
                  </div>
                </div>
              </motion.div>

              {/* 2024.09 Side Quest (Right) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-end md:justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-pink border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute left-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-12 md:ml-auto z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-pink px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] -rotate-1">2024.09</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-white rotate-2 shadow-[2px_2px_0_0_#000]">支线 / SIDE QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">喜欢上了健身，并转战做健身自媒体<br/>半个月时间做出B站，抖音，小红书多平台单条百万播放视频</p>
                  </div>
                </div>
              </motion.div>

              {/* 2024.09 Main Quest (Left) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-orange border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute right-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-0 md:pr-12 z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 md:hover:translate-x-1 md:hover:shadow-[10px_10px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] transition-all relative md:text-right flex flex-col md:items-end">
                    <div className="flex flex-wrap md:justify-end items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-orange px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] rotate-2 order-1 md:order-2">2024.09</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-dark text-neo-yellow -rotate-1 order-2 md:order-1 shadow-[2px_2px_0_0_#000]">主线 / MAIN QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">考公以及和生活对线solo</p>
                  </div>
                </div>
              </motion.div>

              {/* 2023.06 Main Quest (Left) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-green border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute right-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-0 md:pr-12 z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 md:hover:translate-x-1 md:hover:shadow-[10px_10px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] transition-all relative md:text-right flex flex-col md:items-end">
                    <div className="flex flex-wrap md:justify-end items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-green px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] -rotate-1 order-1 md:order-2">2023.06</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-dark text-neo-yellow rotate-1 order-2 md:order-1 shadow-[2px_2px_0_0_#000]">主线 / MAIN QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">毕业于云南工商学院，人力资源管理专业</p>
                  </div>
                </div>
              </motion.div>

              {/* 2021.11 Side Quest (Right) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-end md:justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-blue border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute left-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-12 md:ml-auto z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-blue text-white px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] rotate-2">2021.11</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-white -rotate-1 shadow-[2px_2px_0_0_#000]">支线 / SIDE QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">成为B站游戏区UP主<br/>解说《死寂》和《光明记忆》的视频被游戏作者点赞三连并评价</p>
                  </div>
                </div>
              </motion.div>

              {/* 2018.08 Side Quest (Right) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-end md:justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-yellow border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute left-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-12 md:ml-auto z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-yellow px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] -rotate-1">2018.08</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-white rotate-2 shadow-[2px_2px_0_0_#000]">支线 / SIDE QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">在虎牙直播做虎牙游戏主播<br/>并用一个月时间成为虎牙签约主播</p>
                  </div>
                </div>
              </motion.div>

              {/* 2015.07 Side Quest (Right) */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} className="relative w-full mb-12 group flex justify-end md:justify-start">
                <div className="absolute left-[24px] md:left-1/2 top-6 w-8 h-8 bg-neo-orange border-[3px] border-dark -ml-[16px] z-20 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform rotate-45"></div>
                <div className="absolute left-[24px] top-9 w-6 h-[6px] bg-dark z-10 md:hidden"></div>
                <div className="hidden md:block absolute left-1/2 top-9 w-12 h-[6px] bg-dark z-10"></div>
                
                <div className="w-full pl-12 md:w-1/2 md:pl-12 md:ml-auto z-30">
                  <div className="bg-white border-[3px] border-dark p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 md:hover:-translate-x-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="font-black md:text-lg bg-neo-orange px-2 py-0.5 inline-block border-[2px] border-dark shadow-[3px_3px_0_0_#000] rotate-1">2015.07</div>
                      <div className="font-black text-xs px-2 py-0.5 uppercase tracking-widest border-[2px] border-dark bg-white -rotate-1 shadow-[2px_2px_0_0_#000]">支线 / SIDE QUEST</div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">在爱拍原创做游戏自媒体<br/>主要做CF生化模式和单机游戏</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
    </div>
  );
}

export function VideoTab() {
  const videos = [
    {
      bvid: "BV1mZ421h7Md", 
      title: "健身偷个懒差点被发现了",
      play: "252.9w",
      like: "7.5w",
      pic: "/视频封面/视频1.webp"
    }
  ];

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-black">
              我的 <HighlightText color="bg-neo-blue text-white">地球Online</HighlightText>
            </h2>
            <div className="hidden md:flex items-center gap-2 bg-neo-yellow border-[3px] border-dark px-3 py-1 shadow-[4px_4px_0_0_#000] rotate-2">
              <Play className="w-5 h-5 text-dark fill-dark" />
              <span className="font-black text-sm tracking-widest">RECORDING</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black flex flex-wrap items-center gap-3">
            实况录像
            <span className="text-2xl md:text-3xl text-gray-400 uppercase tracking-widest mt-2 inline-block">LIVE REPLAY</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, i) => (
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
            key={video.bvid} 
            href={video.bvid.startsWith('BV') ? `https://www.bilibili.com/video/${video.bvid}` : "https://space.bilibili.com/285211967/video"}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <NeoCard className="flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0_0_#000] p-0">
              <div className="relative aspect-video border-b-[3px] border-dark overflow-hidden bg-gray-200">
                <img src={video.pic} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-neo-yellow border-[3px] border-dark flex items-center justify-center pl-1">
                      <Play size={24} fill="currentColor" className="text-dark" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between bg-white border-none">
                <h3 className="text-xl font-black line-clamp-2 leading-tight group-hover:text-neo-blue transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 mt-4 text-sm font-bold text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-sm bg-neo-blue flex items-center justify-center border-[2px] border-dark">
                      <Play className="w-3 h-3 fill-white text-white" />
                    </div> {video.play}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-neo-pink text-dark stroke-[2px]" /> {video.like}
                  </span>
                </div>
              </div>
            </NeoCard>
          </motion.a>
        ))}

        {/* Work In Progress Card for Video Section */}
        <NeoCard className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] border-dashed border-[3px] border-dark bg-white shadow-[6px_6px_0_0_#000]">
          <div className="flex items-center flex-col gap-4">
             <div className="w-10 h-10 rounded-full bg-neo-pink animate-pulse border-[2px] border-dark shadow-[2px_2px_0_0_#000]"></div>
             <p className="text-2xl font-black text-dark tracking-widest text-center">视频创作中...</p>
             <p className="text-sm font-bold text-gray-600 text-center mt-2">新的整活视频正在剪辑中<br/>敬请期待</p>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}

export function ArticlesTab() {
  const articles = [
    { 
      date: '2025.04.08', 
      title: 'DeepSeek连夜改页面，免费的AI时代可能要结束了', 
      desc: '凌晨突发改版！DeepSeek深夜悄无声息调整模式，拆分并非简单的功能区分，而是一次精准的算力精细化管控。',
      url: 'https://mp.weixin.qq.com/s/lFmOpzVvB2YJABZpbesTLQ',
      pic: '/文章封面/文章1.jpg'
    }
  ];

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h2 className="text-5xl font-black mb-12 text-center">
        LATEST <HighlightText color="bg-neo-yellow">THOUGHTS</HighlightText>
      </h2>
      
      <div className="space-y-6">
        {articles.map((article, i) => (
          <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="block group">
            <NeoCard hover={true} className="flex flex-col md:flex-row overflow-hidden group p-0">
              {/* Image Block */}
              <div className="relative aspect-[16/9] md:aspect-auto md:w-56 border-b-[3px] md:border-b-0 md:border-r-[3px] border-dark overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
                <img src={article.pic} alt={article.title} className="w-[120%] h-[120%] max-w-none object-cover object-left-top transition-transform duration-500 group-hover:scale-105" />
              </div>
              
              {/* Content Block */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center bg-white relative">
                 <h3 className="text-2xl font-black mb-2 pr-8 leading-tight group-hover:text-neo-blue transition-colors">{article.title}</h3>
                 <div className="inline-block bg-white border-[2px] border-dark px-2 py-0.5 text-xs font-black shadow-[2px_2px_0_0_#000] rotate-[-1deg] self-start mb-4">
                   {article.date}
                 </div>
                 <p className="font-bold text-gray-600 line-clamp-2 md:line-clamp-none">{article.desc}</p>
                 
                 <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border-[3px] border-dark bg-neo-pink flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden md:flex">
                   <ArrowRight strokeWidth={4} />
                 </div>
              </div>
            </NeoCard>
          </a>
        ))}

        {/* Work In Progress Card for Articles Section */}
        <NeoCard className="flex flex-col items-center justify-center p-8 border-dashed border-[3px] border-dark bg-white shadow-[6px_6px_0_0_#000]">
          <div className="flex items-center flex-col gap-4">
             <div className="w-10 h-10 rounded-full bg-neo-yellow animate-pulse border-[2px] border-dark shadow-[2px_2px_0_0_#000]"></div>
             <p className="text-2xl font-black text-dark tracking-widest text-center">作者努力写作中...</p>
             <p className="text-sm font-bold text-gray-600 text-center mt-2">更多的干货文章正在肝<br/>敬请期待</p>
          </div>
        </NeoCard>
      </div>
      
      <div className="flex justify-center mt-12">
        <NeoButton variant="dark">阅读更多文章</NeoButton>
      </div>
    </div>
  );
}

export function ProductsTab() {
  // 这里存放你已经做好的产品数据
  const products = [
    {
      id: "naoli",
      title: "脑力测试",
      desc: "多款测试脑力、反应力、短时记忆力和手眼协调能力的小游戏合集",
      releasedOn: "2026.06.01",
    }
  ];

  return (
    <div className="py-8 space-y-12 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl md:text-5xl font-black flex items-center gap-4">
          我的 <HighlightText color="bg-neo-yellow">Vibe Coding</HighlightText> 创作
          <span className="text-xl font-bold text-gray-400 uppercase tracking-widest mt-2 hidden md:inline">Neo Projects</span>
        </h2>
      </div>

      {/* 已完成的产品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <div 
            key={i} 
            onClick={(e) => {
              e.preventDefault();
              if (product.id === "naoli") {
                window.open('?page=naoli', '_blank');
              }
            }} 
            className="block group cursor-pointer"
          >
            <NeoCard hover={true} className="flex flex-col h-full min-h-[300px] p-6 bg-white relative transition-all duration-300">
              
              {/* 编号 #001 */}
              <div className="mb-6 self-start">
                <div className="bg-[#000000] text-[#FFFFFF] text-[12px] font-bold tracking-widest px-3 py-1 border-[2px] border-dark shadow-[2px_2px_0_0_#000] inline-block uppercase">
                  # 001
                </div>
              </div>

              {/* 标题 */}
              <h3 className="text-[24px] md:text-[28px] text-[#000000] font-black mb-4 leading-tight group-hover:text-neo-blue transition-colors">
                {product.title}
              </h3>

              {/* 描述 (带左侧黑线) */}
              <div className="pl-4 border-l-[3px] border-neo-pink mb-auto">
                <p className="text-[14px] md:text-[16px] text-gray-600 leading-[1.6] font-bold line-clamp-3">
                  {product.desc}
                </p>
              </div>

              {/* 底部按钮区域 */}
              <div className="mt-8 w-full flex flex-col items-start">
                <button 
                  className="w-full sm:w-auto bg-white group-hover:bg-neo-yellow text-dark text-[16px] font-bold py-2.5 px-6 border-[3px] border-dark shadow-[4px_4px_0_0_#000] group-hover:shadow-[6px_6px_0_0_#000] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:outline-none"
                >
                  View Product <ArrowRight size={18} strokeWidth={3} />
                </button>
                <div className="mt-4 text-[11px] text-gray-500 uppercase tracking-widest font-bold self-center sm:self-start">
                  RELEASED ON {product.releasedOn}
                </div>
              </div>

            </NeoCard>
          </div>
        ))}

        {/* 原本的 "开发中" 占位卡片 */}
        <NeoCard className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] border-dashed border-[3px] border-dark bg-white shadow-[6px_6px_0_0_#000]">
          <div className="flex items-center flex-col gap-4">
             <div className="w-10 h-10 rounded-full bg-neo-pink animate-pulse border-[2px] border-dark shadow-[2px_2px_0_0_#000]"></div>
             <p className="text-2xl font-black text-dark tracking-widest text-center">作品开发中...</p>
             <p className="text-sm font-bold text-gray-600 text-center mt-2">这里将展示我使用 Vibe Coding 理念开发的独立应用<br/>和实验性项目，敬请期待。</p>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}
