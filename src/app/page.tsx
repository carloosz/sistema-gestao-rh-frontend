'use client';

import React from 'react';
import LoginForm from '@/components/Forms/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <main className="bg-primary2 flex">
      <div className="w-[375px] bg-primary rounded-r-[50px] h-dvh p-[36px]! flex flex-col items-start justify-center no-scrollbar overflow-auto">
        <span className="block text-[40px] text-secondary font-black">RH+</span>
        <span className="block text-[22px] text-secondary font-normal mb-[96px]!">
          Administrador
        </span>
        <LoginForm />
      </div>
      <div className="flex flex-col items-center justify-end px-[80px]! mx-auto!">
        <h1 className="font-normal text-[36px] text-center text-white w-full">
          Conectando talentos e oportunidades
        </h1>
        <img
          className="w-full max-h-full"
          src="/img/examples/login_banner.png"
          alt="Login banner"
        />
      </div>
    </main>
  );
};

export default LoginPage;
