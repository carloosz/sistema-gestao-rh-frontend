import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import ModalLogout from '@/components/Modals/ModalLogout/ModalLogout';
import { twMerge } from 'tailwind-merge';

const SidebarDesktop = () => {
  const pathName = usePathname();
  const { logout } = useAuth();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [extend, setExtend] = useState(false);

  return (
    <aside
      className={twMerge(
        'w-full hidden lg:flex fixed left-0 top-0 bottom-0 bg-primary rounded-r-[10px] border-primary p-[24px]! transition-all flex-col justify-between gap-[40px] z-[99]',
        extend ? 'items-start max-w-[220px]' : 'items-center max-w-[113px]',
      )}
      onMouseEnter={() => setExtend(true)}
      onMouseLeave={() => setExtend(false)}
    >
      {openLogoutModal && (
        <ModalLogout
          onConfirm={logout}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
      <div className="w-full flex flex-col gap-[16px]">
        <img
          className="max-w-[65px] mx-auto! mt-[20px]! mb-[80px]!"
          src="/img/logos/logo.svg"
          alt="RH+"
        />
        <div className="w-full flex flex-col gap-[40px]">
          <nav
            className={twMerge(
              'flex flex-col justify-center gap-[40px]',
              extend ? 'items-start' : 'items-center',
            )}
          >
            <Link
              href="/colaboradores"
              className={twMerge(
                'flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width hover:text-primary2 transition-normal',
                extend ? 'text-white' : 'text-transparent w-[44px]',
              )}
            >
              <img
                width={36}
                height={36}
                src={
                  pathName.match('/colaboradores') !== null
                    ? '/img/menu/users_active.svg'
                    : '/img/menu/users.svg'
                }
                alt=""
              />
              Colaboradores
            </Link>
            <Link
              href="/solicitacoes"
              className={twMerge(
                'flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width hover:text-primary2 transition-normal',
                extend ? 'text-white' : 'text-transparent w-[44px]',
              )}
            >
              <img
                width={36}
                height={36}
                src={
                  pathName.match('/solicitacoes') !== null
                    ? '/img/menu/requests_active.svg'
                    : '/img/menu/requests.svg'
                }
                alt=""
              />
              Solicitações
            </Link>
            <Link
              href="/termos"
              className={twMerge(
                'flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width hover:text-primary2 transition-normal',
                extend ? 'text-white' : 'text-transparent w-[44px]',
              )}
            >
              <img
                width={36}
                height={36}
                src={
                  pathName.match('/termos') !== null
                    ? '/img/menu/clip_active.svg'
                    : '/img/menu/clip.svg'
                }
                alt=""
              />
              Termos
            </Link>
            <Link
              href="/config"
              className={twMerge(
                'flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width hover:text-primary2 transition-normal',
                extend ? 'text-white' : 'text-transparent w-[44px]',
              )}
            >
              <img
                width={36}
                height={36}
                src={
                  pathName.match('/config') !== null
                    ? '/img/menu/gear_active.svg'
                    : '/img/menu/gear.svg'
                }
                alt=""
              />
              Configurações
            </Link>
          </nav>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpenLogoutModal(true)}
        className={twMerge(
          'flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width hover:text-primary2 mb-[67px]!',
          extend ? 'text-white' : 'text-transparent w-[44px]',
        )}
      >
        <img width={36} height={36} src="/img/menu/logout.svg" alt="" />
        Sair
      </button>
    </aside>
  );
};

export default SidebarDesktop;
