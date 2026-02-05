import { TabloVerisi } from '../types';

interface TabloGostericiProps {
  veri: TabloVerisi;
}

export default function TabloGosterici({ veri }: TabloGostericiProps) {
  if (!veri.sutunAdlari || !veri.satirlar || veri.satirlar.length === 0) {
    return <p className="text-sm text-neutral-500 italic mt-2">Sonuç verisi bulunamadı</p>;
  }

  return (
    <div className="mt-4 rounded-lg border border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-800 border-b border-neutral-700">
        <span className="text-xs font-medium text-neutral-400">
          Sorgu Sonuçları
        </span>
        <span className="text-xs text-neutral-500 bg-neutral-700 px-2 py-0.5 rounded">
          {veri.satirlar.length} kayıt
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-800/50">
              {veri.sutunAdlari.map((sutun, indeks) => (
                <th
                  key={indeks}
                  className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider whitespace-nowrap border-b border-neutral-700"
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
                    className="px-4 py-3 text-neutral-300 whitespace-nowrap"
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
