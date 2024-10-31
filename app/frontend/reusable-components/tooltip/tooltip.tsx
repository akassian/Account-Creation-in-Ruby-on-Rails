import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { Direction } from '../../helpers/constants/directions.enum';

interface TooltipProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    content: React.ReactNode;
    button: React.ReactNode;
    direction?: Direction;
}

const Tooltip: React.FC<TooltipProps> = ({ isOpen, setOpen, content, button, direction = Direction.DOWN }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                // Close the tooltip when clicking outside
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [button]);

    return (
        <div ref={tooltipRef} className="relative mt-0.25">
            {/* Clickable toggle tooltips are more accessible */}
            <div onClick={() => setOpen(!isOpen)}>
                {button}
            </div>
            {isOpen && (
                <div
                    className={classNames(
                        'absolute mt-2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg z-10',
                        {
                            'left-0': direction === Direction.DOWN,
                            '-top-10 right-8': direction === Direction.LEFT
                        }
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;