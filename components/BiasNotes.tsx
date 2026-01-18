"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function BiasNotes() {
    return (
        <Card className="border-neutral-800 bg-neutral-900 shadow-xl">
            <CardHeader className="pb-4">
                <CardTitle className="text-neutral-100 font-medium">My Bias Notes</CardTitle>
                <CardDescription className="text-neutral-500">Personal macro thoughts and market observations</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Capture your core macro thesis here..."
                    className="min-h-[160px] bg-neutral-950 border-neutral-800 text-neutral-200 placeholder:text-neutral-600 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
                />
            </CardContent>
        </Card>
    );
}
