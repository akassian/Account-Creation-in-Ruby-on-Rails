import { Variant } from '../../helpers/constants/colors.enum';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { ReactComponent as ExclamationIcon } from '../../../../public/static/icons/exclamation-triangle-solid.svg';

interface BannerProps {
    content: ReactNode;
    variant?: Variant;
    hidden?: boolean;
}

export function Banner({ content, variant=Variant.ERROR, hidden=false }: BannerProps) {
    return (
        <div className={classNames(
            "text-center shadow-card border rounded transition-all duration-500 ease-in-out",
            {
                'border-red-500 bg-red-100 text-red-700': variant === Variant.ERROR,
                // Animate drop-in
                'opacity-0 max-h-0': hidden,
                'p-4 mb-4 opacity-100 max-h-40': !hidden,
            }
          )}
        >
            {variant === Variant.ERROR && content && <ExclamationIcon className="h-3.5 w-3.5 fill-current inline-block mr-3 mb-1" />}
            {content}
        </div>
    );
}
