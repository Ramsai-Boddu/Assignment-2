"use client"

import Header from "@/app/components/dashboard/header"
import Holdings from "@/app/components/holds"

export default function Holding(){
    return (
        <div className="ml-[15%] flex-1 bg-gray-200 min-h-screen pb-10 items-center">
            <Header/>
            <Holdings/>
        </div>
    )
}