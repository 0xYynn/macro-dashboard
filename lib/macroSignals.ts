export type Trend =
    | "cooling"
    | "sticky"
    | "reaccelerating"
    | "easing"
    | "stable"
    | "tightening"
    | "falling"
    | "range"
    | "rising";

export type Bias = "bullish" | "bearish" | "neutral";

function computeSlopeMonthly(
    points: { date: string; value: number | null }[],
    months: number
): number {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);

    const window = points
        .filter(p => new Date(p.date) >= cutoff && p.value != null)
        .sort((a, b) => +new Date(a.date) - +new Date(b.date));

    if (window.length < 6) return 0;

    const first = window[0].value!;
    const last = window[window.length - 1].value!;

    return (last - first) / months; // avg change per month
}

export function classifyInflation(
    cpi: { date: string; value: number | null }[],
    core: { date: string; value: number | null }[]
): "Cooling" | "Sticky" | "Re-accelerating" {
    const slope =
        (computeSlopeMonthly(cpi, 18) +
            computeSlopeMonthly(core, 18)) /
        2;

    if (slope < -0.02) return "Cooling";
    if (slope > 0.02) return "Re-accelerating";
    return "Sticky";
}

export function classifyWages(
    wages: { date: string; value: number | null }[]
): "Easing" | "Stable" | "Tightening" {
    const slope = computeSlopeMonthly(wages, 9);

    if (slope < -0.01) return "Easing";
    if (slope > 0.01) return "Tightening";
    return "Stable";
}

export function classifyYield2Y(
    yields: { date: string; value: number | null }[]
): "Falling" | "Range" | "Rising" {
    const slope = computeSlopeMonthly(yields, 9);

    if (slope < -0.01) return "Falling";
    if (slope > 0.01) return "Rising";
    return "Range";
}

export function deriveUsdBias(
    inflation: "Cooling" | "Sticky" | "Re-accelerating",
    wages: "Easing" | "Stable" | "Tightening",
    yield2y: "Falling" | "Range" | "Rising"
): "Bullish" | "Bearish" | "Neutral" {
    const hawkish =
        inflation === "Re-accelerating" ||
        wages === "Tightening" ||
        yield2y === "Rising";

    const dovish =
        inflation === "Cooling" ||
        wages === "Easing" ||
        yield2y === "Falling";

    if (hawkish && !dovish) return "Bullish";
    if (dovish && !hawkish) return "Bearish";
    return "Neutral";
}
