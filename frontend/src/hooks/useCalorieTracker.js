import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

const API_BASE_URL = '/api/food';
const STORAGE_KEYS = {
    SETTINGS: 'smart_calorie_tracker_settings',
};

const DEFAULT_SETTINGS = {
    dailyGoal: 2000,
    theme: 'light',
};

export function useCalorieTracker() {
    const [settings, setSettings] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    const [foodLog, setFoodLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial Fetch from MongoDB
    useEffect(() => {
        const fetchFood = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_BASE_URL);
                if (!response.ok) throw new Error('Failed to fetch food log');
                const data = await response.json();
                // Map MongoDB _id to frontend id for compatibility
                const mappedData = data.map(item => ({ ...item, id: item._id }));
                setFoodLog(mappedData);
            } catch (err) {
                console.error('Fetch Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
    }, []);

    // Persist Settings to LocalStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings]);

    // Actions
    const addFood = async (item, date = new Date()) => {
        const newItem = {
            name: item.name,
            calories: Number(item.calories),
            protein: Number(item.protein) || 0,
            carbs: Number(item.carbs) || 0,
            fat: Number(item.fat) || 0,
            category: item.category,
            date: format(date, 'yyyy-MM-dd'),
            timestamp: Date.now(),
        };

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) throw new Error('Failed to save entry');
            const savedItem = await response.json();
            setFoodLog(prev => [{ ...savedItem, id: savedItem._id }, ...prev]);
        } catch (err) {
            console.error('Add Error:', err);
            setError(err.message);
        }
    };

    const deleteFood = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete entry');
            setFoodLog(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error('Delete Error:', err);
            setError(err.message);
        }
    };

    const updateGoal = (goal) => {
        setSettings(prev => ({ ...prev, dailyGoal: Number(goal) }));
    };

    const toggleTheme = () => {
        setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
    };

    const clearHistory = async (date) => {
        // Warning: This would require a specific bulk delete endpoint on the backend.
        // For now, let's just clear the local state or inform user.
        console.warn('Bulk clear not implemented on backend yet.');
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
        const totalsByDate = foodLog.reduce((acc, item) => {
            acc[item.date] = (acc[item.date] || 0) + item.calories;
            return acc;
        }, {});

        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 365; i++) {
            const d = subDays(today, i);
            const dateStr = format(d, 'yyyy-MM-dd');
            const calories = totalsByDate[dateStr] || 0;

            if (calories > 0 && calories <= settings.dailyGoal) {
                streak++;
            } else if (i === 0 && calories === 0) {
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
        loading,
        error,
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
