import { useState, useRef, useEffect } from 'react';
import { temaKullan } from '../context/ThemeContext';
import { birlesik } from '../utils/cn';

interface SohbetGirdisiProps {
  gonderFn: (mesaj: string) => void;
  devreDisi: boolean;
  streamingMi?: boolean;
}

export default function SohbetGirdisi({ gonderFn, devreDisi, streamingMi = false }: SohbetGirdisiProps) {
  const { temaKoyuMu } = temaKullan();
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
    if (!temizlenmis || devreDisi || streamingMi) return;
    gonderFn(temizlenmis);
    degerAyarla('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const klavyeIsle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !streamingMi) {
      e.preventDefault();
      gonder();
    }
  };

  return (
    <div className={temaKoyuMu ? 'bg-neutral-900' : 'bg-white'}>
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Input Container - Pill Shape */}
        <div className={birlesik(
          'relative rounded-full border transition-all shadow-lg',
          temaKoyuMu 
            ? 'bg-neutral-800 border-neutral-700 focus-within:border-neutral-500' 
            : 'bg-neutral-100 border-neutral-200 focus-within:border-neutral-400'
        )}>
          <div className="flex items-end">
            {/* Attachment Button */}
            <button 
              className={birlesik(
                'p-4 transition-colors',
                temaKoyuMu 
                  ? 'text-neutral-500 hover:text-neutral-300' 
                  : 'text-neutral-400 hover:text-neutral-600'
              )}
              title="Dosya ekle"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={deger}
              onChange={(e) => degerAyarla(e.target.value)}
              onKeyDown={klavyeIsle}
              placeholder="Mesaj gönderin..."
              disabled={devreDisi}
              rows={1}
              className={birlesik(
                'flex-1 resize-none bg-transparent py-4 pr-2 text-base focus:outline-none disabled:opacity-50 min-h-[56px] max-h-[200px]',
                temaKoyuMu 
                  ? 'text-neutral-100 placeholder-neutral-500' 
                  : 'text-neutral-900 placeholder-neutral-400'
              )}
            />
            
            {/* Send Button */}
            <div className="p-2">
              <button
                onClick={gonder}
                disabled={!deger.trim() || devreDisi || streamingMi}
                className={birlesik(
                  'w-10 h-10 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center',
                  temaKoyuMu 
                    ? 'bg-white text-neutral-900 hover:bg-neutral-200 disabled:hover:bg-white' 
                    : 'bg-neutral-900 text-white hover:bg-neutral-700 disabled:hover:bg-neutral-900'
                )}
              >
                {streamingMi ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className={birlesik(
          'text-center text-xs mt-3',
          temaKoyuMu ? 'text-neutral-600' : 'text-neutral-400'
        )}>
          Ercüment hata yapabilir. Önemli bilgileri doğrulayın.
        </p>
      </div>
    </div>
  );
}
