import { NavLink } from 'react-router-dom';
import { BookOpen, Weight, ScrollText, UtensilsCrossed, Compass } from 'lucide-react';

const tabs = [
  { path: '/', label: '心情', Icon: BookOpen },
  { path: '/weight', label: '体重', Icon: Weight },
  { path: '/almanac', label: '黄历', Icon: ScrollText },
  { path: '/food', label: '点菜', Icon: UtensilsCrossed },
  { path: '/discover', label: '发现', Icon: Compass },
];

export default function TabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-lg border-t border-pink-border/50 z-40">
      <div className="max-w-[480px] mx-auto flex justify-around items-end py-1.5">
        {tabs.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-1 py-2 rounded-2xl transition-all duration-200
                ${isActive ? 'text-pink-dark bg-pink-btn/15' : 'text-text-sub hover:text-pink-btn'}`
            }
            style={{ width: '20%' }}
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="w-4.5 h-4.5 transition-all duration-200"
                  fill={isActive ? '#FF85A2' : 'none'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={`text-[9px] font-bold transition-all ${isActive ? 'scale-105' : ''}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
