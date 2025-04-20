import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/footer'; 
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
