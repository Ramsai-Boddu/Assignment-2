export default function MainCards() {
    return (
        <div className="flex flex-row gap-4 pt-[40px] items-center justify-center">
            <div className="bg-gray-300 w-[350px] h-[200px] rounded-2xl flex flex-col justify-between p-[20px] shadow-md hover:scale-[1.02] transition-all">
                <div>
                    <h1 className="font-bold text-3xl">
                        Get Real-time Updates
                    </h1>

                    <p className="text-gray-700 pt-3">
                        Track market performance instantly.
                    </p>
                </div>

                <div className="text-5xl">
                    📈
                </div>

            </div>

            <div className="bg-gray-300 w-[350px] h-[200px] rounded-2xl flex flex-col justify-between p-[20px] shadow-md hover:scale-[1.02] transition-all">

                <div>
                    <h1 className="font-bold text-3xl">
                        Total Investments
                    </h1>

                    <p className="text-gray-700 pt-3">
                        Monitor your invested amount easily.
                    </p>
                </div>

                <div className="text-5xl">
                    💰
                </div>

            </div>

            <div className="bg-gray-300 w-[350px] h-[200px] rounded-2xl flex flex-col justify-between p-[20px] shadow-md hover:scale-[1.02] transition-all">

                <div>
                    <h1 className="font-bold text-3xl">
                        Portfolio Growth
                    </h1>

                    <p className="text-gray-700 pt-3">
                        Analyze your wealth growth trends.
                    </p>
                </div>

                <div className="text-5xl">
                    🚀
                </div>

            </div>

        </div>
    );
}