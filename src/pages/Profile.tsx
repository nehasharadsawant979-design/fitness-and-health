import { useState, useEffect } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'general',
    activity: '1.2',
    experience: 'beginner',
    equipment: 'none'
  });

  useEffect(() => {
    const saved = localStorage.getItem('fitsphere_profile');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    
    // Calculate basics
    const w = parseFloat(formData.weight) || 0;
    const h = parseFloat(formData.height) || 0;
    const a = parseInt(formData.age) || 0;
    let bmr = 0;
    
    if (w > 0 && h > 0 && a > 0) {
      if (formData.gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
    }
    
    const tdee = bmr * parseFloat(formData.activity);
    
    // Generate Recommendation
    let recommendation = "Focus on a balanced diet and regular exercise.";
    let dailyCalories = Math.round(tdee);
    let proteinGoal = Math.round(w * 2); // default 2g per kg
    
    if (formData.goal === 'fat_loss') {
      recommendation = "To lose fat, maintain a caloric deficit and focus on high-protein meals with resistance training.";
      dailyCalories -= 500;
    } else if (formData.goal === 'muscle') {
      recommendation = "To build muscle, eat in a slight caloric surplus, prioritize protein, and focus on progressive overload in your workouts.";
      dailyCalories += 300;
    } else if (formData.goal === 'strength') {
      recommendation = "For strength, eat at maintenance or a slight surplus. Focus on heavy compound lifts with adequate rest.";
    }
    
    const profileToSave = { ...formData, bmr, tdee, recommendation, dailyCalories, proteinGoal };
    localStorage.setItem('fitsphere_profile', JSON.stringify(profileToSave));
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <User size={40} />
        </motion.div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-slate-500">Tell us about yourself to personalize your experience.</p>
      </div>

      <motion.form 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        onSubmit={handleSave} 
        className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6"
      >
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
            <input required type="number" name="age" value={formData.age} onChange={handleChange} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Height (cm)</label>
            <input required type="number" name="height" value={formData.height} onChange={handleChange} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Weight (kg)</label>
            <input required type="number" name="weight" value={formData.weight} onChange={handleChange} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
            <div className="flex gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 border border-slate-200 p-3 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-primary/5 has-[:checked]:border-primary transition-colors">
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} className="hidden" />
                <span className={formData.gender === 'male' ? 'font-bold text-primary' : 'font-medium text-slate-600'}>Male</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 border border-slate-200 p-3 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-primary/5 has-[:checked]:border-primary transition-colors">
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} className="hidden" />
                <span className={formData.gender === 'female' ? 'font-bold text-primary' : 'font-medium text-slate-600'}>Female</span>
              </label>
            </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6">
          <h2 className="text-xl font-bold">Fitness Goals & Experience</h2>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Primary Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium">
              <option value="general">General Fitness</option>
              <option value="muscle">Muscle Gain</option>
              <option value="fat_loss">Fat Loss</option>
              <option value="strength">Strength</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Activity Level</label>
            <select name="activity" value={formData.activity} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium">
              <option value="1.2">Sedentary (desk job, no exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Very Active (6-7 days/week)</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Experience</label>
              <select name="experience" value={formData.experience} onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Equipment</label>
              <select name="equipment" value={formData.equipment} onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium">
                <option value="none">None (Bodyweight)</option>
                <option value="home">Home Equipment</option>
                <option value="gym">Full Gym</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full mt-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2">
          Save & Continue <ArrowRight size={20} />
        </button>
      </motion.form>
    </motion.div>
  )
}
