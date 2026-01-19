"use client";

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
import { CartesianGrid, Line, Bar, ComposedChart, XAxis, YAxis } from "recharts";
import { MacroSeries } from "@/lib/types";
import { useMounted } from "@/hooks/use-mounted";
import { useState } from "react";
import { TimeRangeDropdown, TimeRange } from "@/components/TimeRangeDropdown";
import { filterByTimeRange } from "@/lib/timeRange";

const chartConfig = {
    nfp: {
        label: "Nonfarm Payrolls",
        color: "#8b5cf6", // Violet-500
    },
    wages: {
        label: "Avg Hourly Earnings",
        color: "#ffffff",
    },
} satisfies ChartConfig;

type Props = {
    nfp: MacroSeries;
    wages: MacroSeries;
};

export function JobsPanel({ nfp, wages }: Props) {
    const isMounted = useMounted();
    const [range, setRange] = useState<TimeRange>("12m");

    const rawData = nfp.points.map((p) => {
        const match = wages.points.find((q) => q.date === p.date);
        return {
            date: p.date,
            nfp: p.value ?? undefined,
            wages: match?.value ?? undefined,
        };
    });

    const data = filterByTimeRange(rawData, range);

    if (!isMounted) return <div className="h-[360px] w-full bg-neutral-900/50 rounded-xl animate-pulse" />;

    return (
        <Card className="border-neutral-800 bg-neutral-900 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-neutral-100 font-medium">US Labor — NFP & Wages</CardTitle>
                    <CardDescription className="text-neutral-500">Monthly Nonfarm Payrolls & Wage Growth</CardDescription>
                </div>
                <TimeRangeDropdown value={range} onChange={setRange} />
            </CardHeader>

            <CardContent className="h-[360px] px-6 pb-6 pt-0">
                <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
                    <ComposedChart
                        accessibilityLayer
                        data={data}
                        margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} stroke="#fff" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tickFormatter={(v) => v.slice(0, 4)}
                            interval="preserveStartEnd"
                            minTickGap={20}
                            tick={{
                                fill: "var(--color-neutral-500)",
                                fontSize: 11,
                                fontFamily: "var(--font-mono)"
                            }}
                        />
                        <YAxis
                            yAxisId="left"
                            width={60}
                            tick={{ fill: "var(--color-neutral-400)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            width={60}
                            tick={{ fill: "var(--color-neutral-400)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <ChartTooltip
                            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            yAxisId="left"
                            dataKey="nfp"
                            type="monotone"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                        <Line
                            yAxisId="right"
                            dataKey="wages"
                            type="monotone"
                            stroke="#ffffff"
                            strokeWidth={1.5}
                            opacity={0.8}
                            dot={false}
                            connectNulls
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
