'use client'
import {createShortUrl} from "@/actions/actions"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2Icon } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function CreateLinkDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!url.trim()) {
            toast.error("Url can't be empty!");
            return;
        }
        setLoading(true);
        const resp = await createShortUrl(url);
        if (resp.success) {
            setUrl("");
            toast.success("Short Link Created!");
            setIsOpen(false);
        } else {
            toast.error("Something went wrong! Please try again.");
        }
        setLoading(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">+ create link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Link</DialogTitle>
                        <DialogDescription>
                            Create a short url!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="url">URL</Label>
                            <Input id="url" name="name" placeholder="enter your url..." value={url} onChange={e => setUrl(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            loading ? <Button type="button" disabled className="bg-primary">
                                <Loader2Icon className="animate-spin" />
                                Create</Button>
                                :
                                <Button type="submit" className="bg-primary">Create</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
