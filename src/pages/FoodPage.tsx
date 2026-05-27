import { useState, useCallback } from 'react';
import { Shuffle } from 'lucide-react';
import { DISHES, CATEGORIES, type FoodCategory, type Dish } from '../types/food';

const FOOD_CATS = CATEGORIES.filter((c) => c.key !== 'all');


const DECIDER = ['👦', '👧', '🐱'];
const STORAGE_KEY = 'mood-food-history';

interface FoodRecord {
  dish: Dish;
  decider: string;
  time: string;
}

function loadHistory(): FoodRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(records: FoodRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 20)));
}

export default function FoodPage() {
  const [category, setCategory] = useState<FoodCategory | 'all'>('all');
  const [rolling, setRolling] = useState(false);
  const [rollDish, setRollDish] = useState<Dish | null>(null);
  const [picked, setPicked] = useState<Dish | null>(null);
  const [decider, setDecider] = useState('');
  const [history, setHistory] = useState<FoodRecord[]>(loadHistory);
  const [pulseDecider, setPulseDecider] = useState(false);

  const filtered = category === 'all' ? DISHES : DISHES.filter((d) => d.category === category);

  const startRoll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setPicked(null);
    setDecider('');

    let count = 0;
    const total = 20;
    const interval = setInterval(() => {
      const random = DISHES[Math.floor(Math.random() * DISHES.length)];
      setRollDish(random);
      count++;
      if (count >= total) {
        clearInterval(interval);
        setRolling(false);
        setPicked(random);
        setRollDish(null);

        const d = DECIDER[Math.floor(Math.random() * DECIDER.length)];
        setDecider(d);
        setPulseDecider(true);
        setTimeout(() => setPulseDecider(false), 600);

        const record: FoodRecord = {
          dish: random,
          decider: d,
          time: new Date().toLocaleString('zh-CN'),
        };
        const updated = [record, ...history];
        setHistory(updated);
        saveHistory(updated);
      }
    }, 60);
  }, [rolling, history]);

  const pickDish = (dish: Dish) => {
    setPicked(dish);
    setRollDish(null);
    const d = DECIDER[Math.floor(Math.random() * DECIDER.length)];
    setDecider(d);
    setPulseDecider(true);
    setTimeout(() => setPulseDecider(false), 600);

    const record: FoodRecord = { dish, decider: d, time: new Date().toLocaleString('zh-CN') };
    const updated = [record, ...history];
    setHistory(updated);
    saveHistory(updated);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      {/* 随机转盘 */}
      <div className="bg-white rounded-[40px] p-6 shadow-[0_8px_30px_rgb(255,182,193,0.15)] mb-5 text-center">
        <h2 className="text-lg font-bold text-text-main mb-1">今天吃什么？</h2>
        <p className="text-xs text-text-sub mb-4">让命运来决定吧~</p>

        <div className="min-h-[100px] flex items-center justify-center mb-4">
          {rolling ? (
            <div className="text-2xl font-bold text-pink-dark animate-bounce">
              {rollDish?.emoji} {rollDish?.name}
            </div>
          ) : picked ? (
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-4xl">{picked.emoji}</span>
              <span className="text-xl font-bold text-pink-dark">{picked.name}</span>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {picked.tags.map((t) => (
                  <span key={t} className="text-[10px] bg-pink-bg text-pink-dark px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              {decider && (
                <span className={`text-xl mt-1 ${pulseDecider ? 'animate-bounce' : ''}`}>
                  今天 {decider} 决定！
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-pink-btn/25">
              <span className="text-5xl">🍽️</span>
              <span className="text-xs">点一下按钮试试手气~</span>
            </div>
          )}
        </div>

        <button
          onClick={startRoll}
          disabled={rolling}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-pink-btn text-white font-bold text-sm
            disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-pink-dark
            enabled:active:scale-[0.98] transition-all duration-200 shadow-[0_4px_15px_rgb(255,182,193,0.3)]"
        >
          <Shuffle className="w-4 h-4" />
          {rolling ? '旋转中...' : '随机转一转 🎰'}
        </button>
      </div>

      {/* 分类 Tab */}
      <div className="relative mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 category-scroll">
          <button
            onClick={() => setCategory('all')}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer
              ${category === 'all' ? 'bg-pink-btn text-white shadow-sm' : 'bg-white text-text-sub border border-pink-border'}`}
          >
            🔥 全部
          </button>
          {FOOD_CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1
                ${category === c.key ? 'bg-pink-btn text-white shadow-sm' : 'bg-white text-text-sub border border-pink-border'}`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-pink-bg to-transparent" />
      </div>

      {/* 菜单网格 */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {filtered.map((dish) => (
          <button
            key={dish.id}
            onClick={() => pickDish(dish)}
            className={`bg-white rounded-2xl p-3 text-center transition-all duration-200 cursor-pointer
              hover:shadow-[0_4px_15px_rgb(255,182,193,0.2)] hover:scale-[1.03]
              ${picked?.id === dish.id ? 'ring-2 ring-pink-dark shadow-[0_4px_15px_rgb(255,133,162,0.25)]' : 'shadow-sm'}`}
          >
            <span className="text-2xl block mb-1">{dish.emoji}</span>
            <span className="text-xs font-semibold text-text-main block truncate">{dish.name}</span>
            <div className="flex gap-1 justify-center mt-1 flex-wrap">
              {dish.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-[8px] bg-pink-bg text-pink-dark/70 px-1.5 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-text-sub">
          <span className="text-4xl block mb-2">🍳</span>
          <p className="text-sm">这个分类还没有菜品哦~</p>
        </div>
      )}

      {/* 选择历史 */}
      {history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-sm font-bold text-pink-dark">🕐 历史选择</h3>
            <button
              onClick={clearHistory}
              className="text-[10px] text-text-sub hover:text-pink-dark transition-colors cursor-pointer"
            >
              清空
            </button>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            {history.slice(0, 10).map((r, i) => (
              <div key={i} className="bg-white rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{r.dish.emoji}</span>
                <span className="text-sm font-semibold text-text-main flex-1 truncate">{r.dish.name}</span>
                <span className="text-[10px] text-text-sub/70 flex-shrink-0">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
