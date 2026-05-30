import SignUpPage from "@/components/auth/registerPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your myShelf account",
};

export default async function signUpPage() {
  
  return <SignUpPage/>
}