// import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import AppLayout from '../layouts/AppLayout';
import AppFooter from '../components/AppFooter';
// import AppSideBar from '../components/AppSideBar';

function Root() {
  return (
    <div className="container">
      <AppNavbar />
      <AppLayout />
      <AppFooter />
    </div>
  );
}

export default Root;
