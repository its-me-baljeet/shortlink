import { ReactNode } from "react"
import { Toaster } from "sonner"

export default function Layout({ children }: {
    children: ReactNode
}) {
    return (
        <main className="h-screen w-screen flex justify-center">
            {children}
            <Toaster position="top-center" />
        </main>
    )
}