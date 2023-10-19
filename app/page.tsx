"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/login");
  };

  return (
    <main className="px-24 pb-24">
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">Cinema Budy is here to help</h1>
        <p className="text-2xl text-muted-foreground">
          You will never buy twice wrong seats in cinema.
        </p>
      </section>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <Button className="w-32" variant={"secondary"}>
          Learn More
        </Button>
        <Button onClick={handleSignUpClick} className="w-32">
          Sign Up Now
        </Button>
      </div>
    </main>
  );
}
