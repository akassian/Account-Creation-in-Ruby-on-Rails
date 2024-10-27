import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  logo?: ReactNode;
  description?: string;
}

export function Card({ children, title, logo, description }: Props) {
  return (
    <section className="p-10 shadow-card min-h-[400px] w-full rounded-2xl border border-solid border-slate-200">
      {logo ? <div className="flex w-full justify-center mb-3">{logo}</div> : null}
      <h1 className="text-2xl font-medium font-bold m-0 mb-3 text-center">{title}</h1>
      <p className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>
      {children}
    </section>
  );
}
