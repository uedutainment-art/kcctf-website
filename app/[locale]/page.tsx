import Hero from '@/components/Hero';
import FeelingStrip from '@/components/FeelingStrip';
import Schedule from '@/components/Schedule';
import Orchestras from '@/components/Orchestras';
import Djs from '@/components/Djs';
import Dancers from '@/components/Dancers';
import TheNights from '@/components/TheNights';
import Venue from '@/components/Venue';
import CityGuide from '@/components/CityGuide';
import Tickets from '@/components/Tickets';
import FAQ from '@/components/FAQ';
import Accommodation from '@/components/Accommodation';
import Logistics from '@/components/Logistics';
import AfterKCCTF from '@/components/AfterKCCTF';

export default function HomePage() {
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
      <CityGuide />
      <Accommodation />
      <Logistics />
      <Tickets />
      <FAQ />
      <AfterKCCTF />
    </>
  );
}
