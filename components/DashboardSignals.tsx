"use client";

import { useState } from "react";
import { SectionCards } from "@/components/SectionCards";
import { RelativityPanel } from "@/components/RelativityPanel";
import { analyzeUsdSignals, type Horizon, type SeriesPoint } from "@/lib/macroSignals";

type SeriesWrapper = { points: SeriesPoint[] };

type Props = {
    cpi: SeriesWrapper;
    corePce: SeriesWrapper;
    wages: SeriesWrapper;
    dgs2: SeriesWrapper;
};

export function DashboardSignals({ cpi, corePce, wages, dgs2 }: Props) {
    const [horizon, setHorizon] = useState<Horizon>("macro");

    const { inflation, wageState, yieldState, usdBias } = analyzeUsdSignals(
        cpi.points,
        corePce.points,
        wages.points,
        dgs2.points,
        horizon
    );

    return (
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
        </div>
    );
}
