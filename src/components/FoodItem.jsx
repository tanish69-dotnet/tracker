import React from 'react';
import { Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

const CATEGORY_COLORS = {
    Breakfast: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Lunch: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Dinner: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Snacks: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const FoodItem = ({ item, onDelete }) => {
    return (
        <div className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-50 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold", CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-600")}>
                    {item.calories}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{item.name}</h4>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.category}</span>
                </div>
            </div>

            <button
                onClick={() => onDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                aria-label="Delete item"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default FoodItem;
