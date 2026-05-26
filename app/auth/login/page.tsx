
import LoginPage from "@/components/auth/loginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your shelf in myShelf",
};

export default async function Login() {
  
  return <LoginPage/>
}