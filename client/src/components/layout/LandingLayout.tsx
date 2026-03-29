import { Outlet } from 'react-router-dom';

export function LandingLayout() {
  return (
    <div className="landing-page flex flex-col min-h-screen bg-[#050a14] text-gray-100 overflow-y-auto">
      <Outlet />
    </div>
  );
}
