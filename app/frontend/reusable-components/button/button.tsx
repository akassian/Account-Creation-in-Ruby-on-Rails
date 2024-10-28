import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Optional props passthrough for <button>
interface Props extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string;
  href?: string;
  children: ReactNode;
}

export function Button({ className, href, children, ...rest }: Props) {
  const navigate = useNavigate();
  const classes = `inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white disabled:cursor-not-allowed disabled:opacity-50 hover:scale-[1.01] hover:opacity-80 active:opacity-100 active:scale-[.98] transition duration-500 ease-in-out ${className}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      event.preventDefault();
      navigate(href);
    }
  };

  return (
    <button onClick={handleClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
