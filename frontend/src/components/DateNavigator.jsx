import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addDays, subDays, isToday, isTomorrow } from 'date-fns';

const DateNavigator = ({ selectedDate, setSelectedDate }) => {
    const handlePrev = () => setSelectedDate(subDays(selectedDate, 1));
    const handleNext = () => setSelectedDate(addDays(selectedDate, 1));

    let label = format(selectedDate, 'MMMM d, yyyy');
    if (isToday(selectedDate)) label = 'Today';
    if (isTomorrow(selectedDate)) label = 'Tomorrow';
    if (isToday(addDays(selectedDate, 1))) label = 'Yesterday';

    return (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <button
                onClick={handlePrev}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-500" />
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{label}</span>
                {label !== format(selectedDate, 'MMM d, yyyy') && label !== 'Today' && label !== 'Tomorrow' && label !== 'Yesterday' && (
                    <span className="text-xs text-gray-400">({format(selectedDate, 'EEE')})</span>
                )}
            </div>

            <button
                onClick={handleNext}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                disabled={isTomorrow(selectedDate) && false} // Optional: disable future navigation
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default DateNavigator;
