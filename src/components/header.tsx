import { CreateLinkDialog } from "./createLinkDialog";
import { ModeToggle } from "./modeToggleBtn";

export default function Header() {

    return (
        <header className="h-15 w-full flex px-5 items-center justify-between">
            <h2 className="text-3xl font-medium">Shortly</h2>
            <div className="flex gap-5">
                <ModeToggle />
                <CreateLinkDialog />
            </div>
        </header>
    )
}