import { loadAllMacroData } from "@/lib/data";
import { YieldPanel } from "@/components/YieldPanel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
    const { dgs2 } = loadAllMacroData();

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10 mb-20">
            <header className="space-y-4">
                <Link href="/" className="flex items-center text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    <ChevronLeft className="mr-1 size-4" />
                    Back to Dashboard
                </Link>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                        Treasury Yield Curve
                    </h1>
                    <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                        2-Year Note & Market Policy Matrix
                    </p>
                </div>
            </header>

            <div className="grid gap-8">
                <YieldPanel dgs2={dgs2} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <h3 className="text-neutral-100 font-medium mb-2">2-Year Treasury Yield</h3>
                        <p className="text-neutral-400 text-sm">
                            Highly sensitive to Federal Reserve policy changes. It reflects the market's expectation of short-term interest rate movements.
                        </p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <h3 className="text-neutral-100 font-medium mb-2">Policy Significance</h3>
                        <p className="text-neutral-400 text-sm">
                            When the 2-year yield rises above the 10-year yield (inversion), it is historically a reliable signal of an impending recession.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
