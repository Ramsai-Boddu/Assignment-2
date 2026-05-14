"use client"

import { useRouter, usePathname } from "next/navigation";
import { FaChartLine, FaUser } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";

export default function Sidebar() {

    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        {
            icon: "🏠",
            name: "Dashboard",
            path: "/Dashboard"
        },
        {
            icon: <FaUser />,
            name: "Profile",
            path: "/Info"
        },
        {
            icon: "💼",
            name: "Holdings",
            path: "/Holdings"
        },
        {
            icon: "📈",
            name: "Sips",
            path: "/Sip"
        },
        {
            icon: "🧾",
            name: "Transactions",
            path: "/Transactions"
        },
        {
            icon: "💰",
            name: "Total Assets",
            path: "/Assets"
        },
        {
            icon: <FiSettings />,
            name: "Settings",
            path: "/Settings"
        },
        {
            icon: <FiLogOut />,
            name: "Logout",
            path: "/Login"
        }
    ];

    return (
        <div className="fixed left-0 top-0 flex flex-col font-bold w-[15%] bg-gray-100 items-center justify-start pt-[40px] min-h-screen">

            <h1 className="flex items-center gap-2 text-2xl font-bold">
                <FaChartLine />
                Growest
            </h1>

            <div className="flex flex-col pt-[40px] gap-4">

                {
                    menuItems.map((item) => (
                        <BarItem
                            key={item.name}
                            icon={item.icon}
                            name={item.name}
                            active={pathname === item.path}
                            onClick={() => {

                                if (item.name === "Logout") {

                                    document.cookie =
                                        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                                    router.push("/Login");

                                    return;
                                }

                                router.push(item.path);
                            }}
                            isLogout={item.name === "Logout"}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export function BarItem({ icon, name, active, onClick, isLogout }) {
    return (
        <div
            onClick={onClick}
            className={`
                flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 cursor-pointer
                ${isLogout
                    ? "text-red-500"
                    : ""
                }
                ${active
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-200"
                }
            `}
        >
            <span>{icon}</span>
            <span>{name}</span>
        </div>
    );
}