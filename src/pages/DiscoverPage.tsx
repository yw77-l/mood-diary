import { useNavigate } from 'react-router-dom';
import { Newspaper, Languages, Wrench, ArrowRight } from 'lucide-react';

const cards = [
  {
    key: 'hot',
    icon: Newspaper,
    title: '每日热点',
    emoji: '🔥',
    desc: '今日话题、历史上的今天、冷知识，每天都有新发现',
    color: 'from-orange-50 to-rose-50',
    iconColor: 'text-orange-400',
    active: true,
  },
  {
    key: 'language',
    icon: Languages,
    title: '每日外语',
    emoji: '🌐',
    desc: '每天学一句外语（葡语/英语），积少成多',
    color: 'from-sky-50 to-indigo-50',
    iconColor: 'text-sky-400',
    active: false,
  },
];

export default function DiscoverPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      <h2 className="text-lg font-bold text-text-main text-center mb-2">发现更多</h2>
      <p className="text-xs text-text-sub text-center mb-5">每天都有新惊喜~</p>

      <div className="flex flex-col gap-4">
        {cards.map(({ key, icon: Icon, title, emoji, desc, color, iconColor, active }) => (
          <div
            key={key}
            onClick={() => active && navigate(`/${key}`)}
            className={`relative bg-gradient-to-br ${color} rounded-[32px] p-6 shadow-[0_8px_30px_rgb(255,182,193,0.1)] transition-all duration-200
              ${active ? 'cursor-pointer hover:shadow-[0_12px_35px_rgb(255,182,193,0.2)] hover:scale-[1.01]' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Icon className={`w-7 h-7 ${iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                  {title} <span className="text-xl">{emoji}</span>
                </h3>
                <p className="text-xs text-text-sub mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {active ? (
                <span className="text-xs text-pink-dark font-semibold flex items-center gap-1 cursor-pointer">
                  立即查看 <ArrowRight className="w-3 h-3" />
                </span>
              ) : (
                <>
                  <Wrench className="w-3.5 h-3.5 text-text-sub/40" />
                  <span className="text-[10px] text-text-sub/50 font-semibold">开发中，敬请期待</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-text-sub/30 text-xs">
        更多功能陆续添加中... ✨
      </div>
    </div>
  );
}
