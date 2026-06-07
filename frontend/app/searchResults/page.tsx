import SearchPage from "@/components/search/searchPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Page",
  description: "Search for your page",
};

export default async function searchPage() {
  
  return <SearchPage/>
}