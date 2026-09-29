import { LineChart as ChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const weightData = [
  { name: 'Week 1', weight: 75 },
  { name: 'Week 2', weight: 74.2 },
  { name: 'Week 3', weight: 73.8 },
  { name: 'Week 4', weight: 72.9 },
  { name: 'Week 5', weight: 72.1 },
  { name: 'Week 6', weight: 71.5 },
  { name: 'Week 7', weight: 70.8 },
];

export default function Progress() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3"><ChartIcon className="text-primary"/> Progress</h1>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Weight Tracker</h2>
          <button className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
            Log Weight
          </button>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <h3 className="font-bold text-lg mb-4 text-slate-700">Measurements</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Waist</span>
                <span className="font-bold">82 cm <span className="text-emerald-500 text-xs ml-1">↓ 2cm</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Chest</span>
                <span className="font-bold">101 cm <span className="text-emerald-500 text-xs ml-1">↑ 1cm</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Arms</span>
                <span className="font-bold">36 cm <span className="text-slate-400 text-xs ml-1">-</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary text-white p-6 rounded-2xl shadow-sm md:col-span-2 flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-xl mb-2">Consistency is Key</h3>
            <p className="text-slate-400 mb-4 max-w-sm">You've logged your workout for 12 days in a row! Keep up the great work.</p>
            <div className="text-3xl font-bold text-primary">12 <span className="text-lg text-slate-300 font-medium">Day Streak</span></div>
          </div>
          <div className="hidden sm:block">
            {/* simple streak visualization */}
            <div className="flex gap-2">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${i < 7 ? 'bg-primary text-white' : 'bg-white/10 text-slate-500'}`}>
                  {i < 7 ? '✓' : ''}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
