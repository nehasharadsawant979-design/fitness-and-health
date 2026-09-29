import { useState } from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const initialHabits = [
  { id: 1, name: 'Drink 2.5L Water', completed: false, streak: 5 },
  { id: 2, name: '8 Hours Sleep', completed: true, streak: 2 },
  { id: 3, name: 'Workout (30 min)', completed: false, streak: 12 },
  { id: 4, name: 'Eat 120g Protein', completed: true, streak: 3 },
  { id: 5, name: '8k Steps', completed: false, streak: 0 },
  { id: 6, name: 'Stretch (10 min)', completed: false, streak: 1 },
];

export default function Habits() {
  const [habits, setHabits] = useState(initialHabits);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3"><CheckSquare className="text-primary"/> Daily Habits</h1>
        <button className="flex items-center gap-1 text-sm font-medium bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors">
          <Plus size={16} /> New Habit
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="space-y-4">
          {habits.map((habit, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={habit.id} 
              onClick={() => toggleHabit(habit.id)}
              className={clsx(
                "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all",
                habit.completed ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200 bg-white"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors",
                  habit.completed ? "bg-primary border-primary text-white" : "border-slate-300"
                )}>
                  {habit.completed && <CheckSquare size={16} className="fill-current stroke-none" />}
                </div>
                <span className={clsx("font-bold text-lg", habit.completed ? "text-slate-900" : "text-slate-600")}>
                  {habit.name}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-600">
                <span className="text-orange-500">🔥</span> {habit.streak}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
