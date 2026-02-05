import { temaKullan } from '../context/ThemeContext';
import { birlesik } from '../utils/cn';

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
  const { temaKoyuMu } = temaKullan();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8">
        <div className={birlesik(
          'w-20 h-20 rounded-full flex items-center justify-center p-4',
          temaKoyuMu ? 'bg-neutral-800' : 'bg-neutral-100'
        )}>
          <img 
            src="/simge.png" 
            alt="Ercüment" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h1 className={birlesik(
        'text-2xl font-medium mb-2',
        temaKoyuMu ? 'text-neutral-100' : 'text-neutral-900'
      )}>
        Size nasıl yardımcı olabilirim?
      </h1>
      <p className={birlesik(
        'text-sm mb-12',
        temaKoyuMu ? 'text-neutral-500' : 'text-neutral-500'
      )}>
        Ben Ercüment, Taytech kurumsal asistanınız.
      </p>

      {/* Suggestions - Minimal Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {ornekSorular.map((soru) => (
          <button
            key={soru}
            onClick={() => oneriFn(soru)}
            className={birlesik(
              'px-4 py-2.5 rounded-full border text-sm transition-all',
              temaKoyuMu 
                ? 'bg-neutral-800/50 border-neutral-700/50 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 hover:border-neutral-600' 
                : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 hover:border-neutral-300'
            )}
          >
            {soru}
          </button>
        ))}
      </div>
    </div>
  );
}
