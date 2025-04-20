import Navbar from '@/components/shared/Navbar';
import Footer from './shared/footer'; 
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col justify-between">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
