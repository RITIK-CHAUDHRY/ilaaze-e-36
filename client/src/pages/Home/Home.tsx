
import Navbar from '../../components/shared/Navbar';
import Hero from '../../components/shared/Hero';
import WhatWeOffer from '../../components/shared/WhatWeOffer';
import FeedbackForm from '../../components/FeedbackForm';

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhatWeOffer />
      <FeedbackForm />
    </div>
  );
}

export default Home;
