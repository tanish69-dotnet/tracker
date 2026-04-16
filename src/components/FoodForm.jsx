import React, { useState } from 'react';
import { PlusCircle, Utensils, Zap, Beef, Wheat, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const FoodForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [category, setCategory] = useState('Breakfast');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Please enter a food name.');
            return;
        }
        if (!calories || Number(calories) <= 0) {
            setError('Calories must be a positive number.');
            return;
        }

        onAdd({
            name,
            calories: Number(calories),
            protein: Number(protein) || 0,
            carbs: Number(carbs) || 0,
            fat: Number(fat) || 0,
            category
        });

        setName('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFat('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <Utensils size={100} />
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <PlusCircle className="text-indigo-500" /> Log Intake
                </h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                    Fuel your progress
                </p>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-xs font-bold"
                    >
                        {error}
                    </motion.div>
                )}

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white font-bold placeholder-gray-400 dark:placeholder-gray-600 transition-all outline-none"
                            placeholder="Food Name (e.g. Avocado Toast)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative group/input">
                            <Zap size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 z-10" />
                            <input
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-orange-500/10 rounded-2xl pl-10 pr-5 py-4 text-gray-900 dark:text-white font-black placeholder-gray-400 dark:placeholder-gray-600 transition-all outline-none"
                                placeholder="Calories"
                            />
                        </div>

                        <div className="relative group/input">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white font-bold transition-all appearance-none cursor-pointer outline-none"
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="relative group/input">
                            <Beef size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 z-10" />
                            <input
                                type="number"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-rose-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-rose-500/10 rounded-xl pl-8 pr-3 py-3 text-sm font-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all outline-none"
                                placeholder="Prot (g)"
                            />
                        </div>
                        <div className="relative group/input">
                            <Wheat size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 z-10" />
                            <input
                                type="number"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-emerald-500/10 rounded-xl pl-8 pr-3 py-3 text-sm font-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all outline-none"
                                placeholder="Carb (g)"
                            />
                        </div>
                        <div className="relative group/input">
                            <Droplet size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 z-10" />
                            <input
                                type="number"
                                value={fat}
                                onChange={(e) => setFat(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-amber-500/10 rounded-xl pl-8 pr-3 py-3 text-sm font-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all outline-none"
                                placeholder="Fat (g)"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all text-sm uppercase tracking-widest mt-4"
                    >
                        Log Entry
                    </motion.button>
                </div>
            </div>
        </form>
    );
};

export default FoodForm;
