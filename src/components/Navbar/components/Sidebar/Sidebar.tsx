import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import './Sidebar.css';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const { isAuthenticated, logout, userRole } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={sidebarOpen ? 'sidebar open' : 'sidebar'}>
      <div className='sidebar-options'>
        <Link to='/' className='sidebar-option'>
          Home
        </Link>
        <Link to='/about' className='sidebar-option'>
          About Us
        </Link>
        <Link to='/contact' className='sidebar-option'>
          Contact
        </Link>
        {isAuthenticated ? (
          <>
            <Link
              to={`${
                userRole === 'patient'
                  ? '/patient-dashboard'
                  : '/dentist-dashboard'
              }`}
              className='sidebar-option'
            >
              Dashboard
            </Link>
            <Link
              to='/'
              className='sidebar-option login-btn'
              onClick={handleLogout}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link to='/login' className='sidebar-option login-btn'>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
