import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { compressImage } from '../../services/image';

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImagePicker({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maxReached = images.length >= 3;

  const handlePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remaining = 3 - images.length;
    const toProcess = Array.from(files).slice(0, remaining);

    try {
      const compressed = await Promise.all(toProcess.map(compressImage));
      onChange([...images, ...compressed]);
    } catch (err) {
      // silently ignore bad files
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (i: number) => {
    onChange(images.filter((_, idx) => idx !== i));
  };

  return (
    <div className="mt-3">
      {/* 已选预览 */}
      {images.length > 0 && (
        <div className="flex gap-2 mb-3">
          {images.map((src, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => remove(i)}
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/40 text-white flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 添加按钮 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handlePick}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={maxReached}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer
          ${maxReached
            ? 'bg-gray-100 text-text-sub/40 cursor-not-allowed'
            : 'bg-pink-bg text-pink-btn hover:bg-pink-btn/20 hover:text-pink-dark border border-dashed border-pink-btn/30'
          }`}
      >
        <ImagePlus className="w-3.5 h-3.5" />
        {maxReached ? '已满 3 张' : `添加照片 (${images.length}/3)`}
      </button>
    </div>
  );
}
