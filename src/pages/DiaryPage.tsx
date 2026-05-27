import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Frown } from 'lucide-react';
import { format } from 'date-fns';
import MoodSelector from '../components/diary/MoodSelector';
import NoteEditor from '../components/diary/NoteEditor';
import ImagePicker from '../components/diary/ImagePicker';
import DiaryItem from '../components/diary/DiaryItem';
import { useDiary } from '../context/DiaryContext';
import type { MoodType } from '../types/diary';

function NewEntryCard() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const { addEntry } = useDiary();

  const handleSave = (note: string) => {
    if (!selectedMood) return;
    const entry = {
      id: nanoid(),
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: selectedMood,
      note,
      images,
      createdAt: Date.now(),
    };
    addEntry(entry);
    setSelectedMood(null);
    setImages([]);
  };

  return (
    <div className="bg-white rounded-[40px] p-6 shadow-[0_8px_30px_rgb(255,182,193,0.15)] mb-6">
      <h2 className="text-lg font-bold text-text-main text-center mb-4">
        今天心情怎么样？
      </h2>
      <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
      <ImagePicker images={images} onChange={setImages} />
      <NoteEditor disabled={!selectedMood} onSave={handleSave} />
    </div>
  );
}

function HistoryList() {
  const { entries, deleteEntry } = useDiary();

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-text-sub">
        <Frown className="w-16 h-16 text-pink-btn/50 mb-4" />
        <p className="text-sm">还没有记录哦，写下你的第一份心情吧~</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-bold text-pink-dark mb-3 px-1">📅 历史记录</h3>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <DiaryItem key={entry.id} entry={entry} onDelete={deleteEntry} />
        ))}
      </div>
    </div>
  );
}

export default function DiaryPage() {
  return (
    <div>
      <NewEntryCard />
      <HistoryList />
    </div>
  );
}
