import { BookPageInfo, BreadcrumbCustom, Container, TabComponent, EmptyBlock } from "@components/shared";
import { BookList } from "@components/shared/book-list";
import { getBookById, recommendedBooks } from "app/actions";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);

  const book = await getBookById(id);
  const recommended = book ? await recommendedBooks(book.categoryId || 1, book.id) : [];

  return (
    <>
      { book && <BreadcrumbCustom title="Книги" />}

      <div className="py-10 min-h-screen">
        <Container className="flex flex-col gap-10">
          <div className="flex gap-10 min-h-screen">
            <aside className="w-1/5 p-4">
              this is sidebar.
            </aside>

            <section className="flex-1 flex flex-col gap-6">
              {book ? (
                <>
                  <BookPageInfo item={book} />
                  <TabComponent item={book} />
                </>
              ) : (
                <EmptyBlock
                  title="Книга не була знайдена!"
                  description="На жаль, запитана книга відсутня в нашій базі. 
                  Спробуйте пошукати іншу або перегляньте рекомендовані видання."
                />
              )}
            </section>
          </div>

          {recommended.length > 0 && <BookList items={recommended} />}
        </Container>
      </div>
    </>
  );
}
