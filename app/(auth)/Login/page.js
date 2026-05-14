"use client"

import InputField from "@/app/components/InputField"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import ProfileContext from "@/app/core/contexts/ProfileContext"
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext"

export default function Login() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { storeDetails } = useContext(ProfileContext)
    const { storeId } = useContext(InvestorIDContext)
    console.log(storeId)
    return (
        <div className="gap-5 items-center flex-1  justify-center pt-[140px]">
            <div className="absolute left-[90vh] flex flex-col gap-5 items-center border border-gray-200 rounded-[20%] p-[30px] shadow-xl hover:bg-gray-50 hover:shadow-2xl hover:scale-105">
                <p className="text-3xl">Login</p>

                <InputField
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />

                <InputField
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <button
                    className="w-[100px] text-xl border border-black rounded-[40px] hover:bg-black hover:text-white  hover:cursor-pointer"

                    onClick={async () => {

                        try {

                            const response = await fetch(
                                "http://localhost:4000/sip/invest/login",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        email,
                                        password
                                    })
                                }
                            )

                            const result = await response.json()

                            console.log(result)

                            if (result.message === "Login Success") {
                                storeDetails(email, password)
                                storeId(result.investor_id)
                                document.cookie = `token=${result.token}`
                                router.push("/Dashboard")
                            }

                        } catch (err) {
                            alert(JSON.stringify(err))
                        }
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    )
}