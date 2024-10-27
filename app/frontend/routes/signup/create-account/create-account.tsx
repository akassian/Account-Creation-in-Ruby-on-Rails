import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import { ReactComponent as WealthfrontLogo } from '../../../../../public/static/icons/wealthfront.svg';
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

export function CreateAccount() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    // TODO: debounce input change triggers
    mode: 'onChange',
  });
  console.log(errors);

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <FlowLayout>
      {/* TODO: mobile responsiveness */}
      <div className="max-w-[600px] mx-auto">
        <Card title="Create New Account" logo={<WealthfrontLogo className="h-12 w-12" />}>
          {/* TODO: disable/loading upon submit, investigate TODO, bot detection, input sanitizing, sanitize on ruby side */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6">
            {/* Username input */}
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
              {/* Username input error message placeholder */}
              <div className="min-h-[4px]">
                {errors.username && <div className="text-red-500 text-xs -mt-3">{errors.username.message}</div>}
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-5 form-group">
              <Input
                // type="password"
                // name="password"
                label="Password"
                isError={!!errors.password}
                register={
                  register('password', { required: 'Password is required', minLength: { value: 20, message: 'Password must be at least 10 characters' }, maxLength: { value: 50, message: 'Password must not exceed 50 characters' } })
                }
                // className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full p-2"
                // disabled={pending}
                // required={true}
                // onChange={(value) => handleChange('password', value)}
              />
              {/* Password error message placeholder */}
              <div className="min-h-[4px]">
                {errors.password && <div className="text-red-500 text-xs -mt-3">{errors.password.message}</div>}
              </div>
            </div>
            {/* Password strength block */}
            {/* <PasswordStrengthMeter passwordValue={formState.password} /> */}

            <Button className="rounded-xl w-full text-center py-4" href="/signup/create-user">Create Account</Button>
          </form>
        </Card>
      </div>
    </FlowLayout>
  );
}
