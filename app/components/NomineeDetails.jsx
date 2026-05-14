"use client"

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";
import { useContext, useEffect, useState } from "react";

export default function Nominee() {

    const [nominees, setNominees] = useState([]);

    const { id } = useContext(InvestorIDContext);

    useEffect(() => {

        if (!id) return;

        const fetchNominee = async () => {

            try {

                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1];

                const response = await fetch(
                    `http://localhost:4000/sip/invest/${id}/nominee`,
                    {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                setNominees(result.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchNominee();

    }, [id]);

    return (

        <div className="ml-[15%] bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-8">
                Nominee Details
            </h1>

            <div className="grid grid-cols-2 gap-6">

                {
                    nominees.map((nominee, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 hover:scale-[1.02] transition-all"
                        >

                            <div className="flex items-center justify-between mb-6">

                                <h1 className="text-2xl font-bold">
                                    {nominee.first_name} {nominee.last_name}
                                </h1>

                                <div className="text-5xl">
                                    👨‍👩‍👦
                                </div>

                            </div>

                            <div className="space-y-3">

                                <p>
                                    <span className="font-bold">
                                        Relationship :
                                    </span>
                                    {" "}
                                    {nominee.relationship}
                                </p>

                                <p>
                                    <span className="font-bold">
                                        Contact :
                                    </span>
                                    {" "}
                                    {nominee.contact}
                                </p>

                                <p>
                                    <span className="font-bold">
                                        Date Of Birth :
                                    </span>
                                    {" "}
                                    {nominee.date_of_birth}
                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}