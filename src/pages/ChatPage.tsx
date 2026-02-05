import { useState } from 'react';
import { girisKullan } from '../context/AuthContext';
import { sohbetKullan } from '../hooks/useChat';
import YanMenu from '../components/Sidebar';
import SohbetBasligi from '../components/ChatHeader';
import MesajListesi from '../components/MessageList';
import SohbetGirdisi from '../components/ChatInput';
import BosDurum from '../components/EmptyState';

export default function SohbetSayfasi() {
  const { kullanici, cikisYap } = girisKullan();

  const {
    sohbetler,
    suankiSohbet,
    suankiSohbetId,
    yukleniyor,
    yeniSohbetOlustur,
    sohbetSec,
    sohbetiSil,
    mesajGonder,
  } = sohbetKullan();

  const [sidebarAcik, sidebarAcikAyarla] = useState(true);

  const mesajIsle = (mesaj: string) => {
    mesajGonder(mesaj);
  };

  const oneriIsle = (metin: string) => {
    mesajGonder(metin);
  };

  // Streaming durumunu kontrol et - son mesaj AI mesajı ve streamingMi true ise
  const streamingMi = suankiSohbet?.mesajlar.some(m => m.streamingMi) ?? false;

  return (
    <div className="h-screen flex bg-neutral-950">
      {/* Sidebar */}
      <YanMenu
        sohbetler={sohbetler}
        suankiSohbetId={suankiSohbetId}
        acikMi={sidebarAcik}
        kapatFn={() => sidebarAcikAyarla(false)}
        acFn={() => sidebarAcikAyarla(true)}
        yeniSohbetFn={yeniSohbetOlustur}
        sohbetSecFn={sohbetSec}
        sohbetSilFn={sohbetiSil}
        cikisYapFn={cikisYap}
        kullaniciAdi={kullanici?.kullaniciAdi || 'Kullanıcı'}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-neutral-900">
        <SohbetBasligi 
          yeniSohbetFn={yeniSohbetOlustur}
          sidebarAcikMi={sidebarAcik}
        />

        {suankiSohbet && suankiSohbet.mesajlar.length > 0 ? (
          <MesajListesi mesajlar={suankiSohbet.mesajlar} yukleniyor={yukleniyor} />
        ) : (
          <BosDurum oneriFn={oneriIsle} />
        )}

        <SohbetGirdisi gonderFn={mesajIsle} devreDisi={yukleniyor} streamingMi={streamingMi} />
      </main>
    </div>
  );
}
