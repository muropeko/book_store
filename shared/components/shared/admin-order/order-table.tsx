import React from 'react';
import { cn } from 'shared/lib/utils';

interface DataProps {
  label: string;
  value: React.ReactNode;
}

interface IProps {
  className?: string;
  data: DataProps[];
}

export const OrderTable = ({ data, className }: IProps) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {data.map((d, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center"
        >
          <div className="text-sm font-medium text-gray-500 flex-shrink-0">
            {d.label}
          </div>

          <div className="text-base text-gray-900 text-right flex-1">
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
};
