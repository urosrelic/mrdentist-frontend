import { IconDentalBroken } from '@tabler/icons-react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <Navbar />
      <div className='error-container'>
        <h1>ERROR 404: PAGE NOT FOUND</h1>
        <IconDentalBroken size={120} color='#10648c' />
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
