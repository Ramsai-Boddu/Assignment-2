"use client"

import InvestorIDContext from "../contexts/InvestorIDContext";
import { useEffect, useState } from "react";

export default function InvestorIDProvider({ children }) {

    const [id, setId] = useState("");

    function storeId(newId) {

        setId(newId);

        sessionStorage.setItem("id", newId);
    }

    useEffect(() => {

        const storedId = sessionStorage.getItem("id");

        if (storedId) {
            setId(storedId);
        }

    }, []);

    return (
        <InvestorIDContext.Provider value={{ storeId, id }}>
            {children}
        </InvestorIDContext.Provider>
    );
}