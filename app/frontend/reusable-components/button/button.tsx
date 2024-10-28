import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Optional props passthrough for <button>
interface Props extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string;
  href?: string;
  children: ReactNode;
}

export function Button({ className, href, children, type, ...rest }: Props) {
  const navigate = useNavigate();
  const classes = `inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white hover:opacity-75 active:opacity-100 transition duration-100 ease-in-out ${className}`;

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
