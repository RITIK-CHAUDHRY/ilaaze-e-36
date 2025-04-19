import Hero from '@/components/shared/Hero';
import Navbar from '@/components/shared/Navbar';
import WhatWeOffer from '@/components/shared/WhatWeOffer';
import SuggestionForm from '@/components/shared/SuggestionForm';

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhatWeOffer />
      <SuggestionForm />
    </div>
  );
}

export default Home;
