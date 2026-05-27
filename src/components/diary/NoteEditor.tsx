import { useState, useRef, useEffect } from 'react';

interface Props {
  disabled: boolean;
  onSave: (note: string) => void;
}

export default function NoteEditor({ disabled, onSave }: Props) {
  const [text, setText] = useState('');
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text.trim());
    setText('');
  };

  return (
    <div className="mt-4">
      <textarea
        ref={taRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        maxLength={500}
        placeholder="今天发生了什么呀~ ✨"
        className="w-full rounded-3xl border-2 border-pink-border p-4 text-sm resize-none
          focus:outline-none focus:border-pink-btn transition-colors
          placeholder:text-pink-btn/40 text-text-main bg-pink-bg/30"
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-text-sub/60">{text.length}/500</span>
        <button
          onClick={handleSave}
          disabled={disabled || !text.trim()}
          className="px-8 py-2.5 rounded-full bg-pink-btn text-white font-semibold text-sm
            disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-pink-dark
            enabled:active:scale-[0.98] transition-all duration-200 shadow-[0_4px_15px_rgb(255,182,193,0.3)]"
        >
          保存心情 💕
        </button>
      </div>
      {disabled && (
        <p className="text-center text-pink-dark/60 text-xs mt-2">先选一个心情吧~</p>
      )}
    </div>
  );
}
