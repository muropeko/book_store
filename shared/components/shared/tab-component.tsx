'use client';

import React, { FC, useState } from 'react';
import { TabComments, TabDescription } from './tab-content';
import { Button } from '@components/ui';
import { BookDetalised } from 'prisma/types';

interface Props {
  className?: string;
  item: BookDetalised;
}


export const TabComponent: FC<Props> = ({ className, item }) => {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        { label: 'Опис книги', content: <TabDescription item={item}/>},
        { label: 'Інформація про доставку', content: 'hello!!!' },
        { label: 'Відгук', content: <TabComments comments={item.comments}/> },
    ]

    return (
         <>
            <div className="flex gap-3">
                {tabs.map((tab, i) => (
                    <Button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        variant='secondary'
                        size='lg'
                        className={activeTab === i ? "bg-red-600" : ""}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
            <div className="border border-stone-300 p-6">{tabs[activeTab].content}</div>
        </>
    );
};

