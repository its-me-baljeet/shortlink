'use client'
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteUrl } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter();
    const handleClick = async () => {
        const resp = await deleteUrl(id);
        if (resp.success) {
            router.refresh();
            toast.error("Link delted!");
        } else {
            toast.error(resp.message);
            return;
        }
    }
    return (
        <Button onClick={handleClick} className="w-fit cursor-pointer"><Trash2 /></Button>
    )
}