import Header from "@/components/header";
import LinksGrid from "@/components/linksGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col">
    <Header/>
    <main className="max-w-6xl p-5">
      <p className="text-lg font-medium mb-5">All Short Links</p>
      <section className="flex flex-col gap-5 items-center">
        <Suspense fallback={<p>Loading...</p>}>
          <LinksGrid />
        </Suspense>
      </section>
    </main>
    </div>
  );
}
