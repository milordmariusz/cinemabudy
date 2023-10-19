"use client";

import UserLoginForm from "@/components/UserLoginForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onSignUpButtonClick = () => {
    router.replace("/register");
  };

  return (
    <main className="flex flex-col items-center py-24 px-8">
      <h1 className="text-3xl font-bold flex w-full max-w-2xl ml-8">Login</h1>
      <UserLoginForm />
      <p>
        If you don&apos;t have an account
        <span>
          <Button onClick={onSignUpButtonClick} variant="link">
            Sign Up
          </Button>
        </span>
      </p>
    </main>
  );
}
