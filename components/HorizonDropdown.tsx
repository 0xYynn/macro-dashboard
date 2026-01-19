"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Horizon } from "@/lib/macroSignals";

const LABELS: Record<Horizon, string> = {
    weekly: "Weekly bias",
    monthly: "Monthly bias",
    macro: "Macro regime",
};

type Props = {
    value: Horizon;
    onChange: (h: Horizon) => void;
};

export function HorizonDropdown({ value, onChange }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    {LABELS[value]}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {(["weekly", "monthly", "macro"] as Horizon[]).map(h => (
                    <DropdownMenuItem key={h} onClick={() => onChange(h)}>
                        {LABELS[h]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
