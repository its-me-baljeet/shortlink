import { checkUrl } from "@/actions/actions";
import { Loader2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ValidatePage({ params }: {
  params: 
    Promise<{
    shortCode: string;
    }>
}) {
  const resp = await params;
  const shortCode = resp.shortCode;

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <Suspense fallback={
        <p><span className="animate-spin"><Loader2 /></span> Redirecting...</p>
      }>
        <CheckingUrl shortCode={shortCode} />
      </Suspense>
    </main>
  );
}

async function CheckingUrl({ shortCode }: { shortCode: string }) {
  const link = await checkUrl(shortCode);
  if (link && link) {
    redirect(link);
  }
  return null;
}