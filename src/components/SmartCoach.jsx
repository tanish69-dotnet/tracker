import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

const SmartCoach = ({ macros, calories, goal }) => {
    const getSuggestions = () => {
        const suggestions = [];
        const { protein, carbs, fat } = macros;

        // Safety check for empty data
        if (calories === 0) return [{ type: 'info', text: "Log your first meal to get smart suggestions!" }];

        // 1. Protein Analysis
        // Rough heuristic: should be ~30% of calories. 1g protein = 4 kcal.
        // So protein (g) * 4 / total calories.
        const proteinCal = protein * 4;
        const proteinPct = calories > 0 ? (proteinCal / calories) : 0;

        if (proteinPct < 0.15) {
            suggestions.push({ type: 'warning', text: "Your protein intake is low. Consider adding chicken, tofu, or greek yogurt." });
        } else if (proteinPct > 0.40) {
            suggestions.push({ type: 'info', text: "You're hitting high protein numbers! Great for muscle repair, but ensure you stay hydrated." });
        } else {
            suggestions.push({ type: 'success', text: "Protein intake is well-balanced." });
        }

        // 2. Carb Analysis
        const carbCal = carbs * 4;
        const carbPct = calories > 0 ? (carbCal / calories) : 0;

        if (carbPct > 0.60) {
            suggestions.push({ type: 'warning', text: "Carb heavy day! Watch out for sugar spikes. Maybe switch to complex carbs for dinner?" });
        }

        // 3. Calorie Analysis
        if (calories > goal) {
            suggestions.push({ type: 'error', text: "You've crossed your daily calorie limit. Try light snacks if you're still hungry." });
        } else if (calories > goal * 0.9) {
            suggestions.push({ type: 'warning', text: "You're close to your limit. Plan a light dinner." });
        } else if (calories < goal * 0.5 && new Date().getHours() > 18) {
            suggestions.push({ type: 'warning', text: "You're far below your goal. Don't skip meals!" });
        }

        // 4. Balanced Diet Reward
        if (suggestions.length === 0 || (suggestions.length === 1 && suggestions[0].type === 'success')) {
            return [{ type: 'success', text: "Your nutrition is spot on today! Keep up the great work. 🎉" }];
        }

        return suggestions;
    };

    const suggestions = getSuggestions();

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-800/50 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Lightbulb size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Smart Coach Insights</h3>
            </div>

            <div className="space-y-3">
                {suggestions.map((msg, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-xl border border-indigo-50 dark:border-indigo-500/10 shadow-sm">
                        <Info size={20} className={
                            msg.type === 'warning' ? 'text-orange-500' :
                                msg.type === 'error' ? 'text-red-500' :
                                    msg.type === 'success' ? 'text-green-500' : 'text-blue-500'
                        } />
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{msg.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmartCoach;
