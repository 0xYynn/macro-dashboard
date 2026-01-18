import { loadAllMacroData } from "@/lib/data";
import { JobsPanel } from "@/components/JobsPanel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
    const { nfp, wages } = loadAllMacroData();

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10 mb-20">
            <header className="space-y-4">
                <Link href="/" className="flex items-center text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    <ChevronLeft className="mr-1 size-4" />
                    Back to Dashboard
                </Link>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                        Labor Market Dynamics
                    </h1>
                    <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                        NFP & Wage Growth Surveillance
                    </p>
                </div>
            </header>

            <div className="grid gap-8">
                <JobsPanel nfp={nfp} wages={wages} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <h3 className="text-neutral-100 font-medium mb-2">Nonfarm Payrolls</h3>
                        <p className="text-neutral-400 text-sm">
                            Represents the total number of paid U.S. workers of any business, excluding general government employees, private household employees, nonprofit organization employees, and farm workers.
                        </p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <h3 className="text-neutral-100 font-medium mb-2">Average Hourly Earnings</h3>
                        <p className="text-neutral-400 text-sm">
                            A key measure of wage inflation. Monthly change in the amount businesses pay their employees per hour.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
