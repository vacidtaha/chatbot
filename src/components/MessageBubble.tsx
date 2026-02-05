import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Mesaj } from '../types';
import { birlesik } from '../utils/cn';
import TabloGosterici from './TableRenderer';

interface MesajBalonuProps {
  mesaj: Mesaj;
}

export default function MesajBalonu({ mesaj }: MesajBalonuProps) {
  const [kopyalandi, kopyalandiAyarla] = useState(false);
  const kullaniciMi = mesaj.rol === 'user';
  const hataMi = mesaj.icerikTuru === 'error';
  const streamingMi = mesaj.streamingMi;

  // Streaming index (gosterilenIcerik şimdi index numarası)
  const streamingIndex = parseInt(mesaj.gosterilenIcerik || '0', 10);
  const kelimeler = mesaj.icerik.split(' ');

  // Streaming durumunda kelimeleri opacity ile render et
  const streamingRender = useMemo(() => {
    if (!streamingMi) return null;

    return kelimeler.map((kelime, i) => {
      // Kelimenin pozisyonuna göre opacity hesapla
      // streamingIndex = şu anki "tam görünen" kelime pozisyonu
      // i = kelimenin indexi
      
      const fark = streamingIndex - i;
      
      let opacity = 0;
      if (fark >= 9) {
        // 9 veya daha fazla geride = %100 görünür
        opacity = 1;
      } else if (fark >= 0) {
        // 0-8 arası = kademeli opacity (100, 90, 80, 70, 60, 50, 40, 30, 20, 10)
        opacity = (fark + 1) * 0.1;
      } else {
        // Henüz görünmedi
        opacity = 0;
      }

      if (opacity === 0) return null;

      return (
        <span 
          key={i} 
          style={{ 
            opacity,
            transition: 'opacity 0.1s ease'
          }}
        >
          {kelime}{' '}
        </span>
      );
    });
  }, [streamingMi, streamingIndex, kelimeler]);

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(mesaj.icerik);
      kopyalandiAyarla(true);
      setTimeout(() => kopyalandiAyarla(false), 2000);
    } catch {
    }
  };

  return (
    <div className={birlesik('group', kullaniciMi ? 'flex justify-end' : 'flex justify-start')}>
      <div className={birlesik('flex gap-4', kullaniciMi ? 'max-w-[70%] flex-row-reverse' : 'max-w-[85%]')}>
        {/* AI Avatar */}
        {!kullaniciMi && (
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 mt-1">
            <img 
              src="/simge.png" 
              alt="Ercüment" 
              className="w-5 h-5 object-contain"
            />
          </div>
        )}

        <div className={birlesik(kullaniciMi ? 'flex flex-col items-end' : 'flex-1')}>
        {/* Mesaj İçeriği */}
        <div
          className={birlesik(
            kullaniciMi 
              ? 'rounded-2xl px-5 py-4 bg-neutral-700 text-neutral-100' 
              : hataMi 
                ? 'text-red-300'
                : 'text-neutral-100'
          )}
        >
          {kullaniciMi ? (
            <p className="text-base leading-relaxed whitespace-pre-wrap">{mesaj.icerik}</p>
          ) : streamingMi ? (
            // Streaming durumunda kademeli opacity ile göster
            <p className="text-lg leading-relaxed">
              {streamingRender}
            </p>
          ) : (
            <div className="text-lg leading-relaxed prose prose-invert prose-lg max-w-none prose-p:my-4 prose-p:text-neutral-100 prose-strong:text-white prose-headings:text-white prose-code:text-emerald-400 prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700 prose-li:text-neutral-100 prose-ul:my-4 prose-ol:my-4">
              <ReactMarkdown>{mesaj.icerik}</ReactMarkdown>
            </div>
          )}

          {!streamingMi && mesaj.tabloVerisi && <TabloGosterici veri={mesaj.tabloVerisi} />}
        </div>

        {/* AI Mesajları için Kopyala Butonu - Streaming bitince göster */}
        {!kullaniciMi && !hataMi && !streamingMi && (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={kopyala}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-all opacity-0 group-hover:opacity-100"
            >
              {kopyalandi ? (
                <>
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
