import { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, BookOpen, TrendingUp, Lightbulb } from 'lucide-react';
import { SENTENCES, LANGUAGES, type LangCode, type Sentence } from '../types/learn';

const HISTORY_KEY = 'mood-learn-history';

interface LearnRecord { id: string; learnedAt: string; }

function loadHistory(): LearnRecord[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function speak(text: string, lang: string, slow = false) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = slow ? 0.55 : 0.8;
  utter.pitch = 1;
  const voices = speechSynthesis.getVoices();
  const match = voices.find((v) => v.lang.startsWith(lang.split('-')[0]));
  if (match) utter.voice = match;
  speechSynthesis.speak(utter);
}

function getTodaySentence(lang: LangCode): Sentence {
  const filtered = SENTENCES.filter((s) => s.lang === lang);
  const seed = new Date().toDateString().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return filtered[seed % filtered.length];
}

export default function LearnPage() {
  const [lang, setLang] = useState<LangCode>('pt-BR');
  const [history, setHistory] = useState<LearnRecord[]>(loadHistory);
  const [speaking, setSpeaking] = useState('');
  const [todaySentence, setTodaySentence] = useState(() => getTodaySentence('pt-BR'));

  useEffect(() => { setTodaySentence(getTodaySentence(lang)); }, [lang]);

  const sentences = SENTENCES.filter((s) => s.lang === lang);
  const learnedIds = new Set(history.map((r) => r.id));
  const learned = history.filter((r) => sentences.some((s) => s.id === r.id));
  const todayLearned = learnedIds.has(todaySentence.id);

  const handleSpeak = (text: string, langCode: string, slow = false) => {
    setSpeaking(slow ? 'slow' : 'norm');
    speak(text, langCode, slow);
    setTimeout(() => setSpeaking(''), 2000);
  };

  const markAsLearned = (id: string) => {
    if (learnedIds.has(id)) return;
    const updated = [{ id, learnedAt: new Date().toLocaleString('zh-CN') }, ...history];
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      {/* 语言切换 - 简洁双按钮 */}
      <div className="flex gap-2 mb-5">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer
              ${lang === l.code
                ? 'bg-pink-btn text-white shadow-[0_4px_15px_rgb(255,182,193,0.3)]'
                : 'bg-white text-text-sub border border-pink-border hover:border-pink-btn'
              }`}
          >
            <span className="text-lg">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>

      {/* 今日一句 */}
      <div className="bg-white rounded-[40px] p-6 shadow-[0_8px_30px_rgb(255,182,193,0.15)] mb-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-pink-dark bg-pink-bg px-3 py-1 rounded-full">📖 今日一句</span>
          {todayLearned ? (
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 已学习
            </span>
          ) : (
            <button onClick={() => markAsLearned(todaySentence.id)} className="text-xs text-pink-btn font-semibold hover:text-pink-dark transition-colors cursor-pointer">+ 标记已学</button>
          )}
        </div>

        <p className="text-2xl font-bold text-text-main mb-1 leading-relaxed text-center">{todaySentence.text}</p>
        <p className="text-xs text-pink-btn/60 text-center mb-3 font-medium">[{todaySentence.reading}]</p>
        <p className="text-sm text-text-sub text-center mb-1">{todaySentence.translation}</p>

        <div className="flex items-start gap-1.5 bg-amber-50 rounded-xl p-2.5 mb-4">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-700 leading-relaxed">{todaySentence.note}</p>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={() => handleSpeak(todaySentence.text, todaySentence.lang)}
            disabled={speaking !== ''}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-btn text-white font-bold text-sm
              hover:bg-pink-dark active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_15px_rgb(255,182,193,0.3)] disabled:opacity-50"
          >
            <Volume2 className={`w-4 h-4 ${speaking === 'norm' ? 'animate-pulse' : ''}`} />
            听发音 🔊
          </button>
          <button
            onClick={() => handleSpeak(todaySentence.text, todaySentence.lang, true)}
            disabled={speaking !== ''}
            className="flex items-center gap-2 px-4 py-3 rounded-full border-2 border-pink-border text-text-sub text-sm font-semibold
              hover:bg-pink-bg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            🐢 慢速
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1 justify-center">
          {todaySentence.tags.map((t) => (
            <span key={t} className="text-[10px] bg-pink-bg text-pink-dark/70 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <BookOpen className="w-4 h-4 text-pink-btn mx-auto mb-1" />
          <div className="text-lg font-bold text-pink-dark">{learned.length}</div>
          <div className="text-[10px] text-text-sub">已学</div>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-400">{sentences.length}</div>
          <div className="text-[10px] text-text-sub">总句数</div>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <span className="text-2xl block mb-0.5">
            {learned.length === sentences.length ? '🎉' : learned.length > sentences.length / 2 ? '💪' : '🌱'}
          </span>
          <div className="text-[10px] text-text-sub">
            {learned.length === sentences.length ? '全掌握' : learned.length > 0 ? '加油' : '开始'}
          </div>
        </div>
      </div>

      {/* 全部句子 */}
      <h3 className="text-sm font-bold text-pink-dark mb-2 px-1">全部句子 · {sentences.length} 句</h3>
      <div className="flex flex-col gap-2.5 mb-6">
        {sentences.map((s) => {
          const isLearned = learnedIds.has(s.id);
          return (
            <div key={s.id} className={`bg-white rounded-2xl p-4 shadow-sm transition-all ${isLearned ? 'border-l-[3px] border-l-green-400' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-text-main">{s.text}</p>
                  <p className="text-[11px] text-pink-btn/60 mt-0.5 font-medium">[{s.reading}]</p>
                  <p className="text-sm text-text-sub mt-1">{s.translation}</p>
                  <p className="text-[10px] text-amber-600/80 mt-1 leading-relaxed">💡 {s.note}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {s.tags.map((t) => (<span key={t} className="text-[9px] bg-pink-bg text-pink-dark/60 px-1.5 py-0.5 rounded-full">{t}</span>))}
                    {isLearned && (<span className="text-[9px] bg-green-100 text-green-500 px-1.5 py-0.5 rounded-full font-semibold">✓ 已学</span>)}
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button onClick={() => handleSpeak(s.text, s.lang)} className="p-1.5 rounded-full hover:bg-pink-bg transition-colors cursor-pointer text-pink-btn" title="听发音">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {!isLearned && (
                    <button onClick={() => markAsLearned(s.id)} className="p-1.5 rounded-full hover:bg-green-50 transition-colors cursor-pointer text-text-sub/40 hover:text-green-400" title="标记已学">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
