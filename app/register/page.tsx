"use client";

import UserRegisterForm from "@/components/UserRegisterForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const onSignInButtonClick = () => {
    router.replace("/login");
  };
  return (
    <main className="flex flex-col items-center py-24 px-8">
      <h1 className="text-3xl font-bold flex w-full max-w-2xl ml-8">
        Register
      </h1>
      <UserRegisterForm />
      <p>
        If have an account
        <span>
          <Button onClick={onSignInButtonClick} variant="link">
            Sign In
          </Button>
        </span>
      </p>
    </main>
  );
}
