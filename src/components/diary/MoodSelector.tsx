import { MOODS, type MoodType } from '../../types/diary';

interface Props {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export default function MoodSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {MOODS.map(({ type, emoji, label }) => {
        const active = selected === type;
        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`flex flex-col items-center gap-0.5 w-[60px] rounded-2xl py-2.5 transition-all duration-200 cursor-pointer border-2
              ${active
                ? 'bg-pink-btn border-pink-dark scale-110 shadow-[0_4px_15px_rgb(255,133,162,0.3)] -translate-y-1'
                : 'bg-white border-pink-border/50 hover:border-pink-border hover:shadow-sm'
              }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className={`text-[10px] font-semibold ${active ? 'text-white' : 'text-text-sub'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
