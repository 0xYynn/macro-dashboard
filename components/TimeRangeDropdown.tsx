"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export type TimeRange = "6m" | "12m" | "24m" | "all";

const LABELS: Record<TimeRange, string> = {
    "6m": "Last 6 months",
    "12m": "Last 12 months",
    "24m": "Last 24 months",
    all: "All data",
};

type Props = {
    value: TimeRange;
    onChange: (range: TimeRange) => void;
};

export function TimeRangeDropdown({ value, onChange }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    Show: {LABELS[value]}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800 text-neutral-200">
                {(["6m", "12m", "24m", "all"] as TimeRange[]).map((range) => (
                    <DropdownMenuItem
                        key={range}
                        onClick={() => onChange(range)}
                    >
                        {LABELS[range]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
