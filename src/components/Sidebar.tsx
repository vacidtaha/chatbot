import { useMemo } from 'react';
import { SohbetOturumu } from '../types';
import { birlesik } from '../utils/cn';
import { tarihGrupla } from '../utils/formatDate';

interface YanMenuProps {
  sohbetler: SohbetOturumu[];
  suankiSohbetId: string | null;
  acikMi: boolean;
  kapatFn: () => void;
  acFn: () => void;
  yeniSohbetFn: () => void;
  sohbetSecFn: (id: string) => void;
  sohbetSilFn: (id: string) => void;
  cikisYapFn: () => void;
  kullaniciAdi: string;
}

export default function YanMenu({
  sohbetler,
  suankiSohbetId,
  acikMi,
  kapatFn,
  acFn,
  yeniSohbetFn,
  sohbetSecFn,
  sohbetSilFn,
  cikisYapFn,
  kullaniciAdi,
}: YanMenuProps) {
  const gruplananlar = useMemo(() => {
    const gruplar: Record<string, SohbetOturumu[]> = {};
    sohbetler.forEach((oturum) => {
      const grup = tarihGrupla(oturum.guncellemeTarihi);
      if (!gruplar[grup]) gruplar[grup] = [];
      gruplar[grup].push(oturum);
    });
    return gruplar;
  }, [sohbetler]);

  const silmeIsle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sohbetSilFn(id);
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

      {/* Toggle Button - Menü kapalıyken görünür */}
      {!acikMi && (
        <button
          onClick={acFn}
          className="fixed left-3 top-[0.65rem] z-50 p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          title="Menüyü Aç"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
            <path d="M15 9l3 3-3 3" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={birlesik(
          'fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-neutral-950 flex flex-col transition-all duration-300 ease-out',
          acikMi ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:overflow-hidden'
        )}
      >
        {/* Header with Toggle and New Chat */}
        <div className="p-3 flex items-center justify-between">
          <button
            onClick={yeniSohbetFn}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-400 text-sm hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Yeni sohbet
          </button>
          <button
            onClick={kapatFn}
            className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Menüyü Kapat"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M14 9l-3 3 3 3" />
            </svg>
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 sidebar-scroll">
          {Object.keys(gruplananlar).length === 0 ? (
            <div className="px-3 py-12 text-center">
              <p className="text-neutral-500 text-sm">Henüz sohbet yok</p>
            </div>
          ) : (
            Object.entries(gruplananlar).map(([grup, elemanlar]) => (
              <div key={grup} className="mb-4">
                <div className="px-3 py-2 text-xs font-medium text-neutral-500">
                  {grup}
                </div>
                {elemanlar.map((oturum) => (
                  <div key={oturum.id} className="relative">
                    <button
                      onClick={() => sohbetSecFn(oturum.id)}
                      className={birlesik(
                        'w-full group flex items-center gap-2 px-3 py-3 rounded-lg text-left text-sm transition-all mb-1',
                        suankiSohbetId === oturum.id
                          ? 'bg-neutral-800 text-white'
                          : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
                      )}
                    >
                      <span className="truncate flex-1">{oturum.baslik}</span>
                      
                      {/* Çöp Kutusu Silme Butonu */}
                      <button
                        onClick={(e) => silmeIsle(oturum.id, e)}
                        className="shrink-0 p-1 rounded transition-all text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer - Minimal Kullanıcı Alanı */}
        <div className="p-3">
          <div className="relative">
            <button
              onClick={cikisYapFn}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-sm font-medium">
                {kullaniciAdi.charAt(0).toUpperCase()}
              </div>
              <span className="flex-1 text-sm text-neutral-300 text-left truncate">{kullaniciAdi}</span>
              <svg className="w-4 h-4 text-neutral-500 group-hover:text-red-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
