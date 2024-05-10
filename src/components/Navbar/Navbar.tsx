import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import './Navbar.css';
import Sidebar from './components/Sidebar/Sidebar';
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className='navbar'>
        <div className='navbar-logo'>
          {/* PLACEHOLDER */}
          <h1 style={{ color: '#10648c' }}>MR DENTIST</h1>
        </div>
        <div className='navbar-menu' onClick={handleSidebarToggle}>
          {sidebarOpen ? (
            <IconX cursor='pointer' />
          ) : (
            <IconMenu2 cursor='pointer' />
          )}
        </div>
      </div>
      <Sidebar sidebarOpen={sidebarOpen} />
    </>
  );
};

export default Navbar;
