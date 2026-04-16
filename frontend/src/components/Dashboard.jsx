import React, { useState, useMemo } from 'react';
import { useCalorieTracker } from '../hooks/useCalorieTracker';
import FoodForm from './FoodForm';
import FoodList from './FoodList';
import GoalProgress from './GoalProgress';
import WeeklyChart from './WeeklyChart';
import CategoryFilter from './CategoryFilter';
import DateNavigator from './DateNavigator';
import ThemeToggle from './ThemeToggle';
import MacroChart from './MacroChart';
import SmartCoach from './SmartCoach';
import { Flame, Trash2, LayoutDashboard, Calendar, BarChart3, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const {
        foodLog,
        settings,
        addFood,
        deleteFood,
        updateGoal,
        toggleTheme,
        getFoodForDate,
        getCaloriesForDate,
        getMacrosForDate,
        calculateStreak,
        clearHistory
    } = useCalorieTracker();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState('All');

    const dailyCalories = useMemo(() => getCaloriesForDate(selectedDate), [foodLog, selectedDate]);
    const dailyMacros = useMemo(() => getMacrosForDate(selectedDate), [foodLog, selectedDate]);
    const dailyFood = useMemo(() => getFoodForDate(selectedDate), [foodLog, selectedDate]);
    const streak = useMemo(() => calculateStreak(), [foodLog, settings.dailyGoal]);

    const filteredFood = useMemo(() => {
        if (selectedCategory === 'All') return dailyFood;
        return dailyFood.filter(item => item.category === selectedCategory);
    }, [dailyFood, selectedCategory]);

    const handleClearDay = () => {
        if (confirm("Are you sure you want to clear all entries for this day?")) {
            clearHistory(selectedDate);
        }
    };

    return (
        <div className="min-h-screen transition-colors duration-500">
            <div className="mesh-bg" />
            
            {/* Header */}
            <header className="sticky top-0 z-50 glass-header px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/20 animate-float">
                            <Flame size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-cyan-600 dark:from-white dark:via-indigo-400 dark:to-cyan-400 leading-tight">
                                SmartTracker
                            </h1>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <Flame size={14} fill="currentColor" />
                                </motion.div>
                                <span>{streak} Day Burn</span>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <ThemeToggle theme={settings.theme} toggleTheme={toggleTheme} />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Navigation & Progress */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <DateNavigator selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GoalProgress total={dailyCalories} goal={settings.dailyGoal} />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <SmartCoach macros={dailyMacros} calories={dailyCalories} goal={settings.dailyGoal} />
                        </motion.div>

                        {/* Food List Section */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    <LayoutDashboard className="text-indigo-500" /> Daily Log
                                </h3>
                                {dailyFood.length > 0 && (
                                    <button
                                        onClick={handleClearDay}
                                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        <Trash2 size={16} /> Clear Day
                                    </button>
                                )}
                            </div>

                            <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                            
                            <div className="glass-card p-2">
                                <FoodList items={filteredFood} onDelete={deleteFood} />
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Insights & Controls */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card overflow-hidden"
                        >
                            <MacroChart macros={dailyMacros} />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-indigo-600 dark:bg-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Settings size={120} />
                            </div>
                            <h3 className="text-xl font-black mb-2 flex items-center gap-2 relative z-10">
                                <BarChart3 /> Target Goal
                            </h3>
                            <p className="text-indigo-100 text-sm mb-6 relative z-10 font-medium">Define your daily peak performance.</p>
                            <div className="flex items-center gap-3 relative z-10">
                                <input
                                    type="number"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 focus:bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 rounded-2xl w-full py-4 px-6 text-2xl font-black outline-none transition-all"
                                    value={settings.dailyGoal}
                                    onChange={(e) => updateGoal(e.target.value)}
                                />
                                <span className="font-black text-xs uppercase tracking-tighter">kcal</span>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <FoodForm onAdd={(item) => addFood(item, selectedDate)} />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <WeeklyChart foodLog={foodLog} dailyGoal={settings.dailyGoal} />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
