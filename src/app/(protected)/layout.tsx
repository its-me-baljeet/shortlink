import { ReactNode } from "react"

export default function Layout({children}:{
    children:ReactNode
}){
    return(
        <main className="h-screen w-screen flex justify-center">
            {children}
        </main>
    )
}