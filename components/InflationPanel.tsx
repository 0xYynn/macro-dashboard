"use client";

import { useState } from "react";
import { TimeRangeDropdown, TimeRange } from "@/components/TimeRangeDropdown";
import { filterByTimeRange } from "@/lib/timeRange";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { MacroSeries } from "@/lib/types";
import { useMounted } from "@/hooks/use-mounted";

const chartConfig = {
    cpi: {
        label: "Headline CPI",
        color: "#8b5cf6", // Violet-500
    },
    corePce: {
        label: "Core PCE",
        color: "#c4b5fd", // Violet-300
    },
} satisfies ChartConfig;

type Props = {
    cpi: MacroSeries;
    corePce: MacroSeries;
};

export function InflationPanel({ cpi, corePce }: Props) {
    const isMounted = useMounted();
    const [range, setRange] = useState<TimeRange>("12m");

    const merged = cpi.points.map((p) => {
        const match = corePce.points.find((q) => q.date === p.date);
        return {
            date: p.date,
            cpi: p.value ?? null,
            corePce: match?.value ?? null,
        };
    });

    const data = filterByTimeRange(merged, range);

    if (!isMounted) return <div className="h-[360px] w-full bg-neutral-900/50 rounded-xl animate-pulse" />;

    return (
        <Card className="border-neutral-800 bg-neutral-900 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-neutral-100 font-medium tracking-tight">US Inflation — CPI vs Core PCE</CardTitle>
                    <CardDescription className="text-neutral-500">Raw Consumer Price Index & PCE Price Index</CardDescription>
                </div>
                <TimeRangeDropdown value={range} onChange={setRange} />
            </CardHeader>

            <CardContent className="h-[360px] px-6 pb-6 pt-0">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart
                        data={data}
                        margin={{ left: -20, right: 10, top: 20, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} stroke="#fff" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tickFormatter={(v) => v.split('-')[0]} // Show year only
                            minTickGap={60}
                            tick={{
                                fill: "#737373", // neutral-500
                                fontSize: 11,
                                fontFamily: "var(--font-mono)"
                            }}
                        />
                        <YAxis
                            tick={{ fill: "#a3a3a3", fontSize: 11, fontFamily: "var(--font-mono)" }}
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                        />
                        <ChartTooltip
                            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="cpi"
                            type="monotone"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                        <Line
                            dataKey="corePce"
                            type="monotone"
                            stroke="#c4b5fd"
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
