import MyBooksPage from "@/components/mybooks/theshelf";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shelf",
  description: "The collection of books you've saved",
};

export default async function shelfPage() {
  
  return <MyBooksPage/>
}