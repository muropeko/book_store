import { BookSidebar } from "./book-sidebar";

export const Sidebar = ({ variant }: { variant: 'books' | 'categories' }) => {
  if (variant === 'books') {
    return <BookSidebar />;
  }

  return null;
};
