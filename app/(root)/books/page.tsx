import { BreadcrumbCustom, Container, FilterSelector, SortByRow } from "@components/shared";
import { BookList } from "@components/shared/book-list";
import { Accordion } from "@components/ui";
import { findBooks, getAuthors, getCategories, getPublishers } from "app/actions";
import { IFilters } from "shared/hooks/use-filter";

export interface FilterOption {
    id: number,
    label: string
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<IFilters> }) {
    const params = await searchParams
    const books = await findBooks(params)

    const [categories, authors, publishers] = await Promise.all([
        getCategories(),
        getAuthors(),
        getPublishers()
    ]);

    const toFilterOptions = <T extends { id: number }>(items: T[], labelFn: (item: T) => string): FilterOption[] => {
        return items.map((item) => ({
            id: item.id,
            label: labelFn(item),
        }));
    };

    const transformedCategories = toFilterOptions(categories, (d) => d.name);
    const transformedAuthors = toFilterOptions(authors, (d) => `${d.firstName} ${d.lastName}`);
    const transformedPublishers = toFilterOptions(publishers, (d) => d.name);

    return (
        <>
        <BreadcrumbCustom title='Каталог' />
           <Container className='flex gap-10 py-10'>
                <div className='w-[300px] flex-shrink-0 box-border'>
                    <Accordion
                        type='multiple'
                        className="w-full"
                    >
                        <FilterSelector filterLabel="Жанр" options={transformedCategories} filterType='categoryId' />
                        <FilterSelector filterLabel="Автори" options={transformedAuthors} filterType='author' />
                        <FilterSelector filterLabel="Видавництво" options={transformedPublishers} filterType='publishers' />

                    </Accordion>


                </div>
                <div className='flex gap-10 flex-col flex-1'>
                    <SortByRow items={books}/>
                    <BookList items={books}/>
                </div>
            </Container>
        </>
    );
}