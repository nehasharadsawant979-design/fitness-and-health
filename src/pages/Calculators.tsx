import { useState } from 'react';
import { LineChart as ChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calculators() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2');

  const h = parseFloat(height) / 100; // m
  const w = parseFloat(weight);
  const a = parseInt(age);

  let bmi = 0;
  let bmr = 0;
  let tdee = 0;

  if (w > 0 && h > 0) {
    bmi = w / (h * h);
  }

  if (w > 0 && h > 0 && a > 0) {
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * (h * 100) - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * (h * 100) - 5 * a - 161;
    }
    tdee = bmr * parseFloat(activity);
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-3"><ChartIcon className="text-primary"/> Health Calculators</h1>
      <p className="text-slate-500 mb-8">Calculate your BMI, BMR, and daily calorie needs.</p>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-yellow-50 text-yellow-800 p-4 rounded-xl mb-8 text-sm"
      >
        <span className="font-bold">Disclaimer:</span> Information provided by FitSphere is for general educational and wellness purposes only. It is not medical advice, diagnosis, or treatment. Consult a qualified healthcare professional for medical concerns.
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <h2 className="text-xl font-bold mb-6">Your Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={gender === 'male'} onChange={() => setGender('male')} className="text-primary focus:ring-primary" />
                  Male
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={gender === 'female'} onChange={() => setGender('female')} className="text-primary focus:ring-primary" />
                  Female
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 25"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 70"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Level</label>
              <select value={activity} onChange={e => setActivity(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option value="1.2">Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra active (very hard exercise, physical job)</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-1">BMI (Body Mass Index)</p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold">{bmi > 0 ? bmi.toFixed(1) : '--'}</span>
                {bmi > 0 && (
                  <span className={`text-sm font-medium px-2 py-1 rounded mb-1 ${
                    bmi < 18.5 ? 'bg-blue-500/20 text-blue-300' :
                    bmi < 25 ? 'bg-emerald-500/20 text-emerald-300' :
                    bmi < 30 ? 'bg-orange-500/20 text-orange-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-1">BMR (Basal Metabolic Rate)</p>
              <p className="text-3xl font-bold">{bmr > 0 ? Math.round(bmr) : '--'} <span className="text-lg text-slate-500 font-normal">kcal/day</span></p>
              <p className="text-xs text-slate-400 mt-1">Calories burned at rest.</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">TDEE (Maintenance Calories)</p>
              <p className="text-3xl font-bold text-primary">{tdee > 0 ? Math.round(tdee) : '--'} <span className="text-lg text-primary/70 font-normal">kcal/day</span></p>
              <p className="text-xs text-slate-400 mt-1">Calories needed to maintain current weight.</p>
            </div>
          </div>

          {tdee > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold mb-4">Goal Targets</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">Fat Loss (Mild)</span>
                  <span className="font-bold text-slate-900">{Math.round(tdee * 0.9)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="font-medium text-emerald-700">Maintain Weight</span>
                  <span className="font-bold text-emerald-900">{Math.round(tdee)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">Muscle Gain</span>
                  <span className="font-bold text-slate-900">{Math.round(tdee * 1.1)} kcal</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
