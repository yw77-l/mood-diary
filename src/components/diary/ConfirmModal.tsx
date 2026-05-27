import { useEffect } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ open, onCancel, onConfirm }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-pink-bg/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-[32px] p-8 shadow-[0_12px_40px_rgb(255,182,193,0.25)] text-center w-full max-w-[280px] animate-[fadeIn_0.2s_ease]">
        <span className="text-3xl block mb-4">🥺</span>
        <p className="text-base font-semibold text-text-main mb-6">确定要删除这条心情吗？</p>
        <div className="flex gap-2.5 justify-center">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full border-2 border-pink-border text-text-sub font-semibold text-sm
              hover:bg-pink-bg transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-full bg-red-400 text-white font-semibold text-sm
              hover:bg-red-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
}
