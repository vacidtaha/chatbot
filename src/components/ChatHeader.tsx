interface SohbetBasligiProps {
  sidebarAcikMi: boolean;
  sidebarToggleFn: () => void;
}

export default function SohbetBasligi({ sidebarAcikMi, sidebarToggleFn }: SohbetBasligiProps) {
  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={sidebarToggleFn}
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          title={sidebarAcikMi ? 'Menüyü Kapat' : 'Menüyü Aç'}
        >
          {sidebarAcikMi ? (
            // Panel Left Close - Modern sidebar close icon
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M14 9l-3 3 3 3" />
            </svg>
          ) : (
            // Panel Left Open - Modern sidebar open icon
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M15 9l3 3-3 3" />
            </svg>
          )}
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="font-medium text-neutral-200">Taytech AI</h1>
        </div>
      </div>

      {/* Right side - empty for clean look */}
      <div />
    </header>
  );
}
