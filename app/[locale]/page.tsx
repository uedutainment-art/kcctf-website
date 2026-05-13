import Hero from '@/components/Hero';
import QuickLinks from '@/components/QuickLinks';
import Schedule from '@/components/Schedule';
import Orchestras from '@/components/Orchestras';
import Djs from '@/components/Djs';
import Dancers from '@/components/Dancers';
import Venue from '@/components/Venue';
import Tickets from '@/components/Tickets';

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Schedule />
      <Orchestras />
      <Djs />
      <Dancers />
      <Venue />
      <Tickets />
    </>
  );
}
