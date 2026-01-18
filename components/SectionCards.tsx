"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    classifyInflation,
    classifyWages,
    classifyYield2Y,
    deriveUsdBias,
} from "@/lib/macroSignals";

import { Series } from "@/lib/data";

type Props = {
    cpi: Series;
    corePce: Series;
    wages: Series;
    dgs2: Series;
};

export function SectionCards({
    cpi,
    corePce,
    wages,
    dgs2,
}: Props) {
    const inflation = classifyInflation(cpi.points, corePce.points);
    const wageState = classifyWages(wages.points);
    const yieldState = classifyYield2Y(dgs2.points);
    const usdBias = deriveUsdBias(inflation, wageState, yieldState);

    const cards = [
        {
            title: "Inflation Trend",
            value: inflation,
            description: "Based on last 12–24 months (CPI vs Core PCE)",
        },
        {
            title: "Wage Pressure",
            value: wageState,
            description: "Based on last 6–12 months",
        },
        {
            title: "2Y Market Signal",
            value: yieldState,
            description: "Based on last 6–12 months",
        },
        {
            title: "USD Bias",
            value: usdBias,
            description: "Synthesized from all three signals",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <Card
                    key={card.title}
                    className="border-neutral-800 bg-neutral-900 shadow-xl"
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                            {card.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-2xl font-bold mb-1 ${getTrendColor(card.value)}`}>
                            {card.value}
                        </p>
                        <CardDescription className="text-xs text-neutral-500">
                            {card.description}
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
