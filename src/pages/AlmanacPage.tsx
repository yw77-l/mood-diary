import { useState, useEffect } from 'react';
import { getAlmanac, getLunarDate, type AlmanacData } from '../types/almanac';
import { Compass, Palette, Hash, AlertTriangle, Sparkles } from 'lucide-react';

export default function AlmanacPage() {
  const [almanac, setAlmanac] = useState<AlmanacData | null>(null);
  const [lunarDate, setLunarDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setAlmanac(getAlmanac(today));
    setLunarDate(getLunarDate(today));
  }, []);

  if (!almanac) return null;

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      {/* 顶部日期牌 */}
      <div className="bg-gradient-to-b from-red-50 via-amber-50 to-pink-bg rounded-[40px] p-6 shadow-[0_8px_30px_rgb(255,182,193,0.15)] mb-5 text-center border-2 border-red-100/50">
        <div className="text-xs text-amber-600/70 font-semibold mb-1">
          📜 每日黄历
        </div>
        <div className="text-2xl font-bold text-red-400 mb-1">
          {lunarDate}
        </div>
        <div className="text-xs text-text-sub">
          {almanac.solarDate}
        </div>
      </div>

      {/* 宜忌双栏 */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* 宜 */}
        <div className="bg-white rounded-[32px] p-5 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-2">
            <span className="text-xl">✅</span>
          </div>
          <h3 className="text-sm font-bold text-red-400 mb-3">宜</h3>
          <ul className="space-y-1.5">
            {almanac.yi.map((item) => (
              <li key={item} className="text-sm text-text-main font-semibold">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 忌 */}
        <div className="bg-white rounded-[32px] p-5 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-2">
            <span className="text-xl">🚫</span>
          </div>
          <h3 className="text-sm font-bold text-gray-400 mb-3">忌</h3>
          <ul className="space-y-1.5">
            {almanac.ji.map((item) => (
              <li key={item} className="text-sm text-text-sub font-semibold">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="bg-white rounded-[32px] p-5 shadow-sm mb-5">
        <h3 className="text-sm font-bold text-text-main mb-4 text-center">📋 今日详情</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-50 rounded-2xl p-3 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-text-sub">冲煞</div>
              <div className="text-xs font-bold text-text-main">{almanac.chong}</div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3 flex items-center gap-3">
            <Compass className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-text-sub">吉神方位</div>
              <div className="text-xs font-bold text-text-main">{almanac.luckyDirection}</div>
            </div>
          </div>
          <div className="bg-pink-50 rounded-2xl p-3 flex items-center gap-3">
            <Palette className="w-4 h-4 text-pink-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-text-sub">今日吉色</div>
              <div className="text-xs font-bold text-text-main">{almanac.luckyColor}</div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-3 flex items-center gap-3">
            <Hash className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-text-sub">幸运数字</div>
              <div className="text-xs font-bold text-text-main">{almanac.luckyNumber}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 今日小记 */}
      <div className="bg-gradient-to-r from-pink-50 to-amber-50 rounded-[32px] p-5 shadow-sm mb-6">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-500 mb-1">今日小记</h3>
            <p className="text-xs text-text-sub leading-relaxed">{almanac.dayNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
