import LoginPage from "@/components/auth/loginPage";
import RecommendationsPage from "@/components/recommendations/recomPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recommendations",
  description: "Books you may like",
};

export default async function Recommendations() {
  
  return <RecommendationsPage/>
}