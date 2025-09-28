import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import ModalLogout from '../Modals/ModalLogout/ModalLogout';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathName = usePathname();
  const { logout } = useAuth();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <aside className="fixed w-[113px] left-0 top-0 bottom-0 bg-primary rounded-r-[10px] border-primary p-[24px]! transition-all flex flex-col justify-between gap-[40px] z-[99]">
      {openLogoutModal && (
        <ModalLogout
          onConfirm={logout}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
      <div className="flex flex-col gap-[40px]">
        <nav className="flex flex-col justify-center items-center mt-[156px]! gap-[40px]">
          <Link
            href="/colaboradores"
            className="flex gap-[8px] items-center text-start w-[48px]  h-[48px] transition-width text-primary4 hover:text-primary2"
          >
            <img
              width={48}
              height={48}
              src={
                pathName.match('/colaboradores') !== null
                  ? '/img/menu/users_active.svg'
                  : '/img/menu/users.svg'
              }
              alt=""
            />
          </Link>
          <Link
            href="/solicitacoes"
            className="flex gap-[8px] items-center text-start w-[48px]  h-[48px] transition-width text-primary4 hover:text-primary2"
          >
            <img
              width={48}
              height={48}
              src={
                pathName.match('/solicitacoes') !== null
                  ? '/img/menu/requests_active.svg'
                  : '/img/menu/requests.svg'
              }
              alt=""
            />
          </Link>
        </nav>
      </div>
      <button
        type="button"
        onClick={() => setOpenLogoutModal(true)}
        className="flex gap-[8px] items-center text-start w-[48px] h-[48px] transition-width text-primary4 hover:text-primary2 mb-[67px]!"
      >
        <img width={48} height={48} src="/img/menu/logout.svg" alt="" />
      </button>
    </aside>
  );
};

export default Sidebar;
