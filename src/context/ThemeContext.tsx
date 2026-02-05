import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type Tema = 'koyu' | 'acik';

interface TemaContextTipi {
  tema: Tema;
  temaKoyuMu: boolean;
  temaDegistir: () => void;
  temaSecimYapildiMi: boolean;
  temaSecimModalGoster: boolean;
  temaSecFn: (secim: Tema) => void;
}

const TemaContext = createContext<TemaContextTipi | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, temaAyarla] = useState<Tema>(() => {
    const kayitli = localStorage.getItem('tema');
    return (kayitli as Tema) || 'koyu';
  });

  const [temaSecimYapildiMi, temaSecimYapildiMiAyarla] = useState<boolean>(() => {
    return localStorage.getItem('temaSecimYapildi') === 'true';
  });

  const [temaSecimModalGoster, temaSecimModalGosterAyarla] = useState<boolean>(!temaSecimYapildiMi);

  useEffect(() => {
    localStorage.setItem('tema', tema);
  }, [tema]);

  const temaDegistir = useCallback(() => {
    temaAyarla(onceki => onceki === 'koyu' ? 'acik' : 'koyu');
  }, []);

  const temaSecFn = useCallback((secim: Tema) => {
    temaAyarla(secim);
    temaSecimYapildiMiAyarla(true);
    temaSecimModalGosterAyarla(false);
    localStorage.setItem('temaSecimYapildi', 'true');
  }, []);

  return (
    <TemaContext.Provider value={{ 
      tema, 
      temaKoyuMu: tema === 'koyu', 
      temaDegistir,
      temaSecimYapildiMi,
      temaSecimModalGoster,
      temaSecFn
    }}>
      {children}
    </TemaContext.Provider>
  );
}

export function temaKullan() {
  const context = useContext(TemaContext);
  if (!context) throw new Error('temaKullan TemaProvider icinde kullanilmali');
  return context;
}
