import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';
import { Routes } from '../../../helpers/constants/routes.enum.ts';

export function CreateUser() {
  return (
    <FlowLayout>
      <Card title="What's your first and last name?">
        <div className="space-y-2">
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email" />
          <Button href={Routes.JOINT_ACCESS}>Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
