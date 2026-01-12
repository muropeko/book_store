import React from 'react';
import { cn } from 'shared/lib/utils';

interface Props {
    className?: string;
    type: 'plus' | 'minus';
    onClick: () => void
}

export const CounterButton = ({className, type, onClick}: Props) => {
    return (
        <button
            onClick={onClick}
            className={cn(className, 
                "flex h-6 w-6 items-center justify-center border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:bg-stone-100 active:scale-90",

                )}
        >
        {type === 'plus' ? '+' : '-'}
        </button>
    );
};

