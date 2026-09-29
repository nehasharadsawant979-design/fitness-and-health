import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Dumbbell, Apple, LineChart, CheckSquare, BookOpen, User } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Home, desktop: true, mobile: true },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, desktop: true, mobile: false },
    { to: '/workout', label: 'Workout', icon: Dumbbell, desktop: true, mobile: true },
    { to: '/nutrition', label: 'Nutrition', icon: Apple, desktop: true, mobile: true },
    { to: '/calculators', label: 'Calculators', icon: LineChart, desktop: true, mobile: false },
    { to: '/progress', label: 'Progress', icon: LineChart, desktop: true, mobile: true },
    { to: '/habits', label: 'Habits', icon: CheckSquare, desktop: true, mobile: false },
    { to: '/learn', label: 'Learn', icon: BookOpen, desktop: true, mobile: false },
    { to: '/profile', label: 'Profile', icon: User, desktop: false, mobile: true },
  ];

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 items-center px-6 justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <Dumbbell size={18} />
          </div>
          FitSphere
        </Link>
        <div className="flex gap-1">
          {links.filter(l => l.desktop).map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors text-sm",
                  active ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-50 flex items-center justify-around px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {links.filter(l => l.mobile).map(link => {
          const Icon = link.icon;
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-16",
                active ? "text-primary" : "text-slate-500"
              )}
            >
              <Icon size={22} className={clsx(active && "text-primary")} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  );
}
