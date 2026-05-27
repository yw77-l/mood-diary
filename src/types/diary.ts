export type MoodType = 'happy' | 'calm' | 'sad' | 'anxious' | 'love' | 'tired';

export interface DiaryEntry {
  id: string;
  date: string;
  mood: MoodType;
  note: string;
  images: string[];
  createdAt: number;
}

export const MOODS: { type: MoodType; emoji: string; label: string }[] = [
  { type: 'happy', emoji: '😊', label: '开心' },
  { type: 'calm', emoji: '😌', label: '平静' },
  { type: 'sad', emoji: '😢', label: '难过' },
  { type: 'anxious', emoji: '😰', label: '焦虑' },
  { type: 'love', emoji: '🥰', label: '恋爱' },
  { type: 'tired', emoji: '😴', label: '疲惫' },
];
