import { birlesik } from '../utils/cn';
import { temaKullan } from '../context/ThemeContext';

interface SohbetBasligiProps {
  yeniSohbetFn: () => void;
  sidebarAcikMi: boolean;
}

export default function SohbetBasligi({ yeniSohbetFn, sidebarAcikMi }: SohbetBasligiProps) {
  const { temaKoyuMu, temaDegistir } = temaKullan();

  return (
    <header className={birlesik(
      'h-14 flex items-center justify-between pr-4 shrink-0 transition-all',
      temaKoyuMu ? 'bg-neutral-900' : 'bg-white border-b border-neutral-200',
      sidebarAcikMi ? 'pl-4' : 'pl-14'
    )}>
      <div className="flex items-center gap-3">
        {/* Model Selector Style Button */}
        <button className={birlesik(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors',
          temaKoyuMu ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
        )}>
          <span className={birlesik(
            'text-sm font-medium',
            temaKoyuMu ? 'text-neutral-200' : 'text-neutral-800'
          )}>Ercüment</span>
          <span className={birlesik(
            'text-xs',
            temaKoyuMu ? 'text-neutral-500' : 'text-neutral-400'
          )}>v1.0</span>
          <svg className={birlesik(
            'w-4 h-4',
            temaKoyuMu ? 'text-neutral-500' : 'text-neutral-400'
          )} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Tema Değiştirme Butonu */}
        <button
          onClick={temaDegistir}
          className={birlesik(
            'p-2 rounded-lg transition-colors',
            temaKoyuMu 
              ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' 
              : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
          )}
          title={temaKoyuMu ? 'Açık temaya geç' : 'Koyu temaya geç'}
        >
          {temaKoyuMu ? (
            // Güneş ikonu - açık temaya geçmek için
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            // Ay ikonu - koyu temaya geçmek için
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          )}
        </button>

        {/* Yeni Sohbet Butonu */}
        <button
          onClick={yeniSohbetFn}
          className={birlesik(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            temaKoyuMu 
              ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' 
              : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
          )}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Yeni sohbet
        </button>
      </div>
    </header>
  );
}
