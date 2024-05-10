import './Hero.css';
import BookingSection from './components/BookingSection/BookingSection';
import HealthSection from './components/HealthSection/HealthSection';
import Slogan from './components/Slogan/Slogan';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-container'>
        <Slogan />
      </div>
      <div className='hero-container'>
        <HealthSection />
      </div>
      <div className='hero-container'>
        <BookingSection />
      </div>
    </div>
  );
};

export default Hero;
