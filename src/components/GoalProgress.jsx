import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const GoalProgress = ({ total, goal }) => {
    const percentage = Math.min(Math.round((total / goal) * 100), 100);
    const remaining = Math.max(goal - total, 0);
    const isExceeded = total > goal;

    let colorClass = 'bg-green-500';
    if (percentage > 75) colorClass = 'bg-orange-500';
    if (percentage >= 100) colorClass = 'bg-red-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Daily Goal</p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                        {total} <span className="text-lg text-gray-400 dark:text-gray-500 font-normal">/ {goal} kcal</span>
                    </h2>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
                    <p className={twMerge("text-2xl font-bold", remaining === 0 ? "text-red-500" : "text-gray-700 dark:text-gray-200")}>
                        {remaining}
                    </p>
                </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                    className={clsx("h-4 rounded-full transition-all duration-1000 ease-out", colorClass)}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span>0%</span>
                <span>{percentage}% Completed</span>
                <span>100%</span>
            </div>

            {isExceeded && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium text-center animate-pulse">
                    ⚠️ You've exceeded your daily goal!
                </div>
            )}
        </div>
    );
};

export default GoalProgress;
