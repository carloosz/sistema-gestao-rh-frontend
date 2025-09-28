import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonStyle?: KeyofButtonStyles;
}

const buttonStyles = {
  secondary: 'bg-secondary',
  warning: 'bg-warning2',
};

type KeyofButtonStyles = keyof typeof buttonStyles;

const Button = ({
  buttonStyle = 'secondary',
  type = 'button',
  children,
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      className={twMerge(
        `flex gap-[16px] items-center justify-center  text-primary font-normal text-[20px] rounded-[10px] p-[13px_22px]! h-[50px]`,
        buttonStyles[buttonStyle],
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
