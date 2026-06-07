
import BookDetailsPage from "@/components/bookDetails/bookDetails";
import { Metadata } from "next";

type Props = {
  params: {
    book: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { book } = await params;
  return {
    
    title: `${book} - MyShelf`,
    description: `Viewing ${book} on MyShelf`,
  };
}

export default async function bookDetails({ params }: Props) {
  const givenBook = await params;
  return <BookDetailsPage id={givenBook.book}/>
}