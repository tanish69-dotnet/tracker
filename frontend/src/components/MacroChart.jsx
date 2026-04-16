import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MacroChart = ({ macros }) => {
    const data = [
        { name: 'Protein', value: macros.protein, color: '#6366f1' }, // Indigo
        { name: 'Carbs', value: macros.carbs, color: '#06b6d4' },   // Cyan
        { name: 'Fat', value: macros.fat, color: '#f43f5e' },     // Rose
    ];

    const total = macros.protein + macros.carbs + macros.fat;

    if (total === 0) {
        return (
            <div className="p-8 h-80 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-4 border border-white/10 shadow-inner">
                    <div className="w-10 h-10 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-full animate-spin-slow" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-black text-sm uppercase tracking-widest">Awaiting Macros</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[200px]">Log your nutrient breakdown to see the cosmic distribution.</p>
            </div>
        );
    }

    return (
        <div className="p-8 h-[22rem] flex flex-col">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Nutrient Balance
            </h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    className="filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)] hover:opacity-80 transition-opacity outline-none" 
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                                backdropFilter: 'blur(8px)',
                                borderRadius: '16px', 
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                                padding: '12px'
                            }}
                            itemStyle={{ fontWeight: '800', fontSize: '12px' }}
                        />
                        <Legend 
                            verticalAlign="bottom" 
                            align="center"
                            iconType="circle" 
                            formatter={(value) => <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter px-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MacroChart;
