import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const articles = [
  { title: "Nutrition Basics", category: "Nutrition", desc: "Understanding macros, calories, and building a balanced plate.", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1453&auto=format&fit=crop" },
  { title: "How to Build Muscle", category: "Training", desc: "The principles of progressive overload and recovery.", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" },
  { title: "Fat Loss Simplified", category: "Weight Loss", desc: "Why calorie deficit is key and how to maintain it sustainably.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop" },
  { title: "Importance of Sleep", category: "Recovery", desc: "How sleep affects muscle growth and fat loss.", image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=1470&auto=format&fit=crop" },
  { title: "Football Fitness", category: "Sports", desc: "Training for agility, stamina, and explosive power on the pitch.", image: "https://images.unsplash.com/photo-1518605368461-1ee12523b0d2?q=80&w=1470&auto=format&fit=crop" },
  { title: "Hydration Guide", category: "Health", desc: "How much water do you really need based on activity level.", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1470&auto=format&fit=crop" },
];

export default function Learn() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3"><BookOpen className="text-primary"/> Learn</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col"
          >
            <div className="h-48 bg-slate-200 w-full relative">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{article.category}</span>
              <h3 className="font-bold text-xl mb-2">{article.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{article.desc}</p>
              <div className="mt-auto pt-4 border-t border-slate-100 text-sm font-medium text-slate-500">
                5 min read
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
