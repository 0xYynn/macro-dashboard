import { loadAllMacroData } from "@/lib/data";
import { InflationPanel } from "@/components/InflationPanel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
    const { cpi, corePce } = loadAllMacroData();

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10 mb-20">
            <header className="space-y-4">
                <Link href="/" className="flex items-center text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    <ChevronLeft className="mr-1 size-4" />
                    Back to Dashboard
                </Link>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                        Inflation Surveillance
                    </h1>
                    <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                        CPI & PCE Deep Analytics
                    </p>
                </div>
            </header>

            <div className="grid gap-8">
                <InflationPanel cpi={cpi} corePce={corePce} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <h3 className="text-neutral-100 font-medium mb-2">CPI (Headline)</h3>
                        <p className="text-neutral-400 text-sm">
                            The Consumer Price Index (CPI) measures the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services.
                        </p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <h3 className="text-neutral-100 font-medium mb-2">Core PCE</h3>
                        <p className="text-neutral-400 text-sm">
                            The Personal Consumption Expenditures (PCE) Price Index excluding food and energy. This is the Federal Reserve's preferred measure of inflation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
