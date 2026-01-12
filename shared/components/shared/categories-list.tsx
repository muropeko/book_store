import React from 'react';
import { CategoryButton } from './category-button';
import { Container } from './container';
import { prisma } from '../../../prisma/prisma-client';

interface Props {
  className?: string;
}

export const CategoryList = async ({ className }: Props) => {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <Container className='flex justify-center mb-[50px]'>
        <CategoryButton items={categories} />
      </Container>
    </div>
  );
};
