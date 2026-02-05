interface BosDurumProps {
  oneriFn: (metin: string) => void;
}

const ornekSorular = [
  { ikon: 'chart', metin: 'Son 30 günün satış raporunu göster' },
  { ikon: 'users', metin: 'Aktif müşteri sayısı kaç?' },
  { ikon: 'box', metin: 'Stok durumu kritik olan ürünler' },
  { ikon: 'trending', metin: 'Aylık gelir-gider karşılaştırması' },
];

const ikonlar: Record<string, JSX.Element> = {
  chart: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  users: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  box: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  trending: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
};

export default function BosDurum({ oneriFn }: BosDurumProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/simge.png" 
            alt="Taytech AI" 
            className="h-20 w-auto mx-auto object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-medium text-neutral-100 mb-3">
          Ben Ercüment, size nasıl yardımcı olabilirim?
        </h2>
        <p className="text-neutral-500 mb-12 max-w-md mx-auto text-base">
          Kurumsal verileriniz hakkında sorular sorun, analizler yapın.
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {ornekSorular.map(({ ikon, metin }) => (
            <button
              key={metin}
              onClick={() => oneriFn(metin)}
              className="group text-left px-5 py-4 rounded-2xl bg-neutral-800/30 border border-neutral-800 hover:bg-neutral-800/60 hover:border-neutral-700 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center shrink-0 transition-colors text-neutral-400 group-hover:text-neutral-300">
                  {ikonlar[ikon]}
                </div>
                <span className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors leading-relaxed">
                  {metin}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
