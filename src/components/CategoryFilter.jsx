import React from 'react';
import { Filter } from 'lucide-react';
import { clsx } from 'clsx';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-4 items-center">
            <div className="p-2 text-gray-400">
                <Filter size={18} />
            </div>
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={clsx(
                        "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                        selectedCategory === cat
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
