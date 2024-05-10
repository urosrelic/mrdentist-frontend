import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
