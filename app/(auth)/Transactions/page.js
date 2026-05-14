"use client";

import { useContext, useEffect, useState } from "react";
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";

export default function Transactions() {

    const { id } = useContext(InvestorIDContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = document.cookie
                    .split("; ")
                    .find(row => row.startsWith("token="))
                    ?.split("=")[1];

                const response = await fetch(
                    `http://localhost:4000/sip/trans/${id}/transactions`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log("Response:", response);
                const result = await response.json();
                console.log("Result:", result);
                setTransactions(result.transactions || []);
            } catch (error) {
                console.log("ERROR:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchTransactions();
        }
    }, [id]);

    if (loading) {
        return (
            <h1 className="p-10 text-xl font-bold">
                Loading...
            </h1>
        );
    }

    return (
        <div className="ml-[15%] flex-1">
        <div className=" flex flex-col p-20 w-full">
            <h1 className="text-3xl font-bold mb-6">
                Transactions
            </h1>
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-4 text-left">Transaction ID</th>
                        <th className="p-4 text-left">SIP ID</th>
                        <th className="p-4 text-left">Amount</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction, index) => (
                            <tr
                                key={index}
                                className="border-b"
                            >
                                <td className="p-4">
                                    {transaction.transaction_id}
                                </td>

                                <td className="p-4">
                                    {transaction.sip_id}
                                </td>

                                <td className="p-4">
                                    ₹ {transaction.amount}
                                </td>

                                <td className="p-4">
                                    {transaction.status}
                                </td>

                                <td className="p-4">
                                    {transaction.transaction_date}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
</div>
        </div>
    );
}