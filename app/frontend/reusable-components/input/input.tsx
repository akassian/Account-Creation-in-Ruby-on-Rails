import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

interface Props extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  isError?: boolean;
  strength?: number;
  register?: UseFormRegisterReturn;
};

export function Input({ label, isError, strength, register, ...rest }: Props) {
  const id = label.replace(/ /gm, '_');

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={classNames("block text-sm",
          {
            'text-red-500': isError,
            'text-slate-500': !isError,
            'group-focus-within:text-[hsla(244,49%,49%,1)]': !isError,
          }
        )}
      >
        {label}
      </label>
      <input
        id={id}
        // TODO const file for common colors etc
        className={classNames(
          "block w-full p-2 border-b-2 focus:outline-none focus:border-b-2 transition duration-500 ease-in-out peer",
          {
            'focus:animate-errorBorderFlicker': isError,
            'border-red-500': isError,
            'focus:animate-focusBorderFlicker': !isError,
            'border-slate-300': !isError,
          }
        )}
        {...register}
        {...rest}
      />
    </div>
  );
}
