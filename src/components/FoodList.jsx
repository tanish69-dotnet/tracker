import React from 'react';
import FoodItem from './FoodItem';
import { UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FoodList = ({ items, onDelete }) => {
    if (items.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 dark:border-white/10"
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-indigo-50 dark:bg-indigo-950/30 mb-4 text-indigo-500 shadow-inner">
                    <UtensilsCrossed size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Clean Slate</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Fuel your body with something nutritious!</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4 px-2 py-2">
            <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <FoodItem item={item} onDelete={onDelete} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FoodList;
