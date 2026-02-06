import { useMemo } from 'react';
import { SohbetOturumu } from '../types';
import { birlesik } from '../utils/cn';
import { tarihGrupla } from '../utils/formatDate';
import { temaKullan } from '../context/ThemeContext';

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
  const { temaKoyuMu } = temaKullan();

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
          className={birlesik(
            'fixed inset-0 backdrop-blur-sm z-40 lg:hidden',
            temaKoyuMu ? 'bg-black/60' : 'bg-black/30'
          )}
          onClick={kapatFn}
        />
      )}

      {/* Toggle Button - Menü kapalıyken görünür */}
      {!acikMi && (
        <button
          onClick={acFn}
          className={birlesik(
            'fixed left-3 top-[0.65rem] z-50 p-2 rounded-lg transition-colors',
            temaKoyuMu 
              ? 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700' 
              : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200'
          )}
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
          'fixed lg:relative inset-y-0 left-0 z-50 w-[500px] flex flex-col transition-all duration-300 ease-out border-r',
          temaKoyuMu ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200',
          acikMi ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:overflow-hidden'
        )}
      >
        {/* Header with Toggle and New Chat */}
        <div className="p-3 flex items-center justify-between">
          <button
            onClick={yeniSohbetFn}
            className={birlesik(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
              temaKoyuMu 
                ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' 
                : 'text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
            )}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Yeni sohbet
          </button>
          <button
            onClick={kapatFn}
            className={birlesik(
              'p-2 rounded-lg transition-colors',
              temaKoyuMu 
                ? 'text-neutral-500 hover:text-white hover:bg-neutral-800' 
                : 'text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200'
            )}
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
              <p className={birlesik(
                'text-sm',
                temaKoyuMu ? 'text-neutral-500' : 'text-neutral-400'
              )}>Henüz sohbet yok</p>
            </div>
          ) : (
            Object.entries(gruplananlar).map(([grup, elemanlar]) => (
              <div key={grup} className="mb-4">
                <div className={birlesik(
                  'px-3 py-2 text-xs font-medium',
                  temaKoyuMu ? 'text-neutral-500' : 'text-neutral-400'
                )}>
                  {grup}
                </div>
                {elemanlar.map((oturum) => (
                  <div key={oturum.id} className="relative">
                    <button
                      onClick={() => sohbetSecFn(oturum.id)}
                      className={birlesik(
                        'w-full group flex items-center gap-2 px-3 py-3 rounded-lg text-left text-sm transition-all mb-1',
                        temaKoyuMu
                          ? suankiSohbetId === oturum.id
                            ? 'bg-neutral-800 text-white'
                            : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
                          : suankiSohbetId === oturum.id
                            ? 'bg-neutral-200 text-neutral-900'
                            : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'
                      )}
                    >
                      <span className="truncate flex-1">{oturum.baslik}</span>
                      
                      {/* Çöp Kutusu Silme Butonu */}
                      <button
                        onClick={(e) => silmeIsle(oturum.id, e)}
                        className={birlesik(
                          'shrink-0 p-1 rounded transition-all opacity-0 group-hover:opacity-100',
                          temaKoyuMu 
                            ? 'text-neutral-600 hover:text-red-400' 
                            : 'text-neutral-400 hover:text-red-500'
                        )}
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

        {/* Footer - Kullanıcı Bilgisi */}
        <div className="px-6 py-5 group">
          <div className="flex items-center justify-between">
            <p className={birlesik(
              'text-sm',
              temaKoyuMu ? 'text-neutral-500' : 'text-neutral-400'
            )}>
              <span className={birlesik(
                'font-medium',
                temaKoyuMu ? 'text-neutral-400' : 'text-neutral-500'
              )}>{kullaniciAdi}</span> tarafından giriş yapılmıştır
            </p>
            <button
              onClick={cikisYapFn}
              className={birlesik(
                'opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg text-xs font-medium',
                temaKoyuMu 
                  ? 'text-red-400 hover:bg-red-500/10' 
                  : 'text-red-500 hover:bg-red-50'
              )}
            >
              Çıkış
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
