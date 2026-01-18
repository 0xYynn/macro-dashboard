export type TimeRange = "6m" | "12m" | "24m" | "all";

export function filterByTimeRange<T extends { date: string }>(
    data: T[],
    range: TimeRange
): T[] {
    if (range === "all") return data;

    const months = {
        "6m": 6,
        "12m": 12,
        "24m": 24,
    }[range];

    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);

    return data.filter(d => new Date(d.date) >= cutoff);
}
