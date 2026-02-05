import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Mesaj } from '../types';
import { birlesik } from '../utils/cn';
import { saatFormatla } from '../utils/formatDate';
import TabloGosterici from './TableRenderer';

interface MesajBalonuProps {
  mesaj: Mesaj;
}

export default function MesajBalonu({ mesaj }: MesajBalonuProps) {
  const [kopyalandi, kopyalandiAyarla] = useState(false);
  const kullaniciMi = mesaj.rol === 'user';
  const hataMi = mesaj.icerikTuru === 'error';

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(mesaj.icerik);
      kopyalandiAyarla(true);
      setTimeout(() => kopyalandiAyarla(false), 2000);
    } catch {
    }
  };

  return (
    <div className={birlesik('group', kullaniciMi ? 'flex justify-end' : '')}>
      <div className={birlesik(
        'flex gap-4 max-w-full',
        kullaniciMi ? 'flex-row-reverse' : ''
      )}>
        {/* Avatar - Sadece AI için logo göster */}
        {!kullaniciMi && (
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 p-1.5">
            <img 
              src="/simge.png" 
              alt="Taytech AI" 
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Content */}
        <div className={birlesik('flex-1 min-w-0 max-w-[75%]', kullaniciMi ? 'flex flex-col items-end' : '')}>
          {/* Message */}
          <div
            className={birlesik(
              'relative',
              kullaniciMi 
                ? 'rounded-2xl px-5 py-4 bg-neutral-700 text-neutral-100' 
                : hataMi 
                  ? 'rounded-2xl px-5 py-4 bg-red-500/10 border border-red-500/20 text-red-200'
                  : 'text-neutral-200'
            )}
          >
            {kullaniciMi ? (
              <p className="text-base leading-relaxed whitespace-pre-wrap">{mesaj.icerik}</p>
            ) : (
              <div className="text-base leading-relaxed prose prose-invert max-w-none prose-p:my-2 prose-strong:text-neutral-100 prose-code:text-emerald-400 prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
                <ReactMarkdown>{mesaj.icerik}</ReactMarkdown>
              </div>
            )}

            {mesaj.tabloVerisi && <TabloGosterici veri={mesaj.tabloVerisi} />}
          </div>

          {/* Footer */}
          <div className={birlesik(
            'flex items-center gap-3 mt-2.5 text-xs text-neutral-500',
            kullaniciMi ? 'flex-row-reverse' : ''
          )}>
            <span>{saatFormatla(mesaj.zamanDamgasi)}</span>
            
            {!kullaniciMi && (
              <button
                onClick={kopyala}
                className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 hover:text-neutral-300 transition-all"
              >
                {kopyalandi ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-emerald-400">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
