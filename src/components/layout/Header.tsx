import { Cat } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function Header() {
  const today = format(new Date(), 'M月d日 EEEE', { locale: zhCN });

  return (
    <header className="text-center pt-6 pb-3 bg-gradient-to-b from-pink-bg via-pink-bg to-transparent">
      <div className="flex items-center justify-center gap-2">
        <Cat className="w-5 h-5 text-pink-btn" />
        <h1 className="text-xl font-bold text-pink-dark tracking-wide">MoodDiary</h1>
        <Cat className="w-5 h-5 text-pink-btn scale-x-[-1]" />
      </div>
      <p className="text-[11px] text-text-sub/60 mt-1">{today}</p>
    </header>
  );
}
