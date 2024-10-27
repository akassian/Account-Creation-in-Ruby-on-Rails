import React, { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

interface Props {
  label: string;
  onChange?: (value: string) => void;
  isError?: boolean;
  register?: UseFormRegisterReturn;
  autoFocus?: boolean;
};

export function Input({ label, onChange, isError, register, autoFocus }: Props) {
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }
  return (
    <div>
      <label className="block text-sm text-slate-500">{label}</label>
      <input
        id={id}
        // TODO const file for common colors etc
        className={classNames(
          "block w-full p-2 border-b-2 border-slate-300 focus:outline-none focus:border-b-2 transition ease-in-out",
          {
            'focus:animate-errorFlicker': isError,
            'focus:animate-focusFlicker': !isError,
          }
        )}
        onChange={handleChange}
        {...register}
        autoFocus={autoFocus}
      />
    </div>
  );
}
