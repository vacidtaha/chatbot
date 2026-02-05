interface BosDurumProps {
  oneriFn: (metin: string) => void;
}

const ornekSorular = [
  'Son 30 günün satış raporunu göster',
  'Aktif müşteri sayısı kaç?',
  'Stok durumu kritik olan ürünler',
  'Aylık gelir-gider karşılaştırması',
];

export default function BosDurum({ oneriFn }: BosDurumProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center p-4">
          <img 
            src="/simge.png" 
            alt="Ercüment" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-medium text-neutral-100 mb-2">
        Size nasıl yardımcı olabilirim?
      </h1>
      <p className="text-neutral-500 text-sm mb-12">
        Ben Ercüment, Taytech kurumsal asistanınız.
      </p>

      {/* Suggestions - Minimal Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {ornekSorular.map((soru) => (
          <button
            key={soru}
            onClick={() => oneriFn(soru)}
            className="px-4 py-2.5 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 hover:border-neutral-600 transition-all"
          >
            {soru}
          </button>
        ))}
      </div>
    </div>
  );
}
