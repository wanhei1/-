/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { QUESTIONS, CAT_TYPES, CatMBTI, CatTypeInfo } from './constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

type ViewState = 'welcome' | 'quiz' | 'result';

export default function App() {
  const [view, setView] = useState<ViewState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleStart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setView('quiz');
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setView('result');
      setIsCalculated(true);
    }
  };

  const resultType = useMemo(() => {
    if (answers.length < QUESTIONS.length) return null;
    
    const counts: Record<string, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    answers.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
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
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-orange-100">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <div key="welcome">
              <WelcomeView onStart={handleStart} />
            </div>
          )}

          {view === 'quiz' && (
            <div key="quiz">
              <QuizView 
                currentIndex={currentQuestionIndex}
                onAnswer={handleAnswer}
              />
            </div>
          )}

          {view === 'result' && resultType && (
            <div key={resultType.id}>
              <ResultView 
                type={resultType}
                onReset={handleReset}
                onShare={() => setIsShareModalOpen(true)}
              />
            </div>
          )}
        </AnimatePresence>

        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)}
          resultType={resultType}
        />
      </div>
    </div>
  );
}

function WelcomeView({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8"
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-orange-100 p-6 rounded-full"
        >
          <Cat size={80} className="text-orange-500" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-lg"
        >
          <Star size={20} className="text-white fill-white" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter text-[#1A1A1A]">
          喵格测试 <span className="text-orange-500">CATI</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
          基于 MBTI 设计的猫咪性格分析<br />
          发现你家猫主子的 16 种喵格
        </p>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={onStart}
          className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl flex items-center justify-center gap-2 text-xl font-bold hover:bg-orange-600 transition-colors shadow-2xl active:scale-95"
          id="btn-start"
        >
          开始测试 <ArrowRight size={20} />
        </button>
        <p className="text-xs text-gray-400">目前已有 10,249 位铲屎官参与</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full pt-8">
        <div className="bg-orange-50 p-4 rounded-2xl text-left border border-orange-100">
          <Heart className="text-orange-400 mb-2" size={24} />
          <h3 className="font-bold text-sm">深度解析</h3>
          <p className="text-xs text-gray-400">挖掘猫咪内心世界</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl text-left border border-blue-100">
          <Zap className="text-blue-400 mb-2" size={24} />
          <h3 className="font-bold text-sm">专业科学</h3>
          <p className="text-xs text-gray-400">基于行为心理学模型</p>
        </div>
      </div>
    </motion.div>
  );
}

function QuizView({ currentIndex, onAnswer }: { currentIndex: number, onAnswer: (val: string) => void }) {
  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col p-6 pt-12 space-y-8"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-sm font-black text-orange-500 tracking-widest">QUESTION {currentIndex + 1}/12</span>
          <span className="text-xs font-bold text-gray-300">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-orange-500"
          />
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <h2 className="text-2xl font-bold leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(option.value)}
              className="w-full p-6 text-left bg-white border-2 border-gray-100 rounded-3xl hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center justify-between group shadow-sm"
            >
              <span className="text-lg font-medium pr-4">{option.text}</span>
              <ChevronRight className="text-gray-300 group-hover:text-orange-500 transition-colors shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="py-4 text-center">
        <p className="text-xs text-gray-400 italic">“ 选出最符合你家猫主子日常行为的一项 ”</p>
      </div>
    </motion.div>
  );
}

