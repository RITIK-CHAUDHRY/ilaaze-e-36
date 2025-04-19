import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16"> 
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
