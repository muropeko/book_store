import React from 'react';
import { Title } from '../title';
import { cn } from 'shared/lib/utils';

interface IProps {
    className?: string;
    text?: string;
    children: React.ReactNode
}

export const OrderSectionWrapper = ({ className, text, children}: IProps) => {
    return (
        <div className={cn( className, "bg-white border border-gray-300 p-5 rounded-lg shadow-md")}>
            { text && <Title text={text} size="xs" className='mb-5 font-semibold text-gray-700'/>}
            {children}
        </div>
    );
};

