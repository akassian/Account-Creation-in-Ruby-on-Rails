import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// TODO: lazy load zxcvbn - has a large import cost
import zxcvbn from 'zxcvbn';

import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import { verbalPasswordStrength } from '../../../helpers/mappers/password-strength.ts';
import { PasswordInput } from '../../../reusable-components/input/password-input.tsx';
import Tooltip from '../../../reusable-components/tooltip/tooltip.tsx';
import { Direction } from '../../../helpers/constants/directions.enum.ts';
import { 
  minUsernameLength,
  maxUsernameLength,
  minPasswordLength,
  maxPasswordLength,
  minPasswordStrength
 } from '../../../../assets/config/account.json';

import { ReactComponent as WealthfrontLogo } from '../../../../../public/static/icons/wealthfront.svg';
import { ReactComponent as InfoIcon } from '../../../../../public/static/icons/circle-info-solid.svg';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

/* TODO: 
accessibility,
mobile styling,
password character restriction,
password <-> username commonality check,
username character restriction,
username availability check,
password symbol requirements
disable/loading upon submit,
bot detection/prevention,
input sanitizing,
sanitize on ruby side 
*/
export function CreateAccount() {
  // TODO: disable inputs when api is loading
  // const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmPasswordBlock, setShowConfirmPasswordBlock] = useState<boolean>(false);
  const [passwordTooltipOpen, setPasswordTooltipOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = useForm<FormData>({
    // TODO: debounce input change triggers
    mode: 'all',
  });

  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');
  const passwordAnalysis = zxcvbn(passwordValue);

  useEffect(() => {
    passwordValue && trigger('password');
  }, [passwordValue, passwordAnalysis.score]);

  useEffect(() => {
    // Drop-in confirm password field once password is valid length and has a valid strength
    !showConfirmPasswordBlock
    && passwordValue
    && !errors.password
    && passwordAnalysis.score >= minPasswordStrength
    && setShowConfirmPasswordBlock(true);
  }, [passwordValue, errors.password]);

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    isValid && navigate("/signup/create-user");
  };

  const renderUsernameField = () => (
    <div className="space-y-5 form-group">
      <Input
        label="Username"
        isError={!!errors.username}
        register={
          register('username', {
            required: 'Username is required',
            minLength: { value: minUsernameLength, message: `Username must be at least ${minUsernameLength} characters` },
            maxLength: { value: maxUsernameLength, message: `Username must not exceed ${maxUsernameLength} characters` }
          })
        }
        autoFocus={true}
      />
      {/* Username input error message */}
      <div className="min-h-[4px]">
        {errors.username &&
          <div className="text-red-500 text-xs -mt-3">
            {errors.username.message}
          </div>
        }
      </div>
    </div>
  );

  const renderPasswordField  = () => (
    <div className="space-y-5 form-group">
      <PasswordInput
        label="Password"
        value={passwordValue}
        strength={passwordAnalysis.score}
        isError={!!errors.password}
        register={
          register('password', {
            required: 'Password is required',
            minLength: { value: minPasswordLength, message: `Password must be at least ${minPasswordLength} characters` },
            maxLength: { value: maxPasswordLength, message: `Password must not exceed ${maxPasswordLength} characters` },
            validate: {
              passwordStrength: () => passwordAnalysis.score >= minPasswordStrength || "",
            }
          })
        }
      />

      {/* Password error message */}
      <div className="min-h-[16px]">
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
    <div className={classNames(
        "space-y-5 form-group transition-all duration-1000 ease-in-out",
        {
          // Animate Confirm Password field pop-in
          'opacity-0 max-h-0': !showConfirmPasswordBlock,
          'opacity-100 max-h-40': showConfirmPasswordBlock,
        }
      )}
    >
      <PasswordInput
        label="Confirm password"
        value={confirmPasswordValue}
        isError={!!errors.confirmPassword}
        register={
          register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: (val: string) => {
              if (watch('password') != val) {
                return "Passwords do not match";
              }
            },
          })
        }
      />

      {/* Password error message */}
      <div className="min-h-[16px]">
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
      <div className="max-w-[500px] mx-auto">
        <Card title="Create New Account" logo={<WealthfrontLogo className="h-12 w-12" />}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6">
            {renderUsernameField()}
            {renderPasswordField()}
            {renderConfirmPasswordField()}
            <div className={classNames("transition duration-500 ease-in-out",
                // Lighten button while form is not yet valid
                // It is a good practice to not disable the form button until submission
                // Allows for manual form validation triggering / focus jumping
                {
                  'opacity-50': !isValid,
                }
              )}
            >
              <Button disabled={loading} type="submit" className="rounded-xl w-full text-center py-4">
                Create Account
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </FlowLayout>
  );
}
