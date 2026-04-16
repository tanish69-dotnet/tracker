import React from 'react';
import { Trash2, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const CATEGORY_STYLES = {
    Breakfast: 'from-orange-500/20 to-orange-600/20 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20',
    Lunch: 'from-indigo-500/20 to-indigo-600/20 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-500/20',
    Dinner: 'from-purple-500/20 to-purple-600/20 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/20',
    Snacks: 'from-emerald-500/20 to-emerald-600/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20',
};

const FoodItem = ({ item, onDelete }) => {
    return (
        <div className="group relative flex items-center justify-between p-5 bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-white/40 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center gap-5">
                <div className={clsx(
                    "w-16 h-16 rounded-[1.5rem] flex flex-col items-center justify-center border shadow-sm bg-gradient-to-br",
                    CATEGORY_STYLES[item.category] || "from-gray-500/20 to-gray-600/20 text-gray-600 border-gray-200"
                )}>
                    <span className="text-lg font-black leading-none">{item.calories}</span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70 mt-0.5">kcal</span>
                </div>
                
                <div>
                    <h4 className="font-black text-gray-900 dark:text-white text-lg tracking-tight mb-0.5">{item.name}</h4>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">{item.category}</span>
                        <div className="flex gap-2 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                            {item.protein > 0 && <span>P: {item.protein}g</span>}
                            {item.carbs > 0 && <span>C: {item.carbs}g</span>}
                            {item.fat > 0 && <span>F: {item.fat}g</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(item.id)}
                    className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-2xl transition-all"
                    aria-label="Delete item"
                >
                    <Trash2 size={20} />
                </motion.button>
            </div>
        </div>
    );
};

export default FoodItem;
