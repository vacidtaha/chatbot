import { useState, useMemo } from 'react';
import { SohbetOturumu } from '../types';
import { birlesik } from '../utils/cn';
import { tarihGrupla } from '../utils/formatDate';

interface YanMenuProps {
  sohbetler: SohbetOturumu[];
  suankiSohbetId: string | null;
  acikMi: boolean;
  kapatFn: () => void;
  yeniSohbetFn: () => void;
  sohbetSecFn: (id: string) => void;
  sohbetSilFn: (id: string) => void;
  hepsiniTemizleFn: () => void;
  cikisYapFn: () => void;
  kullaniciAdi: string;
}

export default function YanMenu({
  sohbetler,
  suankiSohbetId,
  acikMi,
  kapatFn,
  yeniSohbetFn,
  sohbetSecFn,
  sohbetSilFn,
  hepsiniTemizleFn,
  cikisYapFn,
  kullaniciAdi,
}: YanMenuProps) {
  const [arama, aramaAyarla] = useState('');
  const [silmeOnayi, silmeOnayiAyarla] = useState<string | null>(null);

  const filtrelenmis = useMemo(() => {
    if (!arama.trim()) return sohbetler;
    const sorgu = arama.toLowerCase();
    return sohbetler.filter(
      (s) =>
        s.baslik.toLowerCase().includes(sorgu) ||
        s.mesajlar.some((m) => m.icerik.toLowerCase().includes(sorgu))
    );
  }, [sohbetler, arama]);

  const gruplananlar = useMemo(() => {
    const gruplar: Record<string, SohbetOturumu[]> = {};
    filtrelenmis.forEach((oturum) => {
      const grup = tarihGrupla(oturum.guncellemeTarihi);
      if (!gruplar[grup]) gruplar[grup] = [];
      gruplar[grup].push(oturum);
    });
    return gruplar;
  }, [filtrelenmis]);

  const silmeIsle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (silmeOnayi === id) {
      sohbetSilFn(id);
      silmeOnayiAyarla(null);
    } else {
      silmeOnayiAyarla(id);
      setTimeout(() => silmeOnayiAyarla(null), 3000);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {acikMi && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={kapatFn}
        />
      )}

      {/* Sidebar */}
      <aside
        className={birlesik(
          'fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-neutral-950 border-r border-neutral-800 flex flex-col transition-all duration-300 ease-out',
          acikMi ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:border-0 lg:overflow-hidden'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img 
                src="/simge.png" 
                alt="Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-white font-medium">Taytech AI</span>
            </div>
            <button
              onClick={kapatFn}
              className="lg:hidden p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={yeniSohbetFn}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-neutral-800 text-neutral-200 text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Yeni Sohbet
          </button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Ara..."
              value={arama}
              onChange={(e) => aramaAyarla(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 sidebar-scroll">
          {Object.keys(gruplananlar).length === 0 ? (
            <div className="px-3 py-16 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-md bg-neutral-800/50 flex items-center justify-center">
                <svg className="w-7 h-7 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p className="text-neutral-400 text-sm font-medium">Sohbet geçmişi boş</p>
              <p className="text-neutral-600 text-xs mt-1">Yukarıdaki butona tıklayarak başlayın</p>
            </div>
          ) : (
            Object.entries(gruplananlar).map(([grup, elemanlar]) => (
              <div key={grup} className="mb-4">
                <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {grup}
                </div>
                {elemanlar.map((oturum) => (
                  <button
                    key={oturum.id}
                    onClick={() => sohbetSecFn(oturum.id)}
                    className={birlesik(
                      'w-full group flex items-center gap-3 px-3 py-3 rounded-md text-left text-sm transition-all mb-1',
                      suankiSohbetId === oturum.id
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
                    )}
                  >
                    <span className="truncate flex-1">{oturum.baslik}</span>
                    <button
                      onClick={(e) => silmeIsle(e, oturum.id)}
                      className={birlesik(
                        'shrink-0 p-1.5 rounded-md transition-all',
                        silmeOnayi === oturum.id
                          ? 'text-red-400 bg-red-500/10'
                          : 'text-neutral-600 hover:text-red-400 hover:bg-neutral-700 opacity-0 group-hover:opacity-100'
                      )}
                      title={silmeOnayi === oturum.id ? 'Silmek için tekrar tıklayın' : 'Sil'}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-800 space-y-2">
          {sohbetler.length > 0 && (
            <button
              onClick={hepsiniTemizleFn}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Tümünü Temizle
            </button>
          )}

          {/* User */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-md bg-neutral-900">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center text-white text-sm font-medium">
              {kullaniciAdi.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-200 font-medium truncate">{kullaniciAdi}</p>
              <p className="text-xs text-neutral-500">Taytech</p>
            </div>
            <button
              onClick={cikisYapFn}
              className="p-2 rounded-md text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
              title="Çıkış Yap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
