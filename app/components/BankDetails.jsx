"use client"

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";
import { useContext, useEffect, useState } from "react";

export default function BankDetails() {

    const [banks, setBanks] = useState([]);

    const { id } = useContext(InvestorIDContext);

    useEffect(() => {

        if (!id) return;

        const fetchBankDetails = async () => {

            try {

                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1];

                const response = await fetch(
                    `http://localhost:4000/sip/invest/${id}/bankdetails`,
                    {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                setBanks(result.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchBankDetails();

    }, [id]);

    return (

        <div className="ml-[15%] bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-8">
                Bank Details
            </h1>

            <div className="grid grid-cols-2 gap-6">

                {
                    banks.map((bank, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 hover:scale-[1.02] transition-all"
                        >

                            <div className="flex items-center justify-between mb-6">

                                <h1 className="text-2xl font-bold">
                                    {bank.bank_name}
                                </h1>

                                <div className="text-5xl">
                                    🏦
                                </div>

                            </div>

                            <div className="space-y-3">

                                <p><span className="font-bold">Branch :</span> {bank.branch}</p>

                                <p><span className="font-bold">IFSC :</span> {bank.ifsc}</p>

                                <p><span className="font-bold">Account No :</span> {bank.account_no}</p>

                                <p><span className="font-bold">Type :</span> {bank.account_type}</p>

                                <p><span className="font-bold">Address :</span> {bank.address}</p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}