import { getAllUrls } from "@/actions/actions";
import Link from "next/link";
import CopyButton from "./copyBtn";
import DeleteButton from "./deleteBtn";

export default async function LinksGrid() {
    const resp = await getAllUrls();
    if (!resp.urls) {
        return <p>{resp.message}</p>
    }
    if(!resp.urls.length){
        return <p>No Urls found! Create a new Url.</p>
    }
    return (
        <section className="w-full grid grid-cols-3 gap-5">
            {
                resp.urls.map(url => {
                    return (
                        <div key={url.id} className="min-h-28 w-full border p-2 shadow-md rounded-md flex flex-col gap-3 hover:border-primary">
                            <p className="text-muted w-full break-all">Original Url : <Link href={url.originalUrl} className="text-foreground">{url.originalUrl}</Link></p>
                            <p className="text-muted">Short Url : <Link href={url.shortCode} className="text-foreground">short.ly/{url.shortCode}</Link></p>
                            <div className="flex self-end mt-auto gap-2">
                                <CopyButton textToCopy={`short.ly/${url.shortCode}`} />
                                <DeleteButton id={url.id} />
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}