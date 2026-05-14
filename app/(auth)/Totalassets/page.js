"use client"

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";
import { useContext, useEffect, useState } from "react";
import {
    FaWallet,
    FaRupeeSign,
    FaChartLine,
    FaUserTie
} from "react-icons/fa";

export default function TotalAssets() {

    const [netWorth, setNetWorth] = useState(null);

    const { id } = useContext(InvestorIDContext);

    useEffect(() => {

        if (!id) return;

        const fetchNetWorth = async () => {

            try {

                const token = document.cookie
                    .split("; ")
                    .find(row => row.startsWith("token="))
                    ?.split("=")[1];

                const response = await fetch(
                    `http://localhost:4000/sip/invest/${id}/networth`,
                    {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                console.log(result);

                setNetWorth(result.NetWorth);

            } catch (err) {
                console.log(err);
            }
        };

        fetchNetWorth();

    }, [id]);

    if (!netWorth) {
        return (
            <div className="ml-[15%] p-10">
                <h1 className="text-3xl font-bold">
                    Loading...
                </h1>
            </div>
        )
    }

    return (

        <div className="
            ml-[15%]
            min-h-screen
            bg-gradient-to-br
            from-gray-100
            to-gray-200
            p-10
        ">

            <div className="mb-10">

                <h1 className="
                    text-5xl
                    font-extrabold
                    text-gray-800
                ">
                    Total Assets
                </h1>

                <p className="
                    text-gray-500
                    text-xl
                    mt-3
                ">
                    Complete net worth overview of investor portfolio
                </p>

            </div>

            <div className="
                bg-white
                rounded-[35px]
                shadow-2xl
                overflow-hidden
                max-w-6xl
            ">

                <div className="
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-400
                    px-12
                    py-10
                    flex
                    justify-between
                    items-center
                ">

                    <div className="flex items-center gap-6">

                        <div className="
                            bg-white/20
                            p-6
                            rounded-full
                        ">
                            <FaWallet
                                className="
                                    text-7xl
                                    text-white
                                "
                            />
                        </div>

                        <div>

                            <h2 className="
                                text-4xl
                                font-bold
                                text-white
                            ">
                                Portfolio Net Worth
                            </h2>

                            <p className="
                                text-green-100
                                text-xl
                                mt-2
                            ">
                                Real-time investment valuation
                            </p>

                        </div>

                    </div>

                    <div className="
                        bg-white/20
                        px-8
                        py-5
                        rounded-3xl
                        backdrop-blur-md
                    ">

                        <p className="
                            text-lg
                            text-white
                        ">
                            Investor
                        </p>

                        <p className="
                            text-3xl
                            font-bold
                            text-white
                            mt-1
                        ">
                            {netWorth.first_name}
                        </p>

                    </div>

                </div>

                <div className="
                    grid
                    grid-cols-3
                    gap-8
                    p-10
                ">

                    <StatCard
                        icon={<FaUserTie />}
                        title="Investor ID"
                        value={netWorth.investor_id}
                    />

                    <StatCard
                        icon={<FaChartLine />}
                        title="Investor Name"
                        value={netWorth.first_name}
                    />

                    <StatCard
                        icon={<FaRupeeSign />}
                        title="Net Worth"
                        value={`₹ ${Number(netWorth.net_worth).toLocaleString()}`}
                        highlight={true}
                    />

                </div>

            </div>

        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
    highlight
}) {

    return (

        <div className={`
            rounded-3xl
            p-8
            shadow-md
            hover:shadow-2xl
            transition-all
            duration-300
            border
            ${
                highlight
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
            }
        `}>

            <div className="
                flex
                items-center
                gap-4
                mb-5
            ">

                <div className={`
                    p-4
                    rounded-2xl
                    text-2xl
                    ${
                        highlight
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-500"
                    }
                `}>
                    {icon}
                </div>

                <h2 className="
                    text-2xl
                    font-semibold
                    text-gray-700
                ">
                    {title}
                </h2>

            </div>

            <p className={`
                text-3xl
                font-bold
                break-words
                ${
                    highlight
                        ? "text-green-700"
                        : "text-gray-900"
                }
            `}>
                {value}
            </p>

        </div>

    )
}