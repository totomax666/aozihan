import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HomeTab, AboutTab, VideoTab, ArticlesTab, ProductsTab } from './components/TabContents';
import { NeoButton } from './components/NeoComponents';
import NukeSimulator from './chuandaima/src/App';
import NaoliApp from './naoli/src/App';

import { Smile, User, Briefcase, FileText, Menu, X, ArrowRight, MessageCircle, Tv, Music, BookHeart, Eye } from 'lucide-react';

const TABS = [
  { id: 'home', label: '首页', icon: Smile },
  { id: 'about', label: '关于我', icon: User },
  { id: 'video', label: '视频', icon: Tv },
  { id: 'articles', label: '文章', icon: FileText },
  { id: 'products', label: '产品', icon: Briefcase },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [fullPage, setFullPage] = useState<null | 'simulator' | 'naoli'>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page === 'simulator' || page === 'naoli') {
      setFullPage(page);
    }
    if (page === 'simulator') {
      document.title = "核爆模拟器 PRO";
    }
    if (page === 'naoli') {
      document.title = "脑力测试";
    }
  }, []);

  if (fullPage === 'simulator') {
    return (
      <div className="w-screen h-screen overflow-hidden bg-slate-950">
        <NukeSimulator />
      </div>
    );
  }

  if (fullPage === 'naoli') {
    return (
      <div className="w-screen h-screen overflow-auto bg-paper">
        <NaoliApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-paper border-b-[3px] border-dark">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-dark rotate-3 flex items-center justify-center">
              <span className="text-white font-bold text-xl">敖</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter mt-1">的地球Online存档处</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-lg font-bold transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 py-1 ${
                  activeTab === tab.id ? 'text-neo-orange border-b-[4px] border-neo-orange' : 'text-dark hover:text-neo-blue'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <NeoButton onClick={() => setIsContactModalOpen(true)} className="ml-4 flex items-center gap-2 bg-dark text-white hover:bg-neo-pink hover:text-dark">
              取得联系 <ArrowRight size={18} strokeWidth={3} />
            </NeoButton>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden p-2 text-dark"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} strokeWidth={3}/> : <Menu size={32} strokeWidth={3} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-0 w-full bg-paper border-b-[3px] border-dark z-40 shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-4 border-[3px] border-dark font-bold text-lg shadow-[4px_4px_0_0_#000] ${
                    activeTab === tab.id ? 'bg-neo-yellow' : 'bg-white'
                  }`}
                >
                  <tab.icon size={24} strokeWidth={3} />
                  {tab.label}
                </button>
              ))}
              <NeoButton onClick={() => { setIsContactModalOpen(true); setMenuOpen(false); }} className="mt-4 flex items-center justify-center gap-2 bg-dark text-white">
                取得联系 <ArrowRight size={20} strokeWidth={3} />
              </NeoButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.8 }}
          >
            {activeTab === 'home' && <HomeTab onNavigate={setActiveTab} onShowContact={() => setIsContactModalOpen(true)} />}
            {activeTab === 'about' && <AboutTab />}
            {activeTab === 'video' && <VideoTab />}
            {activeTab === 'articles' && <ArticlesTab />}
            {activeTab === 'products' && <ProductsTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-[3px] border-dark bg-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <p className="font-black text-2xl">
              The future is being built. Join us, or watch from the sidelines.
              <br />
              未来正在被建造。要么加入，要么旁观。
            </p>
          </div>
          
          {/* Middle */}
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-xl text-dark">探索</h3>
            <div className="w-12 h-[3px] bg-neo-orange mb-2"></div>
            <ul className="flex flex-col gap-3">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-gray-700 hover:text-neo-blue transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={16} strokeWidth={3} className="text-neo-pink" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-xl text-dark">链接</h3>
            <div className="w-12 h-[3px] bg-neo-green mb-2"></div>
            <div className="flex flex-wrap gap-4">
              <a href="https://weibo.com/u/6059500988" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-[3px] border-dark bg-white text-[#DF2029] flex items-center justify-center font-bold transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0_0_#000] shadow-[4px_4px_0_0_#000]" title="微博">
                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z"/>
                </svg>
              </a>
              <a href="https://b23.tv/V2Gy1X2" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-[3px] border-dark bg-[#FB7299] text-white flex items-center justify-center font-bold transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0_0_#000] shadow-[4px_4px_0_0_#000]" title="哔哩哔哩">
                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
                </svg>
              </a>
              <a href="https://v.douyin.com/qXK66uC6pOE/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-[3px] border-dark bg-[#010101] text-white flex items-center justify-center font-bold transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0_0_#000] shadow-[4px_4px_0_0_#000]" title="抖音">
                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ filter: 'drop-shadow(-1.5px -1.5px 0px #24ffcc) drop-shadow(1.5px 1.5px 0px #fc0049)' }}>
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://xhslink.com/m/4E6HEDimOl3" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-[3px] border-dark bg-[#FF2442] text-white flex items-center justify-center font-black text-xl transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0_0_#000] shadow-[4px_4px_0_0_#000]" title="小红书">红</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-12 pt-8 border-t-2 border-dashed border-gray-200 text-center">
          <span className="font-medium text-gray-500 italic">© 2026 敖AO. All rights reserved.</span>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md border-[3px] border-dark bg-white p-0 shadow-[8px_8px_0_0_#000] overflow-hidden flex flex-col"
            >
              <div className="bg-neo-yellow px-6 py-4 flex items-center justify-between border-b-[3px] border-dark">
                <h2 className="text-2xl font-black text-dark">商务合作</h2>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="w-8 h-8 rounded-full border-[2px] border-dark bg-neo-pink flex items-center justify-center text-dark transition-all duration-300 hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0_0_#000] shadow-[2px_2px_0_0_#000]"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>
              <div className="px-6 py-8 bg-paper flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full border-[3px] border-dark bg-neo-blue flex items-center justify-center mb-2 shadow-[4px_4px_0_0_#000]">
                  <MessageCircle size={32} className="text-white" strokeWidth={2.5}/>
                </div>
                <p className="text-xl font-bold text-gray-700 text-center">
                  随时欢迎联络，请发送邮件至：
                </p>
                <div className="bg-white border-[3px] border-dark px-4 py-3 shadow-[4px_4px_0_0_#000] w-full text-center">
                  <span className="text-2xl font-black text-neo-pink select-all">50630799@qq.com</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
