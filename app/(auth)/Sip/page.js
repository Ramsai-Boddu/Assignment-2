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

      console.log(data);

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
      <div className="ml-[15%] min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Funds...
        </h1>
      </div>
    );
  }

  return (
    <div className="ml-[15%] w-[85%] min-h-screen bg-slate-50 px-8 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
              Investment Plans
            </p>

            <h1 className="text-4xl font-extrabold text-slate-900">
              Mutual Funds
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Invest consistently and build long-term wealth 🚀
            </p>
          </div>

          <div className="flex w-fit items-center gap-4 rounded-2xl border border-orange-200 bg-white px-6 py-4 shadow-sm">
            <div className="rounded-xl bg-orange-500 p-3 text-white shadow-sm">
              <Wallet size={26} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Available Funds
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900">
                {funds.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Funds Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {funds.map((fund) => (
            <div
              key={fund.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <div className="h-1.5 bg-orange-500" />

              <div className="p-6">
                {/* Icon + Status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-orange-50 p-4 text-orange-500 ring-1 ring-orange-100">
                    <TrendingUp size={28} />
                  </div>

                  {fund.sip_id && (
                    <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                      <CheckCircle2 size={14} />
                      SIP ACTIVE
                    </div>
                  )}
                </div>

                {/* Fund Info */}
                <div className="mt-5">
                  <h2 className="text-xl font-bold leading-snug text-slate-900">
                    {fund.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-slate-500">
                    <Landmark size={16} />

                    <p className="text-sm font-medium">{fund.amc_name}</p>
                  </div>
                </div>

                {/* NAV Section */}
                <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Current NAV
                  </p>

                  <div className="mt-2 flex items-center">
                    <IndianRupee size={22} className="text-orange-500" />

                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {fund.current_nav}
                    </h3>
                  </div>
                </div>

                {/* SIP Section */}
                <div className="mt-6">
                  {fund.sip_id ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                      <p className="font-semibold text-green-700">
                        Monthly SIP Amount
                      </p>

                      <h2 className="mt-2 text-3xl font-extrabold text-green-700">
                        ₹{fund.amount}
                      </h2>

                      <p className="mt-2 text-sm text-slate-500">
                        SIP is actively running
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="number"
                        placeholder="Enter SIP Amount"
                        value={amounts[fund.id] || ""}
                        onChange={(e) =>
                          setAmounts((prev) => ({
                            ...prev,
                            [fund.id]: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      />

                      <button
                        onClick={() => createSip(fund.id)}
                        className="w-full rounded-xl bg-orange-500 py-4 text-base font-bold text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-[0.98]"
                      >
                        Start SIP
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}