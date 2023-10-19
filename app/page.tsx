import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function Home() {
  return (
    <main className="px-24 pb-24">
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">Cinema Budy is here to help</h1>
        <p className="text-2xl text-muted-foreground">
          You will never buy twice wrong seats in cinema.
        </p>
      </section>
      <div className="flex gap-6 items-center justify-center">
        <Button variant={"secondary"}>Learn More</Button>
        <Button>Sign Up Now</Button>
      </div>
    </main>
  );
}
