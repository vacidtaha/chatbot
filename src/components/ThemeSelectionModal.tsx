import { temaKullan } from '../context/ThemeContext';

export default function TemaSecimModal() {
  const { temaSecimModalGoster, temaSecFn } = temaKullan();

  if (!temaSecimModalGoster) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal Card */}
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center p-3">
            <img 
              src="/simge.png" 
              alt="Ercüment" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Hoş Geldiniz!
        </h2>
        <p className="text-neutral-400 text-center mb-8">
          Tercih ettiğiniz tema görünümünü seçin
        </p>

        {/* Theme Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Koyu Tema */}
          <button
            onClick={() => temaSecFn('koyu')}
            className="group relative p-4 rounded-xl border-2 border-neutral-700 hover:border-neutral-500 bg-neutral-800 transition-all hover:scale-[1.02]"
          >
            {/* Preview */}
            <div className="h-24 rounded-lg bg-neutral-950 border border-neutral-800 mb-3 p-2 overflow-hidden">
              <div className="h-2 w-8 bg-neutral-700 rounded mb-2" />
              <div className="h-2 w-12 bg-neutral-600 rounded mb-2" />
              <div className="h-2 w-6 bg-neutral-700 rounded" />
            </div>
            
            {/* Label */}
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
              <span className="text-sm font-medium text-neutral-200">Koyu Tema</span>
            </div>
          </button>

          {/* Açık Tema */}
          <button
            onClick={() => temaSecFn('acik')}
            className="group relative p-4 rounded-xl border-2 border-neutral-700 hover:border-neutral-500 bg-neutral-800 transition-all hover:scale-[1.02]"
          >
            {/* Preview */}
            <div className="h-24 rounded-lg bg-white border border-neutral-200 mb-3 p-2 overflow-hidden">
              <div className="h-2 w-8 bg-neutral-300 rounded mb-2" />
              <div className="h-2 w-12 bg-neutral-400 rounded mb-2" />
              <div className="h-2 w-6 bg-neutral-300 rounded" />
            </div>
            
            {/* Label */}
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
              <span className="text-sm font-medium text-neutral-200">Açık Tema</span>
            </div>
          </button>
        </div>

        {/* Hint */}
        <p className="text-xs text-neutral-500 text-center">
          Bu tercihi daha sonra sağ üstteki butondan değiştirebilirsiniz.
        </p>
      </div>
    </div>
  );
}

