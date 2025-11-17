'use client';

import Sidebar from '@/components/Sidebar/Sidebar';

const MasterRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-dvh bg-primary2 pb-[60px]! lg:pb-[0]! overflow-auto">
      <Sidebar />
      <div>
        <div className="lg:min-w-[1200px] p-[24px]! lg:pl-[136px]! lg:pr-[24px]!lg:pt-[32px]!">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MasterRootLayout;
