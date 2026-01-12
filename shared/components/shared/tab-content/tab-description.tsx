import { BookDetalised } from 'prisma/types';
import React, { FC } from 'react';
import { Title } from '../title';

interface Props {
  className?: string;
  item: BookDetalised;
}



export const TabDescription: FC<Props> = ({ className, item }) => {
  const metaData: { label: string; getValue: (item: BookDetalised) => string | number | null }[] = [
    { label: 'Кількість сторінок', getValue: (item) => item.pages },
    { label: 'Автор', getValue: (item) => item.author ? `${item.author.firstName} ${item.author.lastName}` : 'N/A' },
    { label: 'Видавництво', getValue: (item) => item.publisher?.name ?? 'N/A' },
    { label: 'ISBN', getValue: (item) => item.items?.[0]?.isbn ?? 'N/A' },
    { label: 'Жанр', getValue: (item) => item.category?.name ?? 'N/A' },
    { label: 'Читацький вік', getValue: (item) => item.readingAge },
    { label: 'Формат', getValue: (item) => item.dimensions },
  ]

  return (
    <div className={className}>
      <div>
        <Title text="Опис книги:" size="sm" className="mb-2 font-medium" />
        <p>{item.summary}</p>
      </div>

      <ul className='p-5 list-disc'>
        {metaData.map(({ label, getValue }, i) => (
        <li key={i} className='mb-1'>
            <span className="font-medium">{label}: </span>
            <span>{getValue(item)}</span>
        </li>
        ))}
      </ul>

      <div>
        <Title text="Умови продажу:" size="sm" className="mb-2 font-medium" />
        <p>
            Ми пропонуємо політику повернення та обміну протягом семи днів. Повернення та обмін можна ініціювати з розділу замовлень вашого облікового запису. Бирки та наклейки слід залишати, щоб гарантувати, що товар буде повернуто вам у тому ж стані, в якому його було доставлено.
        </p>
      </div>
    </div>
  );
};
