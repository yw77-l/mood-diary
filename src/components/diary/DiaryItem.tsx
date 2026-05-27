import { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { MOODS, type DiaryEntry } from '../../types/diary';
import ConfirmModal from './ConfirmModal';

interface Props {
  entry: DiaryEntry;
  onDelete: (id: string) => void;
}

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt=""
        className="max-w-full max-h-[90vh] rounded-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function DiaryItem({ entry, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const mood = MOODS.find((m) => m.type === entry.mood);
  const date = new Date(entry.date);
  const today = isToday(date);
  const hasImages = entry.images && entry.images.length > 0;

  return (
    <>
      <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgb(255,182,193,0.1)] relative group">
        {today && (
          <span className="absolute -top-2 left-6 bg-pink-dark text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm">
            今天
          </span>
        )}
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">{mood?.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-text-main">
                {format(date, 'M月d日 EEEE', { locale: zhCN })}
              </span>
              <span className="text-xs text-pink-btn font-semibold">{mood?.label}</span>
            </div>
            {entry.note && (
              <p className="text-sm text-text-main leading-relaxed break-words">{entry.note}</p>
            )}

            {/* 图片网格 */}
            {hasImages && (
              <div className={`grid gap-1.5 mt-2 ${entry.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {entry.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxSrc(src)}
                    className={`rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity
                      ${entry.images.length === 1 ? 'aspect-[16/10]' : 'aspect-square'}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-pink-border/60 hover:text-pink-dark transition-colors cursor-pointer flex-shrink-0 opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          onDelete(entry.id);
          setShowConfirm(false);
        }}
      />

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}
