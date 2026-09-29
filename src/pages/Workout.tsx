import { useState } from 'react';
import { Search, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

const workouts = [
  { id: 1, name: 'Push-ups', muscle: 'Chest, Triceps', sets: 3, reps: '10-15', rest: '60s', difficulty: 'Beginner', equipment: 'None', goal: 'Muscle Gain' },
  { id: 2, name: 'Squats', muscle: 'Quads, Glutes', sets: 4, reps: '12-15', rest: '90s', difficulty: 'Beginner', equipment: 'None', goal: 'General Fitness' },
  { id: 3, name: 'Dumbbell Bench Press', muscle: 'Chest', sets: 3, reps: '8-10', rest: '90s', difficulty: 'Intermediate', equipment: 'Gym', goal: 'Muscle Gain' },
  { id: 4, name: 'Plank', muscle: 'Core', sets: 3, reps: '45-60s', rest: '45s', difficulty: 'Beginner', equipment: 'None', goal: 'Fat Loss' },
  { id: 5, name: 'Pull-ups', muscle: 'Back, Biceps', sets: 3, reps: '5-8', rest: '90s', difficulty: 'Intermediate', equipment: 'Gym', goal: 'Strength' },
  { id: 6, name: 'Burpees', muscle: 'Full Body', sets: 3, reps: '15', rest: '60s', difficulty: 'Intermediate', equipment: 'None', goal: 'Fat Loss' },
];

export default function Workout() {
  const [filter, setFilter] = useState({ goal: 'All', difficulty: 'All', equipment: 'All' });
  const [search, setSearch] = useState('');

  const filteredWorkouts = workouts.filter(w => {
    if (filter.goal !== 'All' && w.goal !== filter.goal) return false;
    if (filter.difficulty !== 'All' && w.difficulty !== filter.difficulty) return false;
    if (filter.equipment !== 'All' && w.equipment !== filter.equipment) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3"><Dumbbell className="text-primary"/> Workouts</h1>
      
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search exercises..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none"
            value={filter.goal} onChange={e => setFilter({...filter, goal: e.target.value})}>
            <option value="All">All Goals</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Strength">Strength</option>
            <option value="General Fitness">General Fitness</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none"
            value={filter.difficulty} onChange={e => setFilter({...filter, difficulty: e.target.value})}>
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none"
            value={filter.equipment} onChange={e => setFilter({...filter, equipment: e.target.value})}>
            <option value="All">Any Equipment</option>
            <option value="None">None</option>
            <option value="Home">Home</option>
            <option value="Gym">Gym</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout, index) => (
          <motion.div 
            key={workout.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{workout.name}</h3>
                <p className="text-primary text-sm font-medium">{workout.muscle}</p>
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wide">
                {workout.difficulty}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-6 mt-auto">
              <div className="bg-slate-50 p-2 rounded-xl text-center">
                <p className="text-xs text-slate-500 font-medium mb-1">Sets</p>
                <p className="font-bold text-slate-800">{workout.sets}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl text-center">
                <p className="text-xs text-slate-500 font-medium mb-1">Reps</p>
                <p className="font-bold text-slate-800">{workout.reps}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl text-center">
                <p className="text-xs text-slate-500 font-medium mb-1">Rest</p>
                <p className="font-bold text-slate-800">{workout.rest}</p>
              </div>
            </div>
            
            <button className="w-full py-3 bg-secondary text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
              View Instructions
            </button>
          </motion.div>
        ))}
      </div>
      {filteredWorkouts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p>No workouts found for these filters.</p>
        </div>
      )}
    </motion.div>
  )
}
