import { useState, useRef, useEffect } from 'react';

interface SohbetGirdisiProps {
  gonderFn: (mesaj: string) => void;
  devreDisi: boolean;
}

export default function SohbetGirdisi({ gonderFn, devreDisi }: SohbetGirdisiProps) {
  const [deger, degerAyarla] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const yukseklikAyarla = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    yukseklikAyarla();
  }, [deger]);

  const gonder = () => {
    const temizlenmis = deger.trim();
    if (!temizlenmis || devreDisi) return;
    gonderFn(temizlenmis);
    degerAyarla('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const klavyeIsle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      gonder();
    }
  };

  return (
    <div className="bg-neutral-900 p-6 pb-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Main Input Container */}
          <div className="bg-neutral-800 rounded-2xl border border-neutral-700 focus-within:border-neutral-500 transition-all shadow-lg flex items-end">
            <textarea
              ref={textareaRef}
              value={deger}
              onChange={(e) => degerAyarla(e.target.value)}
              onKeyDown={klavyeIsle}
              placeholder="Taytech AI'a bir şey sorun..."
              disabled={devreDisi}
              rows={1}
              className="flex-1 resize-none bg-transparent px-5 py-4 text-neutral-100 text-base placeholder-neutral-500 focus:outline-none disabled:opacity-50 min-h-[56px]"
            />
            
            {/* Send Button */}
            <div className="p-2">
              <button
                onClick={gonder}
                disabled={!deger.trim() || devreDisi}
                className="p-3 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 disabled:opacity-20 disabled:cursor-not-allowed transition-all disabled:hover:bg-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-neutral-600">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono text-[10px]">Enter</kbd>
              <span>gönder</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono text-[10px]">Shift + Enter</kbd>
              <span>yeni satır</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
