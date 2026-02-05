import { useEffect, useRef } from 'react';
import { Mesaj } from '../types';
import MesajBalonu from './MessageBubble';
import YaziyorGostergesi from './TypingIndicator';

interface MesajListesiProps {
  mesajlar: Mesaj[];
  yukleniyor: boolean;
}

export default function MesajListesi({ mesajlar, yukleniyor }: MesajListesiProps) {
  const altRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    altRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mesajlar, yukleniyor]);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Üst Gradient Fade + Blur */}
      <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]" />
      </div>
      
      {/* Alt Gradient Fade + Blur */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_top,black_30%,transparent_100%)]" />
      </div>
      
      {/* Mesaj Listesi */}
      <div className="h-full overflow-y-auto chat-scroll">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-8 space-y-8">
          {mesajlar.map((mesaj) => (
            <MesajBalonu key={mesaj.id} mesaj={mesaj} />
          ))}

          {yukleniyor && <YaziyorGostergesi />}

          <div ref={altRef} />
        </div>
      </div>
    </div>
  );
}
