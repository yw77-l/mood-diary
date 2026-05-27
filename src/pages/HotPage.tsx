import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { History, MessageCircle, Sparkles } from 'lucide-react';
import { CONVERSATION_TOPICS, type HotEvent, type DailyTopic } from '../types/hot';

export default function HotPage() {
  const [events, setEvents] = useState<HotEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<DailyTopic | null>(null);

  useEffect(() => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.events?.length) {
          const shuffled = data.events.sort(() => Math.random() - 0.5);
          setEvents(shuffled.slice(0, 6));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    const seed = today.getDate() * today.getMonth();
    setTopic(CONVERSATION_TOPICS[seed % CONVERSATION_TOPICS.length]);
  }, []);

  const today = format(new Date(), 'M月d日 EEEE', { locale: zhCN });

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      {/* 日期 */}
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-text-main">每日热点</h2>
        <p className="text-xs text-text-sub mt-1">{today}</p>
      </div>

      {/* 今日话题卡片 */}
      {topic && (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(255,182,193,0.1)] mb-5 border border-pink-100/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-pink-btn/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-pink-dark" />
            </div>
            <span className="text-xs font-bold text-pink-dark bg-pink-btn/15 px-2 py-0.5 rounded-full">
              {topic.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-text-main mb-2">{topic.emoji} {topic.title}</h3>
          <p className="text-sm text-text-sub leading-relaxed">{topic.content}</p>
        </div>
      )}

      {/* 历史上的今天 */}
      <div className="bg-white rounded-[32px] p-5 shadow-sm mb-5">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-text-main">历史上的今天</h3>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-pink-bg/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-bold text-amber-400 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  {e.year}
                </span>
                <p className="text-sm text-text-sub leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-sub/50 text-center py-4">
            暂无历史数据，稍后再试~
          </p>
        )}
      </div>

      {/* 冷知识 */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-[32px] p-5 shadow-sm mb-6 border border-amber-100/50">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-text-main">今日冷知识</h3>
        </div>
        <div className="space-y-2">
          {[
            '打喷嚏时心脏会暂停一瞬间',
            '考拉指纹和人类的几乎一样',
            '香蕉其实是浆果，但草莓不是',
            '人的鼻子能记住超过5万种气味',
            '海獭睡觉时会手牵手以免漂散',
            '北极熊的皮肤其实是黑色的',
            '鸽子能分辨莫奈和毕加索的画',
            '月球正在以每年3.8厘米的速度远离地球',
          ].slice(
            (new Date().getDate() * 3 + new Date().getMonth() * 7) % 3,
          ).slice(0, 2).map((fact, i) => (
            <p key={i} className="text-xs text-text-sub leading-relaxed">
              💡 {fact}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
