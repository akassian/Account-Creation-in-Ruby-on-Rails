import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
// TODO: lazy load zxcvbn - has a large import cost
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from 'react-google-recaptcha';

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
import { RootState } from '../../../store.ts';
import { createAccount } from '../../../slices/createAccountSlice.ts';
import { AppDispatch } from '../../../store.ts';
import { Routes, Status } from '../../../helpers/constants/routes.enum.ts';
import { Banner } from '../../../reusable-components/banner/banner.tsx';
import { alphaNumericRegex, onKeyDownAlphanumeric, onKeyDownAlphanumericSafeSymbols, passwordSymbolRequirementsRegex } from '../../../helpers/input/input-helper.ts';

import { ReactComponent as WealthfrontLogo } from '../../../../../public/static/icons/wealthfront.svg';
import { ReactComponent as InfoIcon } from '../../../../../public/static/icons/circle-info-solid.svg';
import { getFirstErrorMessage } from '../../../helpers/axios/error.ts';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

// TODO: replace with real key, encrypt in credentials.yml
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

/** TODO:
* error handling,
* migrate inline style to css/scss files,
* accessibility,
* mobile responsive styling,
* additional bot detection/prevention/honeypot,
*/
export function CreateAccount() {
  const { loading, error } = useSelector((state: RootState) => state.createAccount);
  const [showConfirmPasswordBlock, setShowConfirmPasswordBlock] = useState<boolean>(false);
  const [passwordTooltipOpen, setPasswordTooltipOpen] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = useForm<FormData>({
    // TODO: debounce input change triggers
    mode: 'all',
  });

  const isValidAndRecaptchaComplete = isValid && recaptchaToken;
  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');
  const passwordAnalysis = zxcvbn(passwordValue);

  useEffect(() => {
    // Retrigger strength validation on password change
    passwordValue && trigger('password');
    // Updating Password if Confirm Password filled retriggers validation on Confirm Password
    passwordValue && confirmPasswordValue && trigger('confirmPassword');
  }, [passwordValue, passwordAnalysis.score]);

  // Drop-in Confirm Password field once password valid length / strength
  useEffect(() => {
    !showConfirmPasswordBlock
    && passwordValue
    && !errors.password
    && passwordAnalysis.score >= minPasswordStrength
    && setShowConfirmPasswordBlock(true);
  }, [passwordValue, errors.password]);

  const onSubmit = (data: FormData) => {
    const { confirmPassword, ...accountData } = data;

    if (isValidAndRecaptchaComplete) {
      dispatch(createAccount({...accountData, recaptchaToken })).then((result) => {
        if (result.meta.requestStatus === Status.FULFILLED)
          navigate(Routes.ACCOUNT_SELECTION);
      });
    }
  };

  const renderUsernameField = () => (
    <div className="space-y-5 form-group">
      <Input
        label="Username"
        disabled={loading}
        isError={!!errors.username}
        onKeyDown={onKeyDownAlphanumeric}
        register={
          register('username', {
            required: 'Required',
            minLength: { value: minUsernameLength, message: `Must be at least ${minUsernameLength} characters` },
            maxLength: { value: maxUsernameLength, message: `Must not exceed ${maxUsernameLength} characters` },
            pattern: {
              value: alphaNumericRegex,
              message: 'Must contain only alphanumeric characters'
            }
          })
        }
        autoFocus={true}
      />
      {/* Username error message */}
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
        disabled={loading}
        value={passwordValue}
        strength={passwordAnalysis.score}
        isError={!!errors.password}
        onKeyDown={onKeyDownAlphanumericSafeSymbols}
        register={
          register('password', {
            required: 'Required',
            minLength: { value: minPasswordLength, message: `Must be at least ${minPasswordLength} characters` },
            maxLength: { value: maxPasswordLength, message: `Must not exceed ${maxPasswordLength} characters` },
            pattern: {
              value: passwordSymbolRequirementsRegex,
              message: 'Must contain a letter, number, and a symbol'
            },
            validate: {
              passwordStrength: () => passwordAnalysis.score >= minPasswordStrength || "",
              passwordEqualsUsername: (val: string) =>  val.toLowerCase() !== watch('username').toLowerCase() || "Must not be the same as the username"
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
          {passwordValue
            && errors.password?.type !== 'maxLength'
            && errors.password?.type !== 'minLength' &&
            <div className={classNames(
              "text-xs flex",
              {
                'text-red-500': passwordAnalysis.score < 2,
                'text-yellow-500': passwordAnalysis.score === 2,
                'text-lime-500': passwordAnalysis.score === 3,
                'text-green-500': passwordAnalysis.score === 4,
                }
            )}>
              {passwordAnalysis.score < 2 &&
                <Tooltip
                  direction={Direction.LEFT}
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
      // Animate Confirm Password field drop-in
      "space-y-5 form-group transition-all duration-1000 ease-in-out",
      {
        'opacity-0 max-h-0': !showConfirmPasswordBlock,
        'opacity-100 max-h-40': showConfirmPasswordBlock,
      }
      )}
    >
      <PasswordInput
      label="Confirm Password"
      disabled={loading}
      value={confirmPasswordValue}
      isError={!!errors.confirmPassword}
      onKeyDown={onKeyDownAlphanumericSafeSymbols}
      register={
        register('confirmPassword', {
        required: 'Required',
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

      {/* reCAPTCHA */}
      <ReCAPTCHA
        className="flex justify-center"
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={setRecaptchaToken}
      />
    </div>
  );

  return (
    <FlowLayout>
      <div className="max-w-[500px] mx-auto">
        <Banner content={error ? getFirstErrorMessage(error) : ""} hidden={!error} />
        <Card title="Create New Account" logo={<WealthfrontLogo className="h-12 w-12" />}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6">
            {renderUsernameField()}
            {renderPasswordField()}
            {renderConfirmPasswordField()}
            <div className={classNames("transition duration-500 ease-in-out",
                // Visually lighten button while form is not yet valid
                // It is a good practice to NOT fully disable the form button until submission
                // Allows for manual user form validation triggering / focus jumping
                {
                  'opacity-50': !isValidAndRecaptchaComplete,
                }
              )}
            >
              <Button disabled={loading} type="submit" className="rounded-xl w-full text-center py-4 mt-4">
                Create Account
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </FlowLayout>
  );
}
