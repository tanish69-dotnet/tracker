import React from 'react';
import FoodItem from './FoodItem';
import { UtensilsCrossed } from 'lucide-react';

const FoodList = ({ items, onDelete }) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 text-gray-400 dark:text-gray-500">
                    <UtensilsCrossed size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No food logged yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Start adding your meals for the day!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <FoodItem key={item.id} item={item} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default FoodList;
