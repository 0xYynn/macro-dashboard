import { loadAllMacroData } from "@/lib/data";
import { InflationPanel } from "@/components/InflationPanel";
import { JobsPanel } from "@/components/JobsPanel";
import { YieldPanel } from "@/components/YieldPanel";
import { BiasNotes } from "@/components/BiasNotes";

export default function Page() {
    const { cpi, corePce, nfp, wages, dgs2 } = loadAllMacroData();

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10 mb-20">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                    Macro Intelligence Dashboard
                </h1>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                    Real-time Economic Surveillance Terminal
                </p>
            </header>

            <div className="grid gap-8">
                <InflationPanel cpi={cpi} corePce={corePce} />
                <JobsPanel nfp={nfp} wages={wages} />
                <YieldPanel dgs2={dgs2} />
                <BiasNotes />
            </div>
        </div>
    );
}
