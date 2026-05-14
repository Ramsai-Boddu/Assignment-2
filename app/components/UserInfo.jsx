"use client"

import { useContext, useEffect, useState } from "react";
import InvestorIDContext from "../core/contexts/InvestorIDContext";

export default function UserInfo() {

    const [investor, setInvestor] = useState(null);

    const { id } = useContext(InvestorIDContext);

    useEffect(() => {

        if (!id) return;

        const fetchInvestor = async () => {

            try {

                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1];

                const response = await fetch(
                    `http://localhost:4000/sip/invest/${id}`,
                    {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                setInvestor(result.Data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchInvestor();

    }, [id]);

    if (!investor) {
        return <h1 className="ml-[15%] p-10">Loading...</h1>;
    }

    return (

        <div className="ml-[15%] bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-8">
                Investor Information
            </h1>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:scale-[1.01] transition-all">

                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h2 className="text-3xl font-bold">
                            {investor.first_name} {investor.middle_name} {investor.last_name}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Investor ID : {investor.investor_id}
                        </p>
                    </div>

                    <div className="text-6xl">
                        👤
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-gray-500">PAN Number</p>
                        <h1 className="font-bold text-lg">{investor.pan}</h1>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-gray-500">Aadhar Number</p>
                        <h1 className="font-bold text-lg">{investor.aadhar}</h1>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-gray-500">Gender</p>
                        <h1 className="font-bold text-lg">{investor.gender}</h1>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-gray-500">Occupation</p>
                        <h1 className="font-bold text-lg">{investor.occupation}</h1>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-gray-500">Date Of Birth</p>
                        <h1 className="font-bold text-lg">{investor.date_of_birth}</h1>
                    </div>

                </div>

            </div>

        </div>
    );
}