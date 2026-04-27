import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  RefreshCcw, 
  Share2, 
  Cat, 
  Heart, 
  Zap, 
  Star, 
  Info,
  ChevronRight,
  X,
  Copy,
  Check,
  MessageCircle,
  MessageSquare,
  Globe,
  Loader2,
  Bookmark,
  Download,
  LayoutGrid
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { QUESTIONS, CAT_TYPES, CatMBTI, CatTypeInfo, Question } from './constants';
import { SavedCat } from './types';

// Declare Monetag global functions
declare global {
  interface Window {
    show_10933787?: (options?: any) => Promise<any>;
  }
}

import { AnimatedNumber } from './components/AnimatedNumber';
import { ParticleEffect } from './components/ParticleEffect';
import { ShareCard } from './components/ShareCard';
import { CatDrawer } from './components/CatDrawer';

type ViewState = 'welcome' | 'quiz' | 'result';

export default function App() {
  const [view, setView] = useState<ViewState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // New State for Features
  const [totalCount, setTotalCount] = useState(10249);
  const [savedCats, setSavedCats] = useState<SavedCat[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [catNameInput, setCatNameInput] = useState('');
  const [viewingArchivedCat, setViewingArchivedCat] = useState<SavedCat | null>(null);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Monetag Ad Trigger
  const triggerInterstitialAd = async () => {
    if (typeof window.show_10933787 === 'function') {
      try {
        console.log("Triggering Monetag Interstitial...");
        // Use basic call for transition interstitial
        window.show_10933787();
      } catch (e) {
        console.error("Ad failed or was blocked", e);
      }
    }
  };

  const triggerRewardedAd = async () => {
    if (typeof window.show_10933787 === 'function') {
      setIsAdLoading(true);
      try {
        // Using 'pop' for direct rewarded experience as per snippets
        await window.show_10933787('pop');
        // If the promise resolves, it means the interaction was completed
        setIsUnlocked(true);
      } catch (e) {
        console.error("Rewarded ad error", e);
      } finally {
        setIsAdLoading(false);
      }
    } else {
      // Fallback if ad SDK not loaded correctly in sandbox
      setIsUnlocked(true);
    }
  };

  // Initialization & LocalStorage
  useEffect(() => {
    try {
      const storedCount = localStorage.getItem('cati_total_count');
      if (storedCount) setTotalCount(parseInt(storedCount));
      
      const storedCats = localStorage.getItem('cati_cats');
      if (storedCats) setSavedCats(JSON.parse(storedCats));
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  const incrementCount = () => {
    if (!sessionStorage.getItem('cati_counted')) {
      setTotalCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('cati_total_count', newCount.toString());
        return newCount;
      });
      sessionStorage.setItem('cati_counted', 'true');
    }
  };

  const handleStart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setView('quiz');
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    // Smooth transition to next question
    setTimeout(async () => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Before showing result, trigger Interstitial Ad
        await triggerInterstitialAd();
        
        setView('result');
        setIsCalculated(true);
        incrementCount();
        setIsUnlocked(false); // Reset unlock state for new result
      }
    }, 300);
  };

  const resultType = useMemo(() => {
    // Priority 1: If we are intentionally viewing a specific cat from archive
    if (viewingArchivedCat) {
      return CAT_TYPES[viewingArchivedCat.mbti];
    }

    // Priority 2: Current test results
    if (answers.length < QUESTIONS.length) return null;
    
    const counts: Record<string, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    answers.forEach((ansStr, qIdx) => {
      const question = QUESTIONS[qIdx];
      const val = parseInt(ansStr);
      // Likert Scoring Logic
      if (val === 0) counts[question.leftValue] += 2;
      else if (val === 1) counts[question.leftValue] += 1;
      else if (val === 3) counts[question.rightValue] += 1;
      else if (val === 4) counts[question.rightValue] += 2;
    });

    const mbti = [
      counts.E >= counts.I ? 'E' : 'I',
      counts.S >= counts.N ? 'S' : 'N',
      counts.T >= counts.F ? 'T' : 'F',
      counts.J >= counts.P ? 'J' : 'P'
    ].join('') as CatMBTI;

    return CAT_TYPES[mbti];
  }, [answers]);

  const handleReset = () => {
    setView('welcome');
    setIsCalculated(false);
    setViewingArchivedCat(null);
  };

  const handleSaveCat = () => {
    if (!resultType || !catNameInput.trim()) return;

    const newCat: SavedCat = {
      id: crypto.randomUUID(),
      name: catNameInput,
      mbti: resultType.id as CatMBTI,
      typeName: resultType.name,
      date: new Date().toISOString().split('T')[0],
      traits: resultType.traits
    };

    const newCats = [newCat, ...savedCats];
    setSavedCats(newCats);
    localStorage.setItem('cati_cats', JSON.stringify(newCats));
    setIsRecordModalOpen(false);
    setCatNameInput('');
  };

  const handleDeleteCat = (id: string) => {
    const filtered = savedCats.filter(c => c.id !== id);
    setSavedCats(filtered);
    localStorage.setItem('cati_cats', JSON.stringify(filtered));
  };

  const handleViewArchivedCat = (cat: SavedCat) => {
    setViewingArchivedCat(cat);
    setView('result');
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-orange-100">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative shadow-xl bg-white border-x border-gray-50">
        
        {/* Persistent Header for Drawer Access */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 hover:bg-orange-50 transition-colors"
          >
            <LayoutGrid size={20} className="text-orange-500" />
            <span className="text-xs font-black pr-1 inline-block">喵系档案</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <motion.div key="welcome" className="flex-1">
              <WelcomeView onStart={handleStart} totalCount={totalCount} />
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div key="quiz" className="flex-1">
              <QuizView 
                currentIndex={currentQuestionIndex}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {view === 'result' && resultType && (
            <motion.div key={resultType.id} className="flex-1">
              <ResultView 
                type={resultType}
                totalCount={totalCount}
                onReset={handleReset}
                onSave={() => setIsRecordModalOpen(true)}
                onShare={() => setIsShareModalOpen(true)}
                archivedName={viewingArchivedCat?.name}
                isUnlocked={isUnlocked}
                onTriggerReward={triggerRewardedAd}
                isAdLoading={isAdLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)}
          resultType={resultType}
        />

        <CatDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          cats={savedCats}
          onDelete={handleDeleteCat}
          onView={handleViewArchivedCat}
        />

        {/* Save Cat Modal */}
        <AnimatePresence>
          {isRecordModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsRecordModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-[40px] p-8 w-full max-w-sm shadow-2xl space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bookmark size={32} className="text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-black">保存记录</h3>
                  <p className="text-sm text-gray-400">为你的喵系人格起个昵称吧~</p>
                </div>

                <input 
                  autoFocus
                  type="text"
                  value={catNameInput}
                  onChange={(e) => setCatNameInput(e.target.value)}
                  placeholder="例如：小黄、咪咪..."
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-center text-lg"
                />

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsRecordModalOpen(false)}
                    className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveCat}
                    disabled={!catNameInput.trim()}
                    className="flex-[2] bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all disabled:opacity-50"
                  >
                    确定保存
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function WelcomeView({ onStart, totalCount }: { onStart: () => void, totalCount: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8">
      <div className="relative">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-orange-100 p-8 rounded-full"
        >
          <Cat size={100} className="text-orange-500" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-2 -right-2 bg-yellow-400 p-3 rounded-full shadow-lg"
        >
          <Star size={24} className="text-white fill-white" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">
          喵格测试 <span className="text-orange-500">CATI</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
          基于 MBTI 深度定制的喵系人格测试<br />
          寻找潜伏在你灵魂里的 16 种喵格
        </p>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={onStart}
          className="w-full bg-[#1A1A1A] text-white py-6 rounded-3xl flex items-center justify-center gap-3 text-2xl font-black hover:bg-orange-600 transition-all shadow-2xl active:scale-95"
        >
          立即开启 <ArrowRight size={24} />
        </button>
        <div className="flex flex-col items-center">
            <p className="text-xs text-gray-400 flex items-center gap-1 font-bold">
              目前已有 <span className="text-orange-500 font-black scale-110 px-1 inline-block"><AnimatedNumber value={totalCount} /></span> 位人类找回了喵系灵魂
            </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full pt-4">
        <div className="bg-orange-50 p-5 rounded-[32px] text-left border border-orange-100">
          <Heart className="text-orange-400 mb-2" size={24} />
          <h3 className="font-bold text-sm">灵魂共鸣</h3>
          <p className="text-[10px] text-gray-400">多维度剖析真实自我</p>
        </div>
        <div className="bg-blue-50 p-5 rounded-[32px] text-left border border-blue-100">
          <Zap className="text-blue-400 mb-2" size={24} />
          <h3 className="font-bold text-sm">专业模型</h3>
          <p className="text-[10px] text-gray-400">基于行为心理学</p>
        </div>
      </div>
    </div>
  );
}

function QuizView({ currentIndex, onAnswer }: { currentIndex: number, onAnswer: (val: string) => void }) {
  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    onAnswer(idx.toString());
    // Auto-next is handled by handleAnswer timeout in App
  };

  // Reset local state when question changes
  useEffect(() => {
    setSelectedIdx(null);
  }, [currentIndex]);

  const scaleSizes = ["w-12 h-12", "w-10 h-10", "w-9 h-9", "w-10 h-10", "w-12 h-12"];

  return (
    <div className="flex flex-col min-h-screen p-6 pt-20 space-y-12">
      {/* Dynamic Progress Bar */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-orange-400 tracking-[0.2em] uppercase">Test Progress</span>
            <h4 className="text-lg font-black">{currentIndex + 1} <span className="text-gray-300 font-bold text-sm">/ {QUESTIONS.length}</span></h4>
          </div>
          <span className="text-xs font-mono font-black text-orange-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center space-y-12 text-center">
        <motion.h2 
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black leading-tight text-[#1A1A1A] px-4"
        >
          {currentQuestion.text}
        </motion.h2>

        <div className="w-full space-y-10">
          <div className="flex justify-between text-xs font-bold text-gray-400 px-2 leading-relaxed">
            <p className="max-w-[40%] text-left">{currentQuestion.leftOption}</p>
            <p className="max-w-[40%] text-right">{currentQuestion.rightOption}</p>
          </div>

          <div className="flex items-center justify-between px-4">
            {scaleSizes.map((size, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelect(idx)}
                className={`
                  ${size} rounded-full border-2 transition-all flex items-center justify-center
                  ${selectedIdx === idx 
                    ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-100' 
                    : 'bg-white border-gray-200 hover:border-orange-300'
                  }
                `}
              >
                {selectedIdx === idx && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full rounded-full bg-orange-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="flex justify-between font-black text-sm tracking-tight pt-2">
            <span className="text-orange-500">← {currentQuestion.leftLabel}</span>
            <span className="text-pink-500">{currentQuestion.rightLabel} →</span>
          </div>
        </div>
      </div>

      <div className="py-6 text-center border-t border-gray-50 italic">
        <p className="text-xs text-gray-300">“ 选出最符合你真实反应的那一档 ”</p>
      </div>
    </div>
  );
}

function ResultView({ 
  type, 
  onReset, 
  onShare, 
  onSave, 
  totalCount, 
  archivedName,
  isUnlocked,
  onTriggerReward,
  isAdLoading
}: { 
  type: CatTypeInfo, 
  onReset: () => void, 
  onShare: () => void, 
  onSave: () => void, 
  totalCount: number, 
  archivedName?: string | null,
  isUnlocked: boolean,
  onTriggerReward: () => void,
  isAdLoading: boolean
}) {
  const [explosion, setExplosion] = useState(!archivedName); // Only explode on new result
  const [isSharing, setIsSharing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Blast effect duration
    const timer = setTimeout(() => setExplosion(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateShareCard = async () => {
    setIsSharing(true);
    // Give time for the hidden card to be in DOM if needed
    setTimeout(async () => {
      const element = document.getElementById('share-card');
      if (element) {
        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: null,
            logging: false,
            useCORS: true,
            allowTaint: true,
            ignoreElements: (el) => el.tagName === 'lazy', // Dummy ignore
          });
          const imgData = canvas.toDataURL('image/png');
          setPreviewImage(imgData);
        } catch (e) {
          console.error("Capture failed", e);
          alert("图片生成失败，请重试。错误原因可能是浏览器暂不支持某些现代CSS特性。");
        } finally {
          setIsSharing(false);
        }
      }
    }, 200);
  };

  const handleDownload = () => {
    if (!previewImage) return;
    const link = document.createElement('a');
    link.download = `我的喵系人格是${type.name}-喵格测试.png`;
    link.href = previewImage;
    link.click();
  };

  return (
    <div className="flex flex-col min-h-screen p-6 pt-10 space-y-6 pb-20 relative">
      {explosion && <ParticleEffect />}
      
      {/* Share Card to be captured */}
      <ShareCard 
        typeName={type.name}
        subTitle={type.title}
        traits={type.traits}
        description={type.description}
        id={type.id}
        portraitUrl={type.image}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-400 to-pink-500 text-white p-8 rounded-[40px] relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="bg-black/20 px-4 py-1 rounded-full text-[10px] font-black tracking-widest backdrop-blur-md">
              MBTI ANALYSIS 喵
            </span>
            <Cat size={24} className="text-white/80" />
          </div>

          <div className="space-y-6">
            <div className="w-full aspect-square bg-black/5 rounded-[32px] overflow-hidden relative shadow-inner border border-white/10">
                <motion.img 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={type.image} 
                  alt={type.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
            </div>

            <div className="space-y-1">
              <motion.h1 
                initial={{ filter: 'blur(20px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-black tracking-tighter"
              >
                {archivedName ? `${archivedName}是` : ''}{type.name}
              </motion.h1>
              <div className="flex items-center gap-3">
                <span className="text-6xl font-black text-white/20 leading-none">{type.id}</span>
                <p className="text-xl font-black text-white/90">{type.title}</p>
              </div>
            </div>
          </div>
          
          <div className="h-1 w-12 bg-white/30 rounded-full" />
          
          <p className="text-lg font-bold leading-relaxed italic border-l-4 border-white/20 pl-4">
            “ {type.description} ”
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xs font-black text-gray-400 tracking-widest uppercase">
            <Star size={14} className="fill-orange-500 text-orange-500" /> 性格标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {type.traits.map((trait, idx) => (
              <motion.span 
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.4 + idx * 0.1, damping: 12 }}
                className="px-5 py-2.5 bg-orange-50 text-orange-600 rounded-2xl font-black text-sm border border-orange-100 shadow-sm"
              >
                # {trait}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm space-y-4 relative overflow-hidden">
          <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-400 tracking-widest uppercase border-b border-gray-50 pb-4">
            <Info size={14} className="text-blue-500" /> 喵格相处指南
          </h3>
          
          <div className={!isUnlocked && !archivedName ? 'blur-md select-none pointer-events-none' : ''}>
            <p className="text-gray-600 text-sm leading-relaxed font-bold">
              {type.tips}
            </p>
          </div>

          {!isUnlocked && !archivedName && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] p-6 text-center">
              <div className="bg-white p-6 rounded-[24px] shadow-xl border border-orange-100 space-y-4 max-w-[240px]">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-500">
                  <Zap size={24} className="fill-orange-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-sm">解锁深度解析</h4>
                  <p className="text-[10px] text-gray-400 font-bold">观看 5 秒视频解锁完整《喵格指南》与《人宠兼容表》</p>
                </div>
                <button 
                  onClick={onTriggerReward}
                  disabled={isAdLoading}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl text-xs font-black shadow-lg shadow-orange-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isAdLoading ? <Loader2 size={16} className="animate-spin" /> : "立即解锁"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-orange-50/50 rounded-2xl border border-dashed border-orange-200 text-center">
            <p className="text-xs text-orange-400 font-bold flex items-center justify-center gap-1">
              已有 <span className="scale-110 px-0.5 inline-block"><AnimatedNumber value={totalCount} /></span> 位人类找回了喵系灵魂 🐾
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
             onClick={handleGenerateShareCard}
             disabled={isSharing}
             className="relative flex flex-col items-center justify-center p-6 bg-white border-2 border-orange-100 rounded-[32px] font-black hover:bg-orange-50 active:scale-95 transition-all shadow-sm animate-pulse-glow"
          >
            {isSharing ? <Loader2 size={24} className="animate-spin text-orange-400" /> : <div className="flex flex-col items-center">
               <Download size={24} className="text-orange-500 mb-1" />
               <span className="text-sm">生成分享卡</span>
            </div>}
          </button>
          
          <div className="grid grid-rows-2 gap-2">
            <button 
              onClick={onSave}
              className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 rounded-2xl font-black text-xs hover:bg-blue-100 transition-colors"
            >
              <Bookmark size={16} /> 保存档案
            </button>
            <button 
              onClick={onReset}
              className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white rounded-2xl font-black text-xs hover:bg-orange-600 transition-colors"
            >
              <RefreshCcw size={16} /> 重新测试
            </button>
          </div>
        </div>
      </div>

      {/* Share Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] p-6 w-full max-w-sm space-y-6"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-black">分享卡片预览</h4>
                <button onClick={() => setPreviewImage(null)}><X /></button>
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[375/500] shadow-xl border border-gray-200">
                <img src={previewImage} className="w-full h-full object-contain" />
              </div>
              <div className="space-y-3">
                <button 
                  onClick={handleDownload}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2"
                >
                  <Download size={20} /> 下载并分享
                </button>
                <p className="text-[10px] text-gray-400 text-center font-bold">小提示：长按图片也可直接保存到手机哦</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShareModal({ 
  isOpen, 
  onClose, 
  resultType 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  resultType: CatTypeInfo | null 
}) {
  const [copied, setCopied] = useState(false);
  const [showWechatTip, setShowWechatTip] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = resultType 
    ? `我的喵系人格竟然是【${resultType.name}】！太准了，快来看看你灵魂里住着哪只猫？` 
    : "寻找潜伏在你灵魂里的 16 种喵格 - 喵格测试 CATI";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareTitle} ${shareUrl}`);
      setCopied(true);
      setShowWechatTip(true);
      setTimeout(() => {
        setCopied(false);
        setShowWechatTip(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareLinks = [
    {
      name: '微信',
      icon: <MessageCircle className="text-green-500" />,
      color: 'bg-green-50',
      action: handleCopy 
    },
    {
      name: '微博',
      icon: <Globe className="text-red-500" />,
      color: 'bg-red-50',
      action: () => {
        window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`, '_blank');
      }
    },
    {
      name: 'QQ',
      icon: <MessageSquare className="text-blue-500" />,
      color: 'bg-blue-50',
      action: () => {
        window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent("基于 MBTI 设计的猫咪性格分析")}`, '_blank');
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-[#1A1A1A]">分享测试结果</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {shareLinks.map((platform, idx) => (
                <button
                  key={idx}
                  onClick={platform.action}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-16 h-16 ${platform.color} rounded-3xl flex items-center justify-center transition-all group-active:scale-95 shadow-sm border border-transparent group-hover:border-white/50`}>
                    {platform.icon}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 tracking-widest">{platform.name}</span>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {showWechatTip && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex gap-3 items-start">
                    <Info className="text-green-600 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                      <p className="text-sm font-black text-green-800">微信分享说明</p>
                      <p className="text-xs text-green-700 leading-relaxed font-bold">
                        由于微信外部浏览器限制，文案与链接已复制。请打开微信，在聊天框中<span className="font-black text-green-600 underline">直接粘贴</span>即可分享。
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 space-y-3 shadow-inner">
              <p className="text-[10px] font-black text-gray-300 tracking-widest uppercase">Direct Link</p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-gray-400 font-mono truncate">{shareUrl}</p>
                </div>
                <button 
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black active:scale-95 transition-all shadow-sm hover:border-orange-200 hover:text-orange-500"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied ? "已复制" : "复制链接"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
