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
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Series } from "@/lib/data";
import { useMounted } from "@/hooks/use-mounted";

const chartConfig = {
    dgs2: {
        label: "US 2Y Yield",
        color: "#8b5cf6", // Violet-500
    },
} satisfies ChartConfig;

type Props = {
    dgs2: Series;
};

export function YieldPanel({ dgs2 }: Props) {
    const isMounted = useMounted();
    const data = dgs2.points.map((p) => ({
        date: p.date,
        dgs2: p.value ?? null,
    }));

    if (!isMounted) return <div className="h-[520px] w-full bg-neutral-900/50 rounded-xl animate-pulse" />;

    return (
        <Card className="border-neutral-800 bg-neutral-900 shadow-xl">
            <CardHeader className="pb-4">
                <CardTitle className="text-neutral-100 font-medium">US 2-Year Treasury Yield — Market View of Fed Policy</CardTitle>
                <CardDescription className="text-neutral-500">Daily yield data tracking market interest rate expectations</CardDescription>
            </CardHeader>

            <CardContent className="h-[520px] px-6 pb-6 pt-0">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart
                        data={data}
                        margin={{ left: -20, right: 10, top: 20, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} stroke="#fff" />
                        <YAxis
                            tick={{ fill: "#a3a3a3", fontSize: 11, fontFamily: "var(--font-mono)" }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `${v}%`}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tickFormatter={(v) => v.split('-')[0]}
                            minTickGap={60}
                            tick={{
                                fill: "#737373",
                                fontSize: 11,
                                fontFamily: "var(--font-mono)"
                            }}
                        />
                        <ChartTooltip
                            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="dgs2"
                            type="monotone"
                            stroke="#8b5cf6"
                            strokeWidth={1.5}
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
