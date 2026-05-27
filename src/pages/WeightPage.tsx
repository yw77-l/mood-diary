import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Ruler, Trash2, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { type WeightEntry, type UserProfile, calcBmi } from '../types/weight';

const PROFILE_KEY = 'mood-weight-profile';
const HISTORY_KEY = 'mood-weight-history';

function loadProfile(): UserProfile | null {
  try { const raw = localStorage.getItem(PROFILE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function saveProfile(p: UserProfile) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }
function loadHistory(): WeightEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function saveHistory(entries: WeightEntry[]) { localStorage.setItem(HISTORY_KEY, JSON.stringify(entries)); }

export default function WeightPage() {
  const [profile, setProfile] = useState<UserProfile | null>(loadProfile);
  const [heightInput, setHeightInput] = useState('');
  const [showHeightEdit, setShowHeightEdit] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [records, setRecords] = useState<WeightEntry[]>(loadHistory);

  useEffect(() => {
    if (profile) setHeightInput(String(profile.height));
  }, [profile]);

  const sortedAsc = [...records].sort((a, b) => a.createdAt - b.createdAt);
  const sortedDesc = [...records].reverse();

  const bmi = profile && records.length > 0 ? calcBmi(sortedDesc[0].weight, profile.height) : null;

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayRecord = records.find((r) => r.date === todayStr);
  const lastRecord = sortedAsc[sortedAsc.length - 1];
  const prevRecord = sortedAsc.length >= 2 ? sortedAsc[sortedAsc.length - 2] : null;

  const trend = lastRecord && prevRecord
    ? lastRecord.weight > prevRecord.weight ? 'up' : lastRecord.weight < prevRecord.weight ? 'down' : 'same'
    : null;

  const handleSaveHeight = () => {
    const h = parseFloat(heightInput);
    if (!h || h < 100 || h > 250) return;
    saveProfile({ height: h });
    setProfile({ height: h });
    setShowHeightEdit(false);
  };

  const handleSaveWeight = () => {
    const w = parseFloat(weightInput);
    if (!w || w < 20 || w > 300 || !profile) return;
    let updated: WeightEntry[];
    if (todayRecord) {
      updated = records.map((r) => r.date === todayStr ? { ...r, weight: w } : r);
    } else {
      updated = [{ id: nanoid(), date: todayStr, weight: w, createdAt: Date.now() }, ...records];
    }
    setRecords(updated);
    saveHistory(updated);
    setWeightInput('');
  };

  const handleDelete = (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    saveHistory(updated);
  };

  // --- chart: 最近 14 条 ---
  const chartData = sortedAsc.slice(-14);
  const weights = chartData.map((r) => r.weight);
  const chartMin = weights.length > 0 ? Math.floor(Math.min(...weights) - 1) : 40;
  const chartMax = weights.length > 0 ? Math.ceil(Math.max(...weights) + 1) : 100;
  const chartRange = chartMax - chartMin || 1;

  // --- BMI bar ---
  const barMin = 14, barMax = 34;
  const bmiPct = bmi ? Math.min(100, Math.max(0, ((bmi.bmi - barMin) / (barMax - barMin)) * 100)) : 0;

  // --- height not set ---
  if (!profile) {
    return (
      <div className="animate-[fadeIn_0.4s_ease] flex flex-col items-center pt-20">
        <div className="bg-white rounded-[40px] p-8 shadow-[0_8px_30px_rgb(255,182,193,0.15)] text-center w-full">
          <Ruler className="w-14 h-14 text-pink-btn mx-auto mb-4" />
          <h2 className="text-lg font-bold text-text-main mb-2">先设置身高吧~ 📏</h2>
          <p className="text-xs text-text-sub mb-6">设置后就能计算 BMI 和健康体重范围啦</p>
          <div className="flex items-center gap-3 justify-center">
            <input
              type="number"
              value={heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              placeholder="170"
              min={100}
              max={250}
              className="w-24 text-center rounded-2xl border-2 border-pink-border p-3 text-lg font-bold
                focus:outline-none focus:border-pink-btn transition-colors text-text-main"
            />
            <span className="text-text-sub text-sm">cm</span>
          </div>
          <button
            onClick={handleSaveHeight}
            disabled={!heightInput || parseFloat(heightInput) < 100 || parseFloat(heightInput) > 250}
            className="mt-6 px-10 py-3 rounded-full bg-pink-btn text-white font-bold text-sm
              disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-pink-dark
              enabled:active:scale-[0.98] transition-all shadow-[0_4px_15px_rgb(255,182,193,0.3)]"
          >
            确认 ✓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      {/* 身高行 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowHeightEdit(!showHeightEdit)}
          className="flex items-center gap-1.5 text-sm text-text-sub hover:text-pink-dark transition-colors cursor-pointer"
        >
          <Ruler className="w-4 h-4" />
          <span>身高 {profile.height} cm</span>
          <span className="text-[10px] text-pink-btn/60">{showHeightEdit ? '收起' : '修改'}</span>
        </button>
      </div>

      {showHeightEdit && (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-3 justify-center animate-[fadeIn_0.2s_ease]">
          <input
            type="number"
            value={heightInput}
            onChange={(e) => setHeightInput(e.target.value)}
            className="w-20 text-center rounded-xl border-2 border-pink-border p-2 font-bold text-sm
              focus:outline-none focus:border-pink-btn text-text-main"
          />
          <span className="text-xs text-text-sub">cm</span>
          <button
            onClick={handleSaveHeight}
            className="px-4 py-2 rounded-full bg-pink-btn text-white text-xs font-bold
              hover:bg-pink-dark active:scale-[0.98] transition-all cursor-pointer"
          >
            确定
          </button>
        </div>
      )}

      {/* BMI 卡片 */}
      {bmi && (
        <div
          className="rounded-[40px] p-6 mb-5 shadow-[0_8px_30px_rgb(255,182,193,0.15)] text-center transition-colors duration-500"
          style={{ backgroundColor: bmi.bgColor }}
        >
          <span className="text-4xl block mb-2">{bmi.emoji}</span>
          <div className="text-4xl font-extrabold mb-1 tracking-tight" style={{ color: bmi.color }}>{bmi.bmi}</div>
          <span className="text-sm font-bold" style={{ color: bmi.color }}>{bmi.label}</span>

          <div className="mt-5 px-1">
            <div className="relative h-2.5 rounded-full bg-white/70 overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-[22.5%] bg-blue-300/50" />
                <div className="w-[27.5%] bg-green-300/50" />
                <div className="w-[20%] bg-yellow-300/50" />
                <div className="flex-1 bg-red-300/50" />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-all duration-500"
                style={{ left: `calc(${bmiPct}% - 7px)`, backgroundColor: bmi.color }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-text-sub/50 mt-1.5 px-0.5">
              <span>14</span>
              <span>18.5</span>
              <span>24</span>
              <span>28</span>
              <span>34</span>
            </div>
          </div>

          <p className="text-xs text-text-sub/80 mt-4">
            健康体重范围 <span className="font-bold text-green-600">{bmi.minIdeal} - {bmi.maxIdeal}</span> kg
          </p>
        </div>
      )}

      {/* 体重输入 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
        <h3 className="text-sm font-bold text-text-main mb-3 text-center">
          {todayRecord ? '更新今天体重' : '记录今天体重'}
        </h3>
        <div className="flex items-center gap-3 justify-center mb-3">
          <input
            type="number"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            placeholder={todayRecord ? String(todayRecord.weight) : '65.0'}
            step="0.1"
            min={20}
            max={300}
            className="w-28 text-center rounded-2xl border-2 border-pink-border p-3 text-lg font-bold
              focus:outline-none focus:border-pink-btn text-text-main"
          />
          <span className="text-text-sub text-sm">kg</span>
        </div>
        {lastRecord && !todayRecord && (
          <p className="text-center text-xs text-text-sub mb-3">
            上次：{format(new Date(lastRecord.date), 'M/d')} · {lastRecord.weight} kg
          </p>
        )}
        {trend && lastRecord && prevRecord && (
          <div className="flex items-center justify-center gap-1 text-xs mb-3">
            {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-red-400" /> :
             trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-green-400" /> :
             <Minus className="w-3.5 h-3.5 text-text-sub" />}
            <span className={trend === 'up' ? 'text-red-400 font-semibold' : trend === 'down' ? 'text-green-400 font-semibold' : 'text-text-sub'}>
              {trend === 'up' ? `↑ ${(lastRecord.weight - prevRecord.weight).toFixed(1)}` :
               trend === 'down' ? `↓ ${(prevRecord.weight - lastRecord.weight).toFixed(1)}` :
               '→ 持平'}
            </span>
          </div>
        )}
        <button
          onClick={handleSaveWeight}
          disabled={!weightInput || parseFloat(weightInput) < 20 || parseFloat(weightInput) > 300}
          className="w-full py-3 rounded-full bg-pink-btn text-white font-bold text-sm
            disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-pink-dark
            enabled:active:scale-[0.98] transition-all shadow-[0_4px_15px_rgb(255,182,193,0.3)]"
        >
          {todayRecord ? '更新体重 ⚖️' : '记录体重 ⚖️'}
        </button>
      </div>

      {/* 趋势图 */}
      {sortedAsc.length >= 2 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-text-main">📈 近期趋势</h3>
            <span className="text-[10px] text-text-sub/60">最近 {chartData.length} 天</span>
          </div>
          <div className="flex items-end gap-1 h-28 px-1">
            {chartData.map((r) => {
              const h = ((r.weight - chartMin) / chartRange) * 100;
              const isToday = r.date === todayStr;
              return (
                <div key={r.id} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end min-w-0">
                  <span className="text-[9px] text-text-sub font-semibold">{r.weight}</span>
                  <div
                    className={`w-full rounded-t-sm transition-all flex-shrink-0 ${isToday ? 'bg-pink-dark' : 'bg-pink-btn/40'}`}
                    style={{ height: `${Math.max(h, 3)}%` }}
                  />
                  <span className="text-[8px] text-text-sub/50 text-center leading-tight">
                    {format(new Date(r.date), 'M/d')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 历史 */}
      {sortedDesc.length > 0 ? (
        <div>
          <h3 className="text-sm font-bold text-pink-dark mb-2 px-1">📋 历史记录 ({sortedDesc.length} 天)</h3>
          <div className="flex flex-col gap-2 mb-6">
            {sortedDesc.map((r) => {
              const b = calcBmi(r.weight, profile.height);
              return (
                <div key={r.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 group">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.bmi}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-text-main block truncate">
                      {format(new Date(r.date), 'M月d日 EEEE', { locale: zhCN })}
                    </span>
                    <span className="text-xs text-text-sub">
                      {r.weight} kg · {b.emoji} {b.label}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-pink-border hover:text-pink-dark cursor-pointer transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-text-sub">
          <span className="text-4xl block mb-3">⚖️</span>
          <p className="text-sm">还没有记录，开始记录体重吧~</p>
        </div>
      )}
    </div>
  );
}
