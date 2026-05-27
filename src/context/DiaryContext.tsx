import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { DiaryEntry } from '../types/diary';
import { StorageService } from '../services/storage';

interface DiaryState {
  entries: DiaryEntry[];
}

type DiaryAction =
  | { type: 'LOAD'; payload: DiaryEntry[] }
  | { type: 'ADD'; payload: DiaryEntry }
  | { type: 'DELETE'; payload: string };

function reducer(state: DiaryState, action: DiaryAction): DiaryState {
  switch (action.type) {
    case 'LOAD':
      return { entries: action.payload };
    case 'ADD':
      return { entries: StorageService.add(action.payload) };
    case 'DELETE':
      return { entries: StorageService.remove(action.payload) };
    default:
      return state;
  }
}

const DiaryContext = createContext<{
  entries: DiaryEntry[];
  addEntry: (entry: DiaryEntry) => void;
  deleteEntry: (id: string) => void;
} | null>(null);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { entries: [] });

  useEffect(() => {
    dispatch({ type: 'LOAD', payload: StorageService.getAll() });
  }, []);

  const addEntry = (entry: DiaryEntry) => dispatch({ type: 'ADD', payload: entry });
  const deleteEntry = (id: string) => dispatch({ type: 'DELETE', payload: id });

  return (
    <DiaryContext.Provider value={{ entries: state.entries, addEntry, deleteEntry }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const ctx = useContext(DiaryContext);
  if (!ctx) throw new Error('useDiary must be used within DiaryProvider');
  return ctx;
}
