'use client';

import React from 'react';
import { cn } from 'shared/lib/utils';
import { Title } from './title';
import { AccordionContent, AccordionItem, AccordionTrigger, Checkbox } from '@components/ui';
import { FilterOption } from 'app/(root)/books/page';
import { IFilters } from 'shared/hooks/use-filter';
import { useFilter } from 'shared/hooks';

type FilterKeys = keyof IFilters;

interface Props {
    className?: string;
    filterLabel: string;
    options?: FilterOption[];
    filterType: FilterKeys;
}

export const FilterSelector = ({ className, filterLabel, options, filterType}: Props) => {
    const { filters, setFilters } = useFilter();

    return (
        <div className={cn(className)}>
            <AccordionItem value={filterLabel}>
                <AccordionTrigger>
                    <Title text={filterLabel} />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {options?.map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center gap-2 hover:text-red-600 transition duration-300 cursor-pointer"
                      >
                        <Checkbox
                            id={`checkbox-${o.id}`} 
                            checked={filters[filterType] === o.id}
                            onClick={() =>
                              setFilters({
                                ...filters,
                                [filterType]: filters[filterType] === o.id ? undefined : o.id
                              })
                            }

                        />
                        <span>{o.label}</span>
                      </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </div>
    );
};