function ResultView({ type, onReset, onShare }: { type: CatTypeInfo, onReset: () => void, onShare: () => void }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const generateImage = async () => {
      try {
        setIsGenerating(true);
        setError(false);
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `A high-quality, cute, and artistic illustration of a cat personality: ${type.imagePrompt}. Focus on the personality traits: ${type.traits.join(', ')}. Minimalist background, vibrant colors, Pixar-style animation render.` }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1"
            }
          }
        });

        if (!active) return;

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setImageUrl(`data:image/png;base64,${base64Data}`);
            setIsGenerating(false);
            return;
          }
        }
        
        throw new Error("No image data found");
      } catch (err) {
        console.error("Image generation failed", err);
        if (active) {
          setError(true);
          setIsGenerating(false);
        }
      }
    };

    generateImage();
    return () => { active = false; };
  }, [type]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col p-6 pt-10 space-y-6 pb-20"
    >
      <div className="bg-orange-500 text-white p-8 rounded-[40px] relative overflow-hidden shadow-2xl">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-400 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600 rounded-full opacity-30 blur-3xl" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="bg-black/20 px-4 py-1 rounded-full text-xs font-bold tracking-widest backdrop-blur-md">
              RESULT CARD
            </span>
            <Cat size={24} className="text-white/80 hover:text-white transition-colors" />
          </div>

          <div className="space-y-4">
            {/* Image Placeholder/Result */}
            <div className="w-full aspect-square bg-orange-400/30 rounded-3xl overflow-hidden relative shadow-inner border border-white/10 group">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-orange-600/20 backdrop-blur-sm">
                  <Loader2 className="text-white animate-spin" size={40} />
                  <p className="text-xs font-bold text-white/70 tracking-widest animate-pulse">正在捕捉喵能...</p>
                </div>
              ) : imageUrl ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={imageUrl} 
                  alt={type.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-white/50">
                  <Cat size={48} className="opacity-20" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Image unavailable</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">{type.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-7xl font-black text-white/20 leading-none">{type.id}</span>
                <p className="text-xl font-bold">{type.title}</p>
              </div>
            </div>
          </div>
          
          <div className="h-[2px] w-12 bg-white/40" />
          
          <p className="text-lg font-medium leading-relaxed italic border-l-4 border-white/30 pl-4">
            “ {type.description} ”
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/50 p-4 rounded-[32px] border border-orange-100">
          <h3 className="flex items-center gap-2 text-sm font-bold text-orange-500/80 mb-4 tracking-widest uppercase">
            <Star size={16} className="fill-orange-500 text-orange-500" /> 性格关键词
          </h3>
          <div className="flex flex-wrap gap-2">
            {type.traits.map((trait, idx) => (
              <motion.span 
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="px-4 py-2 bg-white text-orange-600 rounded-xl font-bold text-sm border border-orange-200 shadow-sm"
              >
                # {trait}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-gray-400 tracking-widest uppercase border-b border-gray-50 pb-4">
            <Info size={16} className="text-blue-500" /> 喵格相处指南
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            {type.tips}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onShare}
            className="flex-1 flex items-center justify-center gap-2 p-5 bg-white border-2 border-gray-100 rounded-2xl font-bold hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <Share2 size={20} /> 分享测试
          </button>
          <button 
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 p-5 bg-[#1A1A1A] text-white rounded-2xl font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-lg"
          >
            <RefreshCcw size={20} /> 重新测试
          </button>
        </div>
      </div>
    </motion.div>
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
    ? `我家猫主子的喵格竟然是【${resultType.name}】！太准了，快来看看你家猫属于哪种喵格？` 
    : "发现你家猫主子的 16 种喵格 - 喵格测试 CATI";

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
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] p-8 pb-12 z-50 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-[#1A1A1A]">分享测试结果</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                id="close-share-modal"
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
                  <div className={`w-16 h-16 ${platform.color} rounded-2xl flex items-center justify-center transition-all group-active:scale-95 shadow-sm border border-transparent group-hover:border-white/50`}>
                    {platform.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-500 tracking-widest">{platform.name}</span>
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
                      <p className="text-sm font-bold text-green-800">微信分享说明</p>
                      <p className="text-xs text-green-700 leading-relaxed">
                        由于微信外部浏览器限制，分享文案与链接已复制到剪贴板。请打开微信，在聊天框中<span className="font-black">直接粘贴</span>即可分享给好友。
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
              <p className="text-[10px] font-black text-gray-300 tracking-widest uppercase">Direct Link</p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-gray-400 font-mono truncate">{shareUrl}</p>
                </div>
                <button 
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold active:scale-95 transition-all shadow-sm hover:border-orange-200 hover:text-orange-500"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied ? "已复制" : "复制链接"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
