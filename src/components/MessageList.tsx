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
    <div className="flex-1 overflow-y-auto chat-scroll">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {mesajlar.map((mesaj) => (
          <MesajBalonu key={mesaj.id} mesaj={mesaj} />
        ))}

        {yukleniyor && <YaziyorGostergesi />}

        <div ref={altRef} />
      </div>
    </div>
  );
}
