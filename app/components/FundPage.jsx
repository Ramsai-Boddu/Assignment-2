"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Landmark,
  IndianRupee,
  CheckCircle2,
  Wallet,
} from "lucide-react";

export default function FundsPage() {
  const [funds, setFunds] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const fetchFunds = async () => {
    try {
      const token = getAuthToken();

      const response = await fetch(
        "http://localhost:4000/sip/fund/getFunds",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setFunds(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const createSip = async (mutual_id) => {
    const amount = amounts[mutual_id];

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      const token = getAuthToken();

      const response = await fetch(
        "http://localhost:4000/sip/new/createSip",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            mutual_id,
            amount: Number(amount),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setAmounts((prev) => ({
          ...prev,
          [mutual_id]: "",
        }));

        fetchFunds();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="ml-[15%] flex min-h-screen w-[85%] items-center justify-center bg-slate-100">
        <h1 className="animate-pulse text-4xl font-extrabold text-orange-500">
          Loading Funds...
        </h1>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100 p-8">

    {/* Main Container */}
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-300 bg-white shadow-2xl">

      <table className="min-w-full border-collapse">

        {/* TABLE HEADER */}
        <thead className="sticky top-0 z-10">

          <tr className="bg-gradient-to-r from-[#0f2d52] to-[#1d4f91] text-black">

            <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider border border-slate-500">
              Scheme Name
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider border border-slate-500">
              AMC
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider border border-slate-500">
              NAV
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider border border-slate-500">
              SIP Status
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider border border-slate-500">
              Enter Amount
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider border border-slate-500">
              Action
            </th>

          </tr>

        </thead>

        {/* TABLE BODY */}
        <tbody>

          {funds.map((fund, index) => (

            <tr
              key={fund.id}
              className={`
                transition-all duration-300 hover:bg-blue-50
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
              `}
            >

              {/* Fund Name */}
              <td className="border border-slate-300 px-6 py-5 min-w-[320px]">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-3 text-black shadow-md">
                    <TrendingUp size={22} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {fund.name}
                    </h2>

                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Mutual Fund
                    </p>
                  </div>

                </div>

              </td>

              {/* AMC */}
              <td className="border border-slate-300 px-6 py-5 min-w-[180px]">

                <div className="flex items-center gap-2">

                  <Landmark
                    size={18}
                    className="text-blue-700"
                  />

                  <span className="font-semibold text-slate-700">
                    {fund.amc_name}
                  </span>

                </div>

              </td>

              {/* NAV */}
              <td className="border border-slate-300 px-6 py-5 min-w-[140px]">

                <div className="flex items-center text-xl font-bold text-emerald-700">

                  <IndianRupee size={18} />

                  {fund.current_nav}

                </div>

              </td>

              {/* SIP Status */}
              <td className="border border-slate-300 px-6 py-5 min-w-[180px]">


                  <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-2 text-sm font-bold text-emerald-700">

                    <CheckCircle2 size={14} />

                    ACTIVE

                  </div>


              </td>


              {/* Input */}
              <td className="border border-slate-300 px-6 py-5 min-w-[260px]">

                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amounts[fund.id] || ""}
                  onChange={(e) =>
                    setAmounts((prev) => ({
                      ...prev,
                      [fund.id]: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </td>

              {/* Button */}
              <td className="border border-slate-300 px-6 py-5 min-w-[180px] text-center">

                <button
                  onClick={() => createSip(fund.id)}
                  className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Start SIP
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}