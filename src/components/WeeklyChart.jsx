import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { format, subDays, startOfDay, parseISO } from 'date-fns';

const WeeklyChart = ({ foodLog, dailyGoal }) => {
    // Process data for last 7 days
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const dateStr = format(date, 'yyyy-MM-dd');

        // Sum calories for this date
        const totalCalories = foodLog
            .filter(item => item.date === dateStr)
            .reduce((sum, item) => sum + item.calories, 0);

        data.push({
            date: format(date, 'EEE'), // Mon, Tue, etc.
            fullDate: dateStr,
            calories: totalCalories,
            goal: dailyGoal
        });
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-80">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">Last 7 Days</h3>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        hide
                    // axisLine={false} 
                    // tickLine={false} 
                    // tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <ReferenceLine y={dailyGoal} stroke="#EF4444" strokeDasharray="3 3" />

                    <Bar
                        dataKey="calories"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyChart;
