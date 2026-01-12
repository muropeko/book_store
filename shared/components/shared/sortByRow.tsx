'use client';

import React, { FC, useEffect } from 'react';
import { BookWithAuthor } from 'prisma/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useFilter } from 'shared/hooks';
import { Button } from '@components/ui';

interface Props {
    className?: string;
    items: BookWithAuthor[];
}

export const SortByRow: FC<Props> = ({ className, items }) => {
    const { filters, setFilters } = useFilter();

    const sortType = [
        { sortBy: 'title', name: 'За назвою (asc)' },
        { sortBy: '-title', name: 'За назвою (desc)' },
    ];

    const activeSort = sortType.find((s) => s.sortBy === filters.sortBy) || sortType[0];

    return (
        <div className="z-[1] flex flex-row justify-end items-center gap-5" >
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className='bg-red-600 p-5 text-white z-10 focus:outline-none active:outline-none'>
                        {activeSort?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-50 bg-white mt-1">
                    {sortType.map((s) => (
                        <DropdownMenuItem
                            key={s.sortBy}
                            className='p-3 text-stone-500 text-sm hover:text-red-600 cursor-pointer active:outline hover:outline-none'
                            onClick={() =>
                                setFilters(prev => ({ ...prev, sortBy: s.sortBy }))
                            }
                        >
                            {s.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <span>
                Знайдені книги: <span className='text-red-600 font-bold text-xl'>{items.length}</span>
            </span>
        </div>
    );
};
