import { temaKullan } from '../context/ThemeContext';
import { birlesik } from '../utils/cn';

export default function YaziyorGostergesi() {
  const { temaKoyuMu } = temaKullan();

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3">
        {/* AI Avatar */}
        <div className={birlesik(
          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
          temaKoyuMu ? 'bg-neutral-800' : 'bg-neutral-100'
        )}>
          <img 
            src="/simge.png" 
            alt="Ercüment" 
            className="w-5 h-5 object-contain"
          />
        </div>
        
        {/* Text */}
        <span className={birlesik(
          'text-sm',
          temaKoyuMu ? 'text-neutral-500' : 'text-neutral-400'
        )}>
          Düşünüyor...
        </span>
      </div>
    </div>
  );
}
