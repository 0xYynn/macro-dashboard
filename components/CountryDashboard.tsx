"use client";

import { useState } from "react";
import { CountryMacroData, SeriesPoint } from "@/lib/types";
import { SectionCards } from "@/components/SectionCards";
import { RelativityPanel } from "@/components/RelativityPanel";
import { InflationPanel } from "@/components/InflationPanel";
import { JobsPanel } from "@/components/JobsPanel";
import { YieldPanel } from "@/components/YieldPanel";
import { analyzeUsdSignals, type Horizon } from "@/lib/macroSignals";

type Props = {
    countryCode: string;
    data: CountryMacroData;
};

function toSeries(points: SeriesPoint[], id: string) {
    return { id, points };
}

export function CountryDashboard({ countryCode, data }: Props) {
    const [horizon, setHorizon] = useState<Horizon>("macro");

    const { inflation, wageState, yieldState, usdBias } = analyzeUsdSignals(
        data.inflation.points,
        data.coreInflation.points,
        data.wages.points,
        data.yield2y.points,
        horizon
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10 mb-20">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                    {countryCode} Macro Dashboard
                </h1>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                    Real-time Economic Surveillance
                </p>
            </header>

            <div className="grid gap-8">
                <SectionCards
                    horizon={horizon}
                    onHorizonChange={setHorizon}
                    inflation={inflation}
                    wageState={wageState}
                    yieldState={yieldState}
                    usdBias={usdBias}
                />

                <RelativityPanel usdBias={usdBias} horizon={horizon} />

                <InflationPanel
                    cpi={toSeries(data.inflation.points, "cpi")}
                    corePce={toSeries(data.coreInflation.points, "corePce")}
                />

                <JobsPanel
                    nfp={toSeries((data.nfp || data.wages).points, "nfp")}
                    wages={toSeries(data.wages.points, "wages")}
                />

                <YieldPanel
                    dgs2={toSeries(data.yield2y.points, "dgs2")}
                />

            </div>
        </div>
    );
}
