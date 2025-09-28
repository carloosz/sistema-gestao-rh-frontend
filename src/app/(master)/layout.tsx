'use client';

import Sidebar from '@/components/Sidebar/Sidebar';

const MasterRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-dvh bg-primary2 overflow-auto">
      <Sidebar />
      <div>
        <div className="min-w-[1200px] pl-[136px]! pr-[24px]! pt-[32px]!">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MasterRootLayout;
