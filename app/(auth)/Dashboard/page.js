"use client"
import Header from "@/app/components/dashboard/header"
import Transaction from "@/app/components/transaction"
import MainCards from "@/app/components/MainPageCards"

export default function Dashboard() {
    return (
        <div className="ml-[15%] flex-1 bg-gray-200 min-h-screen pb-10">
            <Header/>
            <MainCards/>
            <Transaction/>
        </div>
    )
}