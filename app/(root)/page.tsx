import { CategoryList, SectionWrapper } from "@components/shared";
import { BookList } from "@components/shared/book-list";
import { findBooks } from "app/actions";
import { IFilters } from "shared/hooks/use-filter";

export default async function HomePage({ searchParams }: { searchParams: IFilters}) {
  const params = await searchParams;
  const items = await findBooks(params);

  return (
    <SectionWrapper sectionTitle="нові книги">
      <CategoryList />
      <BookList items={items}/>
    </SectionWrapper>
  );
}
