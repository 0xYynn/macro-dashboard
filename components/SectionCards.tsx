"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    type Horizon,
    type InflationState,
    type WageState,
    type YieldState,
    type UsdBias,
} from "@/lib/macroSignals";

import { HorizonDropdown } from "@/components/HorizonDropdown";

type Props = {
    horizon: Horizon;
    onHorizonChange: (h: Horizon) => void;
    inflation: InflationState;
    wageState: WageState;
    yieldState: YieldState;
    usdBias: UsdBias;
};

export function SectionCards({
    horizon,
    onHorizonChange,
    inflation,
    wageState,
    yieldState,
    usdBias
}: Props) {

    const cards = [
        {
            title: "Inflation Trend",
            value: inflation,
            description:
                horizon === "macro"
                    ? "Based on last 12–24 months"
                    : horizon === "monthly"
                        ? "Based on last ~6 months"
                        : "Based on recent prints",
        },
        {
            title: "Wage Pressure",
            value: wageState,
            description:
                horizon === "weekly"
                    ? "Recent releases only"
                    : "Based on recent months",
        },
        {
            title: "2Y Market Signal",
            value: yieldState,
            description:
                horizon === "weekly"
                    ? "Last 6–8 weeks of market pricing"
                    : "Recent trend in yields",
        },
        {
            title: "USD Bias",
            value: usdBias,
            description: `Bias for the ${horizon} horizon`,
        },
    ];

    const getTrendColor = (value: string) => {
        switch (value) {
            case "Cooling":
            case "Easing":
            case "Falling":
            case "Bullish":
                return "text-emerald-400"; // Greenish
            case "Re-accelerating":
            case "Tightening":
            case "Rising":
            case "Bearish":
                return "text-rose-400"; // Reddish
            case "Sticky":
            case "Stable":
            case "Range":
            case "Neutral":
                return "text-amber-400"; // Yellowish
            default:
                return "text-neutral-100";
        }
    };

    return (
        <div className="space-y-4">
            {/* Header row with dropdown */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-100">
                    USD Bias
                </h2>
                <HorizonDropdown value={horizon} onChange={onHorizonChange} />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map(card => (
                    <Card
                        key={card.title}
                        className="border-neutral-800 bg-neutral-900 shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-neutral-100 font-medium tracking-tight">
                                {card.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className={`text-2xl font-bold mb-1 ${getTrendColor(card.value)}`}>
                                {card.value}
                            </p>
                            <CardDescription className="text-neutral-500">
                                {card.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
