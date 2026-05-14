"use client";

import BankDetails from "@/app/components/BankDetails";
import Nominee from "@/app/components/NomineeDetails";
import UserInfo from "@/app/components/UserInfo";
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";
import { useContext, useEffect, useState } from "react";

export default function InvestorInfo() {
    return (
        <div className="flex flex-col flex-1 gap-2">
            <UserInfo />
            <BankDetails />
            <Nominee />
        </div>
    )
}