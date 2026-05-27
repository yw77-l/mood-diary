import type { DiaryEntry } from '../types/diary';

const STORAGE_KEY = 'mood-diary-entries';

function getAll(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(entries: DiaryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function add(entry: DiaryEntry): DiaryEntry[] {
  const entries = [entry, ...getAll()];
  saveAll(entries);
  return entries;
}

function remove(id: string): DiaryEntry[] {
  const entries = getAll().filter((e) => e.id !== id);
  saveAll(entries);
  return entries;
}

export const StorageService = { getAll, saveAll, add, remove };
