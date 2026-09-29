import { Link } from 'react-router-dom';
import { ArrowRight, Activity, TrendingUp, Apple, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative px-6 py-20 md:py-32 bg-secondary text-white flex-col flex items-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Fitness Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto mb-6 leading-tight">
            Build a <span className="text-primary">Healthier</span>,<br/> Stronger You.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">One simple platform to track workouts, nutrition, habits and progress. Start your fitness journey today without the overwhelming complexity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profile" className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
              Start Your Fitness Journey <ArrowRight size={20} />
            </Link>
            <Link to="/learn" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
              Explore Plans
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">The ultimate toolkit designed for beginners and athletes alike, putting all your fitness metrics in one place.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Activity, title: "Personalized Workouts", desc: "Plans tailored to your goals, experience, and available equipment." },
            { icon: TrendingUp, title: "Track Your Progress", desc: "Log weight, measurements, and workout streaks easily with interactive charts." },
            { icon: Apple, title: "Smart Nutrition", desc: "Calculate TDEE and track calories/macros with local food examples." },
            { icon: CheckCircle, title: "Healthy Daily Habits", desc: "Build consistency with our daily habit tracker for water, sleep, and steps." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Our Community</h2>
            <p className="text-xl text-slate-600">Join thousands building better habits.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", role: "College Student", text: "FitSphere made it so easy to start working out in my dorm. The habit tracker completely changed my routine." },
              { name: "Priya M.", role: "Beginner", text: "I love the Indian food examples in the nutrition section. Finally, a fitness app that understands my diet!" },
              { name: "Aman K.", role: "Amateur Athlete", text: "The clean dashboard and progress charts keep me motivated every single morning. Highly recommended." }
            ].map((test, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 mb-6 italic">"{test.text}"</p>
                <div>
                  <h4 className="font-bold">{test.name}</h4>
                  <p className="text-sm text-slate-500">{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="mt-auto py-12 bg-secondary text-slate-400 text-center px-6">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4 text-white text-lg font-bold">FitSphere</p>
          <p className="mb-6">© 2026 FitSphere. All rights reserved.</p>
          <p className="text-sm max-w-3xl mx-auto opacity-70">
            Information provided by FitSphere is for general educational and wellness purposes only. It is not medical advice, diagnosis, or treatment. Consult a qualified healthcare professional for medical concerns.
          </p>
        </div>
      </footer>
    </div>
  )
}
