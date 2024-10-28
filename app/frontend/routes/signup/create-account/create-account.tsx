import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// TODO: lazy load zxcvbn - has a large import cost
import zxcvbn from 'zxcvbn';

import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import { verbalPasswordStrength } from '../../../helpers/mappers/password-strength.ts';

import { ReactComponent as WealthfrontLogo } from '../../../../../public/static/icons/wealthfront.svg';
import { ReactComponent as InfoIcon } from '../../../../../public/static/icons/circle-info-solid.svg';
import { PasswordInput } from 'app/frontend/reusable-components/input/password-input.tsx';
import Tooltip from 'app/frontend/reusable-components/tooltip/tooltip.tsx';
import { Direction } from 'app/frontend/helpers/constants/directions.enum.ts';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

//TODO: accessibility, password strength meter, password validation, username validation, username availability check
export function CreateAccount() {
  // TODO: disable inputs when api is loading
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordTooltipOpen, setPasswordTooltipOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { control, register, handleSubmit, formState: { errors, isValid }, watch, trigger } = useForm<FormData>({
    // TODO: debounce input change triggers
    mode: 'all',
  });

  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');
  const passwordAnalysis = zxcvbn(passwordValue);

  useEffect(() => {
    console.log("triggered");
    passwordValue && trigger('password');
  }, [passwordValue, passwordAnalysis.score]);

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    isValid && navigate("/signup/create-user");
  };

  const renderUsernameField = () => (
    <div className="space-y-5 form-group">
      {/* TODO: only alphanumeric username characters */}
      <Input
        label="Username"
        isError={!!errors.username}
        register={
          register('username', { required: 'Username is required', minLength: { value: 10, message: 'Username must be at least 10 characters' }, maxLength: { value: 50, message: 'Username must not exceed 50 characters' } })
        }
        autoFocus={true}
      />
      {/* Username input error message */}
      <div className="min-h-[4px]">
        {errors.username && <div className="text-red-500 text-xs -mt-3">{errors.username.message}</div>}
      </div>
    </div>
  );

  const renderPasswordField  = () => (
    <div className="space-y-5 form-group">
      {/* Controlled, allowing conditional rendering of Eye */}
      {/* <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: { value: 20, message: 'Password must be at least 20 characters' },
          maxLength: { value: 50, message: 'Password must not exceed 50 characters' },
          validate: {
            passwordStrength: () => passwordAnalysis.score >= 2 || "",
          }
        }}
        render={({ field }) => (
          <PasswordInput
            label="Password"
            strength={passwordAnalysis.score}
            register={register('password')}
            isError={!!errors.password}
            {...field}
          />
        )}
      /> */}

      <PasswordInput
        label="Password"
        value={passwordValue}
        strength={passwordAnalysis.score}
        isError={!!errors.password}
        register={
          register('password', {
            required: 'Password is required',
            minLength: { value: 20, message: 'Password must be at least 20 characters' },
            maxLength: { value: 50, message: 'Password must not exceed 50 characters' },
            validate: {
              passwordStrength: () => passwordAnalysis.score >= 2 || "",
            }
          })
        }
      />


      {/* Password error message */}
      <div className="min-h-[4px]">
        <div className="-mt-3">
          {errors.password &&
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          }
          {/* Password strength error messages */}
          {passwordValue && errors.password?.type !== 'maxLength' && errors.password?.type !== 'minLength' &&
            <div className={classNames(
              "text-xs flex",
              {
                // Password strength message coloring
                'text-red-500': passwordAnalysis.score < 2,
                'text-yellow-500': passwordAnalysis.score === 2,
                'text-lime-500': passwordAnalysis.score === 3,
                'text-green-500': passwordAnalysis.score === 4,
                }
            )}>
              {passwordAnalysis.score < 2 &&
                <Tooltip
                  direction={Direction.Left}
                  isOpen={passwordTooltipOpen}
                  setOpen={setPasswordTooltipOpen}
                  content={
                    <>
                      {passwordAnalysis.feedback?.warning}.
                      <ul>
                        {passwordAnalysis.feedback?.suggestions.map((suggestion, index) => (
                        <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </>
                  }
                  button={<InfoIcon className="cursor-pointer h-4 w-4 fill-current mr-1" />}
                />
              }
              {verbalPasswordStrength(passwordAnalysis.score)}
            </div>
          }
        </div>
      </div>
    </div>
  );

  const renderConfirmPasswordField  = () => (
    <div className="space-y-5 form-group">
      {/* Controlled, allowing conditional rendering of Eye */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: 'Password confirmation is required',
          validate: {
            match: () => confirmPasswordValue === passwordValue || "Passwords do not match",
          }
        }}
        render={({ field }) => (
          <PasswordInput
            label="Confirm password"
            register={register('confirmPassword')}
            isError={!!errors.confirmPassword}
            {...field}
          />
        )}
      />

      {/* Password error message */}
      <div className="min-h-[4px]">
        <div className="-mt-3">
          {errors.confirmPassword &&
            <div className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </div>
          }
        </div>
      </div>
    </div>
  );

  console.log("errors", errors);
  console.log("passwordAnalysis.score", passwordAnalysis.score);

  return (
    <FlowLayout>
      {/* TODO: mobile responsiveness */}
      <div className="max-w-[500px] mx-auto">
        <Card title="Create New Account" logo={<WealthfrontLogo className="h-12 w-12" />}>
          {/* TODO: disable/loading upon submit, investigate TODO, bot detection, input sanitizing, sanitize on ruby side */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6">
            {renderUsernameField()}
            {renderPasswordField()}
            {renderConfirmPasswordField()}
            <Button disabled={loading} type="submit" className="rounded-xl w-full text-center py-4">
              Create Account
            </Button>
          </form>
        </Card>
      </div>
    </FlowLayout>
  );
}
