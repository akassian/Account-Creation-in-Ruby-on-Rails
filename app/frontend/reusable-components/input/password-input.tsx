import React, { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

import { ReactComponent as EyeIcon } from '../../../../public/static/icons/eye-solid.svg';
import { ReactComponent as EyeSlashIcon } from '../../../../public/static/icons/eye-slash-solid.svg';
import { InputType } from 'app/frontend/helpers/constants/input.enum';

interface Props extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  // Non-strength related error
  isError?: boolean;
  strength?: number;
  register?: UseFormRegisterReturn;
};

export function PasswordInput({ label, isError, strength, register, ...rest }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const id = label.replace(/ /gm, '_');

  // TODO: check if ms-edge shows its own eye icon
  const renderPasswordEye = () => {
    const IconComponent = showPassword ? EyeSlashIcon : EyeIcon;
    return (
      <IconComponent
        className="cursor-pointer h-5 w-5 fill-current text-slate-500"
        onMouseDown={(event) => {
          // Prevent password input from losing focus
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
            // Password is invalid length or strength 0
            'text-red-500': isError || rest.value && (strength ?? 0) < 2,
            // Password strength label coloring
            'text-yellow-500': rest.value && !isError && strength === 2,
            'text-lime-500': rest.value && !isError && strength === 3,
            'text-green-500': rest.value && !isError && strength === 4,
            // User has yet to enter anything
            'group-focus-within:text-[hsla(244,49%,49%,1)]': !rest.value && !isError,
            // User has yet to enter anything
            'text-slate-500': !rest.value && !isError,
          }
        )}
      >
        {label}
      </label>
      <input
        id={id}
        // TODO const file for common colors etc
        className={classNames(
          "block w-full p-2 pr-10 border-b-2 border-slate-300 focus:outline-none focus:border-b-2 transition duration-500 ease-in-out peer",
          {
            // Password is invalid length or strength 0
            'border-red-500': isError || rest.value && (strength ?? 0) < 2,
            // Password strength label coloring
            'border-orange-500': rest.value && !isError && strength === 1,
            'border-yellow-500': rest.value && !isError && strength === 2,
            'border-lime-500': rest.value && !isError && strength === 3,
            'border-green-500': rest.value && !isError && strength === 4,
            // User has yet to enter anything
            'focus:animate-focusBorderFlicker': !rest.value && !isError,
          }
        )}
        {...register}
        {...rest}
        type={showPassword ? InputType.Text : InputType.Password}
      />
      
      {/* Eye (toggle field visibility) */}
      {rest.value && (
        <div
          className="absolute inset-y-11 right-0 pr-3 flex items-center text-sm leading-5">
          {renderPasswordEye()}
        </div>
      )}
    </div>
  );
}
