import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-[52px] rounded-[46px] outline-none border-none ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}
