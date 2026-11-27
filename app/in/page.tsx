'use client'

import { useUserStore } from "@/providers/UserProvider";

export default function InPage(){
    const {email}  = useUserStore((state)=> state);

    return (
        <div>
            Hola mundo que paso aqqui 
        </div>
    )
}