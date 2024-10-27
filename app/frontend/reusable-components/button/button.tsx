import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
}

export function Button({ className, href, children, type }: Props) {
const classes = `inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white hover:opacity-75 active:opacity-100 transition duration-100 ease-in-out ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
