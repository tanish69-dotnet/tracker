import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MacroChart = ({ macros }) => {
    const data = [
        { name: 'Protein', value: macros.protein, color: '#3b82f6' }, // Blue
        { name: 'Carbs', value: macros.carbs, color: '#10b981' }, // Emerald
        { name: 'Fat', value: macros.fat, color: '#f59e0b' },   // Amber
    ];

    const total = macros.protein + macros.carbs + macros.fat;

    if (total === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-64 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">No macros logged</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Add food with Protein, Carbs, and Fat to see the breakdown.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-80 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Macro Distribution</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#374151' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MacroChart;
