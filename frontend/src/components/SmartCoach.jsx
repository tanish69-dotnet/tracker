import React from 'react';
import { Lightbulb, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SmartCoach = ({ macros, calories, goal }) => {
    const getSuggestions = () => {
        const suggestions = [];
        const { protein, carbs, fat } = macros;

        if (calories === 0) return [{ 
            type: 'info', 
            text: "Log your first meal to activate Smart Insights.",
            icon: <Info size={18} />
        }];

        const proteinCal = protein * 4;
        const proteinPct = calories > 0 ? (proteinCal / calories) : 0;

        if (proteinPct < 0.15) {
            suggestions.push({ 
                type: 'warning', 
                text: "Protein intake is below optimal. Consider adding lean meats or legumes.",
                icon: <AlertTriangle size={18} />
            });
        } else if (proteinPct > 0.40) {
            suggestions.push({ 
                type: 'info', 
                text: "High protein intake detected. Maintain hydration for kidney health.",
                icon: <Info size={18} />
            });
        }

        const carbCal = carbs * 4;
        const carbPct = calories > 0 ? (carbCal / calories) : 0;

        if (carbPct > 0.60) {
            suggestions.push({ 
                type: 'warning', 
                text: "High carb spikes detected. Fiber-rich foods can help stabilize energy.",
                icon: <AlertTriangle size={18} />
            });
        }

        if (calories > goal) {
            suggestions.push({ 
                type: 'error', 
                text: "Daily limit exceeded. Opt for low-density snacks for the remainder of the day.",
                icon: <XCircle size={18} />
            });
        } else if (calories > goal * 0.9) {
            suggestions.push({ 
                type: 'warning', 
                text: "Approaching threshold. Plan your next meal with high-volume, low-calorie options.",
                icon: <AlertTriangle size={18} />
            });
        }

        if (suggestions.length === 0) {
            return [{ 
                type: 'success', 
                text: "Perfectly balanced. You're hitting your metabolic targets with precision.",
                icon: <CheckCircle2 size={18} />
            }];
        }

        return suggestions;
    };

    const suggestions = getSuggestions();

    return (
        <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/10">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                        <Lightbulb size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-none">SmartCoach</h3>
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mt-1.5">Real-time Analysis</p>
                    </div>
                </div>
                <div className="text-[10px] font-black px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20 tracking-tighter uppercase">
                    v2.0 Active
                </div>
            </div>

            <div className="space-y-4">
                {suggestions.map((msg, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={clsx(
                            "flex items-start gap-4 p-5 rounded-3xl border transition-all duration-300",
                            msg.type === 'warning' ? 'bg-orange-500/5 border-orange-500/10 text-orange-700 dark:text-orange-300' :
                            msg.type === 'error' ? 'bg-rose-500/5 border-rose-500/10 text-rose-700 dark:text-rose-300' :
                            msg.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-300' :
                            'bg-indigo-500/5 border-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                        )}
                    >
                        <div className={clsx(
                            "p-2 rounded-xl shrink-0",
                            msg.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                            msg.type === 'error' ? 'bg-rose-500/10 text-rose-500' :
                            msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                            'bg-indigo-500/10 text-indigo-500'
                        )}>
                            {msg.icon}
                        </div>
                        <p className="text-sm font-bold leading-relaxed tracking-tight mt-1">{msg.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SmartCoach;

const clsx = (...classes) => classes.filter(Boolean).join(' ');
