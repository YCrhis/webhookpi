'use client'

import UIButton from "@/components/UI/UIButton";
import { useUserStore } from "@/providers/UserProvider";

export default function InPage(){
    const {email}  = useUserStore((state)=> state);

    return (
        <main className="flex gap-4">
            <aside className="sticky left-0 top-0 p-3">
                <p>List of calls to web hook</p>
            </aside>
            <section className="p-3">
                <p>Generate a new endpoint to webHook</p>
                <UIButton>Generate a new endpoint</UIButton>
            </section>
        </main>
    )
}