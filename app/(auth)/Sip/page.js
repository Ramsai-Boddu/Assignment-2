"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  CheckCircle2,
  Wallet,
  TrendingUp,
  ShieldAlert,
  BadgeIndianRupee,
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
      const response = await fetch("http://localhost:4000/sip/fund/getFunds", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFunds(data);
    } catch (err) {
      console.error("Fetch Error:", err);
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
      alert("Please enter a valid amount");
      return;
    }

    try {
      const token = getAuthToken();
      const response = await fetch("http://localhost:4000/sip/createSip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mutual_id, amount: Number(amount) }),
      });

      if (response.ok) {
        alert("🎉 SIP Started Successfully!");
        setAmounts((prev) => ({ ...prev, [mutual_id]: "" }));
        fetchFunds();
      } else {
        alert("Failed to start SIP");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ml-[15%] w-full px-6 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <BadgeIndianRupee className="h-3.5 w-3.5" />
            SIP Investments
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Discover Mutual Funds
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start a SIP with beautifully presented fund insights and a cleaner investing flow.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[420px] animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {funds.map((fund) => (
            <div
              key={fund.mutual_id}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 blur-3xl opacity-60" />

              <div className="relative mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold leading-snug text-slate-900">
                    {fund.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{fund.amc_name}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                      Equity
                    </span>
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-700 ring-1 ring-cyan-200">
                      Growth
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
              </div>

              <div className="mb-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white p-5 ring-1 ring-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    Current NAV
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +2.84%
                  </span>
                </div>

                <div className="flex items-end gap-2">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 [font-variant-numeric:tabular-nums]">
                    ₹{fund.current_nav}
                  </h2>
                  <span className="mb-1 text-sm text-slate-500">per unit</span>
                </div>

                <div className="mt-5 flex h-16 items-end gap-1.5">
                  {[22, 34, 28, 48, 42, 68, 74, 92].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 rounded-full bg-gradient-to-t from-emerald-500 via-cyan-500 to-blue-400 opacity-90"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    1Y Return
                  </p>
                  <h4 className="mt-1 text-lg font-bold text-emerald-600">18.2%</h4>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Risk
                  </p>
                  <h4 className="mt-1 inline-flex items-center gap-1 text-lg font-bold text-amber-600">
                    <ShieldAlert className="h-4 w-4" />
                    High
                  </h4>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Expense
                  </p>
                  <h4 className="mt-1 text-lg font-bold text-cyan-700">0.82%</h4>
                </div>
              </div>

              {fund.sip_id ? (
                <div className="rounded-[24px] bg-gradient-to-r from-emerald-500 to-green-600 p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                        SIP Active
                      </p>
                      <h3 className="mt-2 text-3xl font-bold [font-variant-numeric:tabular-nums]">
                        ₹{fund.amount}
                      </h3>
                      <p className="mt-1 text-sm text-emerald-50/90">
                        invested monthly
                      </p>
                    </div>

                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      placeholder="Enter SIP amount"
                      value={amounts[fund.mutual_id] || ""}
                      onChange={(e) =>
                        setAmounts((prev) => ({
                          ...prev,
                          [fund.mutual_id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-10 pr-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>

                  <button
                    onClick={() => createSip(fund.mutual_id)}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-4 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <PlusCircle className="h-5 w-5" />
                      Start SIP
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}