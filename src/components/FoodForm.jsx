import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

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

        // Validation
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
            protein: Number(protein),
            carbs: Number(carbs),
            fat: Number(fat),
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
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Add Food Entry</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-12">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                        placeholder="Food Name (e.g. Oatmeal)"
                    />
                </div>

                <div className="md:col-span-3">
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                        placeholder="Calories"
                        min="1"
                    />
                </div>

                <div className="md:col-span-3">
                    <input
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                        placeholder="Protein (g)"
                        min="0"
                    />
                </div>

                <div className="md:col-span-3">
                    <input
                        type="number"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                        placeholder="Carbs (g)"
                        min="0"
                    />
                </div>

                <div className="md:col-span-3">
                    <input
                        type="number"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                        placeholder="Fat (g)"
                        min="0"
                    />
                </div>

                <div className="md:col-span-8">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white transition-all appearance-none cursor-pointer"
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <div className="md:col-span-4">
                    <button
                        type="submit"
                        className="w-full h-full min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-500/30"
                    >
                        <PlusCircle size={20} /> Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FoodForm;
