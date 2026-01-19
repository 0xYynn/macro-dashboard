"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { Horizon, UsdBias } from "@/lib/macroSignals";

type CrossFamily =
    | "EUR"
    | "GBP"
    | "JPY"
    | "AUD"
    | "CAD"
    | "CHF"
    | "NZD";

const CROSS_FAMILIES: CrossFamily[] = [
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "NZD",
];

// Relativity mapping: what USD bias *implies* for each cross family
const RELATIVITY_MAP: Record<
    UsdBias,
    Record<CrossFamily, string>
> = {
    Bullish: {
        EUR: "Leans weaker vs USD",
        GBP: "Leans weaker vs USD",
        JPY: "Generally supportive of USD strength",
        AUD: "Likely softer (risk-off tilt)",
        CAD: "Mixed, but leans USD strength",
        CHF: "Mixed, defensive tone",
        NZD: "Likely softer vs USD",
    },
    Bearish: {
        EUR: "Leans stronger vs USD",
        GBP: "Leans stronger vs USD",
        JPY: "Typically favors JPY strength",
        AUD: "Likely firmer (risk-on tilt)",
        CAD: "Mixed, but leans against USD",
        CHF: "Mixed, but softer USD",
        NZD: "Likely firmer vs USD",
    },
    Neutral: {
        EUR: "No clear directional edge",
        GBP: "No clear directional edge",
        JPY: "Range-bound tendency",
        AUD: "Data-dependent",
        CAD: "Data-dependent",
        CHF: "Range-bound / defensive",
        NZD: "Data-dependent",
    },
};

type Props = {
    usdBias: UsdBias;
    horizon: Horizon;
};

export function RelativityPanel({ usdBias, horizon }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">
                Relativity with Other Crosses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CROSS_FAMILIES.map(family => (
                    <Card
                        key={family}
                        className="border-neutral-800 bg-neutral-900 shadow-xl"
                    >
                        <CardHeader>
                            <CardTitle className="text-base">
                                {family} Crosses
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
                                {RELATIVITY_MAP[usdBias][family]}
                            </p>
                            <CardDescription className="mt-2">
                                Based on {horizon} USD bias
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
