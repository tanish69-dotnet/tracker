import React from 'react';
import { motion } from 'framer-motion';

const GoalProgress = ({ total, goal }) => {
    const percentage = Math.round((total / goal) * 100);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

    const isExceeded = total > goal;
    
    // Dynamic color based on progress
    const getColor = () => {
        if (percentage < 50) return '#6366f1'; // Indigo
        if (percentage < 85) return '#06b6d4'; // Cyan
        if (percentage < 100) return '#f59e0b'; // Amber
        return '#f43f5e'; // Rose
    };

    const currentColor = getColor();

    return (
        <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="relative group">
                <svg className="w-48 h-48 transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        className="stroke-gray-200 dark:stroke-gray-700 fill-none"
                        strokeWidth="12"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r={radius}
                        className="fill-none"
                        stroke={currentColor}
                        strokeWidth="12"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference }}
                    />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
                    <motion.span 
                        key={total}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black text-gray-900 dark:text-white"
                    >
                        {percentage}%
                    </motion.span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Consumed</span>
                </div>

                {/* Glow Effect */}
                <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-colors duration-1000"
                    style={{ backgroundColor: currentColor }}
                />
            </div>

            <div className="flex-1 space-y-4">
                <div className="space-y-1">
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">Fuel Status</p>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                        {total.toLocaleString()} <span className="text-lg text-gray-400 font-medium">/ {goal.toLocaleString()} kcal</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Remaining</p>
                        <p className={`text-xl font-black ${isExceeded ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {isExceeded ? 0 : (goal - total).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                        <p className="text-xl font-black text-indigo-500">
                            {isExceeded ? 'Overshot' : percentage > 80 ? 'Near Limit' : 'On Track'}
                        </p>
                    </div>
                </div>

                {isExceeded && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-bold flex items-center gap-2"
                    >
                        <span className="bg-rose-500 text-white p-1 rounded-full text-[8px]">!</span>
                        Energy threshold exceeded. Focus on hydration.
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GoalProgress;
