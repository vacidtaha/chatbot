import { birlesik } from '../utils/cn';

interface SohbetBasligiProps {
  yeniSohbetFn: () => void;
  sidebarAcikMi: boolean;
}

export default function SohbetBasligi({ yeniSohbetFn, sidebarAcikMi }: SohbetBasligiProps) {
  return (
    <header className={birlesik(
      'h-14 bg-neutral-900 flex items-center justify-between pr-4 shrink-0 transition-all',
      sidebarAcikMi ? 'pl-4' : 'pl-14'
    )}>
      <div className="flex items-center gap-3">
        {/* Model Selector Style Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors">
          <span className="text-sm font-medium text-neutral-200">Ercüment</span>
          <span className="text-xs text-neutral-500">v1.0</span>
          <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Yeni Sohbet Butonu - Sağ Üst */}
      <button
        onClick={yeniSohbetFn}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-400 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-all"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Yeni sohbet
      </button>
    </header>
  );
}
