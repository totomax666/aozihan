import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export const NeoCard: React.FC<{
  children: ReactNode;
  className?: string;
  bg?: string;
  hover?: boolean;
}> = ({
  children,
  className = '',
  bg = 'bg-white',
  hover = true
}) => {
  return (
    <div
      className={`border-[3px] border-dark rounded-none shadow-[6px_6px_0_0_#000] ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0_0_#000]' : ''
      } ${bg} ${className}`}
    >
      {children}
    </div>
  );
}

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function NeoButton({
  children,
  className = '',
  variant = 'primary',
  ...props
}: NeoButtonProps) {
  const vClass = {
    primary: 'bg-neo-yellow text-dark hover:bg-neo-pink',
    secondary: 'bg-white text-dark hover:bg-gray-100',
    dark: 'bg-dark text-white hover:bg-neo-blue',
  }[variant];

  return (
    <button
      className={`px-6 py-3 font-bold border-[3px] border-dark rounded-none shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none ${vClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export const NeoBadge: React.FC<{ children: ReactNode, color?: string, className?: string }> = ({ children, color = 'bg-neo-green', className = '' }) => {
  return (
    <span className={`inline-block px-3 py-1 border-[2px] border-dark rounded-none text-xs font-bold uppercase ${color} ${className}`}>
      {children}
    </span>
  );
}

export function HighlightText({ children, color = 'bg-neo-yellow' }: { children: ReactNode, color?: string }) {
  return (
    <span className="relative inline-block z-10 px-1">
      <span className={`absolute bottom-1 left-0 w-full h-3/5 ${color} -z-10`}></span>
      {children}
    </span>
  );
}
