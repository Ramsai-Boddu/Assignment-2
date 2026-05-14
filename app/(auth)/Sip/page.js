"use client"

import Header from "@/app/components/dashboard/header"
import FundsPage from "@/app/components/FundPage"

export default function Sip(){
    return (
        <div className="ml-[15%] flex-1 flex-col gap-20 bg-gray-200 min-h-screen pb-10 items-center">
            
            <Header/>
            <FundsPage/>
        </div>
    )
}