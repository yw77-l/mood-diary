import { Outlet } from 'react-router-dom';
import Header from './Header';
import TabBar from './TabBar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 pb-24">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}
