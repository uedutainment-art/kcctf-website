import Hero from '@/components/Hero';
import FeelingStrip from '@/components/FeelingStrip';
import Schedule from '@/components/Schedule';
import Orchestras from '@/components/Orchestras';
import Djs from '@/components/Djs';
import Dancers from '@/components/Dancers';
import TheNights from '@/components/TheNights';
import Venue from '@/components/Venue';
import Travel from '@/components/Travel';
import CityGuide from '@/components/CityGuide';
import Tickets from '@/components/Tickets';
import FAQ from '@/components/FAQ';
import Accommodation from '@/components/Accommodation';
import Logistics from '@/components/Logistics';
import AfterKCCTF from '@/components/AfterKCCTF';

// 판매창(1·2일권 9/1, 셔틀 8/24)이 한국시간 기준으로 자동 전환되도록 5분마다 재생성
export const revalidate = 300;

export default function HomePage() {
  // 홈 티저 — 미완성 섹션은 플래그로 숨김 (정보 들어오면 .env에서 true)
  const showTravel = process.env.NEXT_PUBLIC_SHOW_TRAVEL === 'true';
  const showCityGuide = process.env.NEXT_PUBLIC_SHOW_CITY_GUIDE === 'true';
  const showLogistics = process.env.NEXT_PUBLIC_SHOW_LOGISTICS === 'true';
  const showAccommodation = process.env.NEXT_PUBLIC_SHOW_ACCOMMODATION === 'true';
  const showTickets = process.env.NEXT_PUBLIC_SHOW_TICKETS === 'true';
  return (
    <>
      <Hero />
      <FeelingStrip />
      <Orchestras />
      <Djs />
      <Dancers />
      <TheNights />
      <Schedule />
      <Venue />
      {showTravel && <Travel />}
      {showCityGuide && <CityGuide />}
      {showAccommodation && <Accommodation />}
      {showLogistics && <Logistics />}
      {showTickets && <Tickets />}
      <FAQ />
      <AfterKCCTF />
    </>
  );
}
