import { useState } from 'react';
import { Apple, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const foodDb = [
  { name: 'Roti (1 piece)', cals: 120, p: 3, c: 20, f: 2 },
  { name: 'Rice (1 bowl)', cals: 200, p: 4, c: 45, f: 0 },
  { name: 'Dal (1 bowl)', cals: 150, p: 9, c: 20, f: 4 },
  { name: 'Paneer (100g)', cals: 290, p: 18, c: 3, f: 23 },
  { name: 'Eggs (2 large)', cals: 156, p: 12, c: 1, f: 10 },
  { name: 'Chicken Breast (100g)', cals: 165, p: 31, c: 0, f: 3 },
  { name: 'Poha (1 bowl)', cals: 250, p: 5, c: 45, f: 8 },
  { name: 'Upma (1 bowl)', cals: 220, p: 4, c: 35, f: 7 },
  { name: 'Idli (2 pieces)', cals: 120, p: 4, c: 24, f: 0 },
  { name: 'Milk (1 glass)', cals: 150, p: 8, c: 12, f: 8 },
  { name: 'Curd (1 bowl)', cals: 100, p: 5, c: 7, f: 5 },
  { name: 'Banana (1 medium)', cals: 105, p: 1, c: 27, f: 0 },
];

export default function Nutrition() {
  const [meals, setMeals] = useState<any>({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  });
  
  const [activeMeal, setActiveMeal] = useState<string | null>(null);

  const addFood = (meal: string, food: any) => {
    setMeals({...meals, [meal]: [...meals[meal], food]});
    setActiveMeal(null);
  };

  const totalCals = Object.values(meals).flat().reduce((sum: number, f: any) => sum + f.cals, 0);
  const totalP = Object.values(meals).flat().reduce((sum: number, f: any) => sum + f.p, 0);
  const totalC = Object.values(meals).flat().reduce((sum: number, f: any) => sum + f.c, 0);
  const totalF = Object.values(meals).flat().reduce((sum: number, f: any) => sum + f.f, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3"><Apple className="text-primary"/> Nutrition & Meals</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium mb-1">Calories</p>
          <p className="text-2xl font-bold text-slate-800">{totalCals}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium mb-1">Protein</p>
          <p className="text-2xl font-bold text-red-500">{totalP}g</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium mb-1">Carbs</p>
          <p className="text-2xl font-bold text-blue-500">{totalC}g</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium mb-1">Fat</p>
          <p className="text-2xl font-bold text-orange-500">{totalF}g</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(meals).map((mealName, index) => (
          <motion.div 
            key={mealName} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-lg">{mealName}</h2>
              <button 
                onClick={() => setActiveMeal(mealName)}
                className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            {activeMeal === mealName && (
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-600 mb-3">Add food to {mealName}:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                  {foodDb.map(food => (
                    <button key={food.name} onClick={() => addFood(mealName, food)}
                      className="text-left p-3 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{food.name}</p>
                        <p className="text-xs text-slate-500">{food.cals} kcal • P:{food.p}g • C:{food.c}g • F:{food.f}g</p>
                      </div>
                      <Plus size={16} className="text-slate-400" />
                    </button>
                  ))}
                </div>
                <button onClick={() => setActiveMeal(null)} className="mt-3 text-sm font-medium text-slate-500">Cancel</button>
              </div>
            )}

            <div className="p-4">
              {meals[mealName].length === 0 ? (
                <p className="text-slate-400 text-sm italic">No foods logged yet.</p>
              ) : (
                <ul className="space-y-3">
                  {meals[mealName].map((food: any, idx: number) => (
                    <li key={idx} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{food.name}</span>
                      <span className="text-slate-500">{food.cals} kcal</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
