import { Link, useNavigate } from 'react-router-dom';
import { Activity, Droplets, Flame, Footprints, Play, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const weightData = [
  { name: 'Mon', weight: 72 },
  { name: 'Tue', weight: 71.8 },
  { name: 'Wed', weight: 71.9 },
  { name: 'Thu', weight: 71.5 },
  { name: 'Fri', weight: 71.3 },
  { name: 'Sat', weight: 71.0 },
  { name: 'Sun', weight: 70.8 },
];

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('fitsphere_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      // First-time onboarding: redirect to profile setup
      navigate('/profile');
    }
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Good Morning, {profile?.name ? profile.name : '👋'}</h1>
          <p className="text-slate-600">Let's make today count.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Health Score</p>
          <div className="text-3xl font-bold text-primary flex items-baseline justify-end gap-1">
            82<span className="text-lg text-slate-400">/100</span>
          </div>
        </div>
      </div>

      {profile?.recommendation && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl"
        >
          <h3 className="text-emerald-800 font-bold mb-2">Daily Recommendation</h3>
          <p className="text-emerald-700">{profile.recommendation}</p>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-3 text-orange-500">
            <Flame size={20} />
            <h3 className="font-semibold text-slate-700">Calories</h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold">1,420</span>
            <span className="text-slate-400 font-medium mb-1">/ {profile?.dailyCalories ? profile.dailyCalories : (profile?.tdee ? Math.round(profile.tdee) : '2000')}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '71%' }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-3 text-red-500">
            <Activity size={20} />
            <h3 className="font-semibold text-slate-700">Protein</h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold">82g</span>
            <span className="text-slate-400 font-medium mb-1">/ {profile?.proteinGoal ? profile.proteinGoal : '120'}g</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-3 text-blue-500">
            <Droplets size={20} />
            <h3 className="font-semibold text-slate-700">Water</h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold">1.8L</span>
            <span className="text-slate-400 font-medium mb-1">/ 2.5L</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-3 text-emerald-500">
            <Footprints size={20} />
            <h3 className="font-semibold text-slate-700">Steps</h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold">6,420</span>
            <span className="text-slate-400 font-medium mb-1">/ 8,000</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        <div className="md:col-span-2 bg-secondary text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity size={120} />
          </div>
          <h2 className="text-xl font-medium text-slate-300 mb-2">Today's Workout</h2>
          <h3 className="text-4xl font-bold mb-4">Upper Body</h3>
          <p className="text-slate-400 mb-8 flex items-center gap-2">
            45 minutes • {profile?.experience || 'Intermediate'}
          </p>
          <div>
            <Link to="/workout" className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-emerald-600 transition-colors">
              <Play fill="currentColor" size={18} />
              Start Workout
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Habits</h3>
            <Link to="/habits" className="text-primary text-sm font-medium flex items-center hover:underline">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="flex flex-col gap-4 flex-grow justify-center">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-primary" size={24} />
              <span className="font-medium">Workout</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-primary" size={24} />
              <span className="font-medium">Water</span>
            </div>
            <div className="flex items-center gap-3">
              <Circle className="text-slate-300" size={24} />
              <span className="font-medium text-slate-600">8h Sleep</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-primary" size={24} />
              <span className="font-medium">Protein</span>
            </div>
            <div className="flex items-center gap-3">
              <Circle className="text-slate-300" size={24} />
              <span className="font-medium text-slate-600">8k Steps</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
      >
        <h3 className="font-bold text-lg mb-6">Weekly Weight</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  )
}
