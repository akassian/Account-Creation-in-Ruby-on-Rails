import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';

export function StockRestrictions() {
  return (
    <FlowLayout>
      <Card
        title="Are you restricted from trading any stocks?"
        description="If you are a broker dealer or registered representative of another company, you may be restricted from trading that stock."
      >
        {/*<li>style UI to look like given mock, make sure the typeahead is realtime feeling search</li>*/}
        <div className="space-y-2">
          <Input label="Stock Symbol" />
          <Button href={Routes.DEPOSIT}>Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
