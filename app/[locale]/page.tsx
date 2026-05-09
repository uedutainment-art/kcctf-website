import Hero from '@/components/Hero';
import Orchestras from '@/components/Orchestras';
import Schedule from '@/components/Schedule';
import Djs from '@/components/Djs';
import Dancers from '@/components/Dancers';
import Venue from '@/components/Venue';
import Tickets from '@/components/Tickets';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Orchestras />
      <Schedule />
      <Djs />
      <Dancers />
      <Venue />
      <Tickets />
    </>
  );
}
