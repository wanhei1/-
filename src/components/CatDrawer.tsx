import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ChevronRight, Cat } from 'lucide-react';
import { SavedCat } from '../types';

interface CatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cats: SavedCat[];
  onDelete: (id: string) => void;
  onView: (cat: SavedCat) => void;
}

export function CatDrawer({ isOpen, onClose, cats, onDelete, onView }: CatDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#FFFDF9] shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <Cat size={24} className="text-orange-500" />
                <h2 className="text-xl font-black">我的猫咪档案</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cats.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 p-8">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <Cat size={40} className="opacity-20" />
                  </div>
                  <p className="text-sm font-bold tracking-widest text-center">
                    暂无猫咪档案<br />
                    快去完成测试并保存吧 🐾
                  </p>
                </div>
              ) : (
                cats.map((cat) => (
                  <motion.div
                    key={cat.id}
                    layoutProps={{ id: cat.id }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          {cat.name}
                          <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-black uppercase">
                            {cat.mbti}
                          </span>
                        </h3>
                        <p className="text-xs text-gray-400 font-bold mt-1">{cat.date}</p>
                      </div>
                      <button 
                        onClick={() => onDelete(cat.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.traits.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-gray-50 flex gap-2">
                      <button 
                        onClick={() => onView(cat)}
                        className="flex-1 bg-orange-50 text-orange-600 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-orange-100 transition-colors"
                      >
                        再次查看详情 <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-100 italic text-center">
              <p className="text-[10px] text-gray-400">“ 用心记录 每一个陪伴的瞬间 ”</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
