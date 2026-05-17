import Hero from '@/components/Hero';
import FeelingStrip from '@/components/FeelingStrip';
import Schedule from '@/components/Schedule';
import Orchestras from '@/components/Orchestras';
import Djs from '@/components/Djs';
import Dancers from '@/components/Dancers';
import TheNights from '@/components/TheNights';
import Venue from '@/components/Venue';
import Tickets from '@/components/Tickets';
import Accommodation from '@/components/Accommodation';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeelingStrip />
      <Orchestras />
      <TheNights />
      <Schedule />
      <Djs />
      <Dancers />
      <Venue />
      <Tickets />
      <Accommodation />
    </>
  );
}
