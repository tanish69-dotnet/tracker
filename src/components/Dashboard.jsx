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
import { Flame, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-sans pb-20">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Flame size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">SmartTracker</h1>
                            <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                                <Flame size={12} fill="currentColor" />
                                <span>{streak} Day Streak</span>
                            </div>
                        </div>
                    </div>
                    <ThemeToggle theme={settings.theme} toggleTheme={toggleTheme} />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* Date & Goal Section */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <DateNavigator selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <GoalProgress total={dailyCalories} goal={settings.dailyGoal} />

                        {/* Smart Coach */}
                        <SmartCoach macros={dailyMacros} calories={dailyCalories} goal={settings.dailyGoal} />
                    </div>
                    <div className="lg:col-span-1">
                        <MacroChart macros={dailyMacros} />
                    </div>
                </section>

                {/* Charts & Stats */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WeeklyChart foodLog={foodLog} dailyGoal={settings.dailyGoal} />

                    <div className="flex flex-col gap-6">
                        {/* Quick Stats or Goal Editor could go here */}
                        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                            <h3 className="text-lg font-semibold mb-2">Set Your Goal</h3>
                            <p className="text-blue-100 text-sm mb-4">Adjust your daily calorie target to meet your fitness needs.</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="bg-white/20 border-transparent focus:bg-white/30 text-white placeholder-white focus:ring-0 rounded-lg w-full py-2 px-3"
                                    value={settings.dailyGoal}
                                    onChange={(e) => updateGoal(e.target.value)}
                                />
                                <span className="font-medium whitespace-nowrap">kcal</span>
                            </div>
                        </div>

                        {/* Add Food Form */}
                        <FoodForm onAdd={(item) => addFood(item, selectedDate)} />
                    </div>
                </section>

                {/* Food List Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Daily Log</h3>
                        {dailyFood.length > 0 && (
                            <button
                                onClick={handleClearDay}
                                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                                <Trash2 size={14} /> Clear All
                            </button>
                        )}
                    </div>

                    <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

                    <FoodList items={filteredFood} onDelete={deleteFood} />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
