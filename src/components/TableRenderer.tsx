import { TabloVerisi } from '../types';

interface TabloGostericiProps {
  veri: TabloVerisi;
}

export default function TabloGosterici({ veri }: TabloGostericiProps) {
  if (!veri.sutunAdlari || !veri.satirlar || veri.satirlar.length === 0) {
    return <p className="text-base text-neutral-500 italic mt-4">Sonuç verisi bulunamadı</p>;
  }

  return (
    <div className="mt-6 rounded-xl border border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-neutral-800 border-b border-neutral-700">
        <span className="text-sm font-medium text-neutral-300">
          Sorgu Sonuçları
        </span>
        <span className="text-sm text-neutral-400 bg-neutral-700 px-3 py-1 rounded-lg">
          {veri.satirlar.length} kayıt
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-800/50">
              {veri.sutunAdlari.map((sutun, indeks) => (
                <th
                  key={indeks}
                  className="px-5 py-4 text-left text-sm font-semibold text-neutral-200 uppercase tracking-wider whitespace-nowrap border-b border-neutral-700"
                >
                  {sutun}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {veri.satirlar.map((satir, satirIndeks) => (
              <tr
                key={satirIndeks}
                className="hover:bg-neutral-800/30 transition-colors"
              >
                {satir.map((hucre, hucreIndeks) => (
                  <td
                    key={hucreIndeks}
                    className="px-5 py-4 text-base text-neutral-200 whitespace-nowrap"
                  >
                    {hucre !== null && hucre !== undefined ? String(hucre) : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
