import { getAllUrls } from "@/actions/actions"
import Link from "next/link";

export default async function LinksGrid() {
    const resp = await getAllUrls();
    if (!resp.urls) {
        return <p>{resp.message}</p>
    }
    return (
        <section className="w-full grid grid-cols-3 gap-5">
            {
                resp.urls.map(url => {
                    return (
                        <div key={url.id} className="min-h-28 border p-2 shadow-md rounded-md">
                            <p className="text-muted">Original Url : <Link href={url.originalUrl} className="text-foreground">{url.originalUrl}</Link></p>
                            <p className="text-muted">Short Url : <Link href={url.shortCode} className="text-foreground"    >{url.shortCode}</Link></p>
                        </div>
                    )
                })
            }
        </section>
    )
}