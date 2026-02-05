import { useState, useCallback, useEffect, useRef } from 'react';
import { SohbetOturumu, Mesaj } from '../types';
import {
  kayitliSohbetleriGetir,
  sohbetleriKaydet,
  suankiSohbetIdGetir,
  suankiSohbetIdKaydet,
} from '../utils/storage';
import { mesajGonderApi } from '../services/api';

function rastgeleIdOlustur(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function sohbetKullan() {
  const [sohbetler, sohbetleriAyarla] = useState<SohbetOturumu[]>(() => kayitliSohbetleriGetir());
  const [suankiSohbetId, suankiIdAyarla] = useState<string | null>(() => suankiSohbetIdGetir());
  const [yukleniyor, yukleniyorAyarla] = useState(false);
  const streamingRef = useRef<NodeJS.Timeout | null>(null);

  const suankiSohbet = sohbetler.find((s) => s.id === suankiSohbetId) || null;

  useEffect(() => {
    sohbetleriKaydet(sohbetler);
  }, [sohbetler]);

  useEffect(() => {
    suankiSohbetIdKaydet(suankiSohbetId);
  }, [suankiSohbetId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamingRef.current) {
        clearInterval(streamingRef.current);
      }
    };
  }, []);

  const yeniSohbetOlustur = useCallback(() => {
    const yeniOturum: SohbetOturumu = {
      id: rastgeleIdOlustur(),
      baslik: 'Yeni Sohbet',
      mesajlar: [],
      olusturmaTarihi: Date.now(),
      guncellemeTarihi: Date.now(),
    };
    sohbetleriAyarla((onceki) => [yeniOturum, ...onceki]);
    suankiIdAyarla(yeniOturum.id);
    return yeniOturum.id;
  }, []);

  const sohbetSec = useCallback((id: string) => {
    suankiIdAyarla(id);
  }, []);

  const sohbetiSil = useCallback(
    (id: string) => {
      sohbetleriAyarla((onceki) => onceki.filter((s) => s.id !== id));
      if (suankiSohbetId === id) {
        suankiIdAyarla(null);
      }
    },
    [suankiSohbetId]
  );

  const tumSohbetleriSil = useCallback(() => {
    sohbetleriAyarla([]);
    suankiIdAyarla(null);
  }, []);

  const streamingBaslat = useCallback((oturumId: string, mesajId: string, tamIcerik: string) => {
    const kelimeler = tamIcerik.split(' ');
    let index = 0;
    
    // Her 100ms'de bir kelime ilerle (yavaş)
    streamingRef.current = setInterval(() => {
      index++;
      
      // Tüm kelimeler %100 olana kadar devam et
      if (index >= kelimeler.length + 9) {
        if (streamingRef.current) {
          clearInterval(streamingRef.current);
          streamingRef.current = null;
        }
        
        sohbetleriAyarla((onceki) =>
          onceki.map((s) => {
            if (s.id !== oturumId) return s;
            return {
              ...s,
              mesajlar: s.mesajlar.map((m) => {
                if (m.id !== mesajId) return m;
                return {
                  ...m,
                  gosterilenIcerik: String(kelimeler.length + 9),
                  streamingMi: false,
                };
              }),
            };
          })
        );
        return;
      }
      
      sohbetleriAyarla((onceki) =>
        onceki.map((s) => {
          if (s.id !== oturumId) return s;
          return {
            ...s,
            mesajlar: s.mesajlar.map((m) => {
              if (m.id !== mesajId) return m;
              return {
                ...m,
                gosterilenIcerik: String(index),
              };
            }),
          };
        })
      );
    }, 100);
  }, []);

  const mesajGonder = useCallback(
    async (icerik: string) => {
      let oturumId = suankiSohbetId;

      if (!oturumId) {
        const id = rastgeleIdOlustur();
        const yeniOturum: SohbetOturumu = {
          id,
          baslik: icerik.slice(0, 40) + (icerik.length > 40 ? '...' : ''),
          mesajlar: [],
          olusturmaTarihi: Date.now(),
          guncellemeTarihi: Date.now(),
        };
        sohbetleriAyarla((onceki) => [yeniOturum, ...onceki]);
        suankiIdAyarla(id);
        oturumId = id;
      }

      const kullaniciMesaji: Mesaj = {
        id: rastgeleIdOlustur(),
        rol: 'user',
        icerik,
        icerikTuru: 'text',
        zamanDamgasi: Date.now(),
      };

      sohbetleriAyarla((onceki) =>
        onceki.map((s) => {
          if (s.id !== oturumId) return s;
          const ilkMesajMi = s.mesajlar.length === 0;
          return {
            ...s,
            baslik: ilkMesajMi
              ? icerik.slice(0, 40) + (icerik.length > 40 ? '...' : '')
              : s.baslik,
            mesajlar: [...s.mesajlar, kullaniciMesaji],
            guncellemeTarihi: Date.now(),
          };
        })
      );

      yukleniyorAyarla(true);

      try {
        const cevap = await mesajGonderApi(icerik);
        
        // Streaming mesajı ekle
        const streamingMesaj: Mesaj = {
          ...cevap,
          gosterilenIcerik: '',
          streamingMi: true,
        };
        
        sohbetleriAyarla((onceki) =>
          onceki.map((s) => {
            if (s.id !== oturumId) return s;
            return {
              ...s,
              mesajlar: [...s.mesajlar, streamingMesaj],
              guncellemeTarihi: Date.now(),
            };
          })
        );
        
        yukleniyorAyarla(false);
        
        // Streaming başlat
        streamingBaslat(oturumId, cevap.id, cevap.icerik);
        
      } catch {
        const hataMesaji: Mesaj = {
          id: rastgeleIdOlustur(),
          rol: 'assistant',
          icerik: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          icerikTuru: 'error',
          zamanDamgasi: Date.now(),
        };
        sohbetleriAyarla((onceki) =>
          onceki.map((s) => {
            if (s.id !== oturumId) return s;
            return {
              ...s,
              mesajlar: [...s.mesajlar, hataMesaji],
              guncellemeTarihi: Date.now(),
            };
          })
        );
        yukleniyorAyarla(false);
      }
    },
    [suankiSohbetId, streamingBaslat]
  );

  return {
    sohbetler,
    suankiSohbet,
    suankiSohbetId,
    yukleniyor,
    yeniSohbetOlustur,
    sohbetSec,
    sohbetiSil,
    tumSohbetleriSil,
    mesajGonder,
  };
}
