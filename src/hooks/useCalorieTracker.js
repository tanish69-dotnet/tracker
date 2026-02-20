import { useState, useEffect } from 'react';
import { format, subDays, isSameDay, parseISO, differenceInCalendarDays } from 'date-fns';

const STORAGE_KEYS = {
    LOG: 'smart_calorie_tracker_log',
    SETTINGS: 'smart_calorie_tracker_settings',
};

const DEFAULT_SETTINGS = {
    dailyGoal: 2000,
    theme: 'light',
};

export function useCalorieTracker() {
    // Load Settings
    const [settings, setSettings] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    // Load Food Log
    const [foodLog, setFoodLog] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.LOG);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Persist Settings
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        // Apply theme
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings]);

    // Persist Log
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.LOG, JSON.stringify(foodLog));
    }, [foodLog]);

    // Actions
    const addFood = (item, date = new Date()) => {
        const newItem = {
            id: crypto.randomUUID(),
            name: item.name,
            calories: Number(item.calories),
            protein: Number(item.protein) || 0,
            carbs: Number(item.carbs) || 0,
            fat: Number(item.fat) || 0,
            category: item.category,
            date: format(date, 'yyyy-MM-dd'), // Store as YYYY-MM-DD
            timestamp: Date.now(),
        };
        setFoodLog(prev => [newItem, ...prev]);
    };

    const deleteFood = (id) => {
        setFoodLog(prev => prev.filter(item => item.id !== id));
    };

    const updateGoal = (goal) => {
        setSettings(prev => ({ ...prev, dailyGoal: Number(goal) }));
    };

    const toggleTheme = () => {
        setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
    };

    const clearHistory = (date) => {
        if (date) {
            // Clear specific date
            const dateStr = format(date, 'yyyy-MM-dd');
            setFoodLog(prev => prev.filter(item => item.date !== dateStr));
        } else {
            // Clear all
            setFoodLog([]);
        }
    };

    // Getters
    const getCaloriesForDate = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return foodLog
            .filter(item => item.date === dateStr)
            .reduce((sum, item) => sum + item.calories, 0);
    };

    const getMacrosForDate = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return foodLog
            .filter(item => item.date === dateStr)
            .reduce((acc, item) => ({
                protein: acc.protein + (item.protein || 0),
                carbs: acc.carbs + (item.carbs || 0),
                fat: acc.fat + (item.fat || 0)
            }), { protein: 0, carbs: 0, fat: 0 });
    };

    const getFoodForDate = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return foodLog.filter(item => item.date === dateStr);
    };

    const calculateStreak = () => {
        // Basic streak logic: Consecutive days where calories > 0 and calories <= goal + 100 (grace buffer)
        // This is computationally expensive for long history, but fine for local storage scale.
        // For simplicity, let's just count days where log exists and total > 0.
        // To match "stayed within goal": total <= goal.

        // 1. Group totals by date
        const totalsByDate = foodLog.reduce((acc, item) => {
            acc[item.date] = (acc[item.date] || 0) + item.calories;
            return acc;
        }, {});

        let streak = 0;
        const today = new Date();

        // Check up to 365 days back
        for (let i = 0; i < 365; i++) {
            const d = subDays(today, i);
            const dateStr = format(d, 'yyyy-MM-dd');
            const calories = totalsByDate[dateStr] || 0;

            // Logic: specific requirements says "reset streak if goal exceeded"
            // And "consecutive days user stayed within goal".
            // If calories == 0, is it a streak? Usually no, unless we count "fasting" as valid.
            // Let's assume user must log *something* to keep streak alive, 
            // OR simply "didn't exceed goal" which includes 0. 
            // But "0" usually means "didn't track".
            // Let's go with: Must have logged > 0 AND <= goal.

            if (calories > 0 && calories <= settings.dailyGoal) {
                streak++;
            } else if (i === 0 && calories === 0) {
                // If today is 0, we don't break streak yet (maybe just started day)
                continue;
            } else {
                break;
            }
        }
        return streak;
    };

    return {
        foodLog,
        settings,
        addFood,
        deleteFood,
        updateGoal,
        toggleTheme,
        clearHistory,
        getCaloriesForDate,
        getMacrosForDate,
        getFoodForDate,
        calculateStreak,
    };
}
