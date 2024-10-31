import React, { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

import { InputType } from '../../helpers/constants/input.enum';

import { ReactComponent as EyeIcon } from '../../../../public/static/icons/eye-solid.svg';
import { ReactComponent as EyeSlashIcon } from '../../../../public/static/icons/eye-slash-solid.svg';

interface Props extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  isError?: boolean;
  strength?: number | null;
  register?: UseFormRegisterReturn;
  value?: string;
}

export function PasswordInput({ label, isError, strength=null, register, value, ...rest }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const id = label.replace(/ /gm, '_');

  // TODO: check if ms-edge shows its own eye icon
  const renderPasswordEye = () => {
    const IconComponent = showPassword ? EyeSlashIcon : EyeIcon;
    return (
      <IconComponent
        className={classNames(
          "cursor-pointer h-5 w-5 fill-current text-slate-500"
        )}
        // Toggle visibility + prevent input losing focus
        onMouseDown={(event) => {
          event.preventDefault();
          setShowPassword(!showPassword)
        }}
      />
    );
  }

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={classNames("block text-sm transition duration-500 ease-in-out peer",
          {
            // Password invalid length or strength weak/very weak
            'text-red-500': isError || value && (strength ?? 0) < 2,
            // Password strength
            'text-yellow-500': value && !isError && strength === 2,
            'text-lime-500': value && !isError && strength === 3,
            'text-green-500': value && !isError && strength === 4,
            // Strength based input: No error, user has yet to enter anything
            // Non-strength based input: No error
            'group-focus-within:text-[hsla(244,49%,49%,1)]': !isError && (!value || strength === null),
            'text-slate-500': !isError && (!value || strength === null),
          }
        )}
      >
        {label}
      </label>
      <input
        id={id}
        // TODO const file for common colors etc
        className={classNames(
          "block w-full p-2 pr-10 border-b-2 focus:outline-none focus:border-b-2 transition duration-500 ease-in-out peer",
          {
            // Password invalid length or strength weak/very weak
            'border-red-500': isError || value && (strength ?? 0) < 2,
            // Password strength
            'border-yellow-500': value && !isError && strength === 2,
            'border-lime-500': value && !isError && strength === 3,
            'border-green-500': value && !isError && strength === 4,
            // Strength based input: No error, user has yet to enter anything
            // Non-strength based input: No error
            'focus:animate-focusBorderFlicker': !isError && (!value || strength === null),
            'border-slate-300': !isError && (!value || strength === null),
          }
        )}
        {...register}
        {...rest}
        type={showPassword ? InputType.TEXT : InputType.PASSWORD}
      />
      
      {/* Eye to toggle visibility */}
      {value && (
        <div
          className="absolute inset-y-11 right-0 pr-3 flex items-center text-sm leading-5">
          {renderPasswordEye()}
        </div>
      )}
    </div>
  );
}
