// lib/macroSignals.ts

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

export type Horizon = "weekly" | "monthly" | "macro";

export type InflationState =
    | "Cooling"
    | "Sticky"
    | "Re-accelerating";

export type WageState =
    | "Easing"
    | "Stable"
    | "Tightening";

export type YieldState =
    | "Falling"
    | "Range"
    | "Rising";

export type UsdBias =
    | "Bullish"
    | "Bearish"
    | "Neutral";

export type SeriesPoint = {
    date: string;
    value: number | null;
};

// ------------------------------------------------------------
// LOOKBACK CONFIG (single source of truth)
// ------------------------------------------------------------

type LookbackConfig = {
    inflationMonths: number;
    wagesMonths: number;
    yieldMonths: number;
};

export const HORIZON_LOOKBACKS: Record<Horizon, LookbackConfig> = {
    macro: {
        inflationMonths: 18,
        wagesMonths: 9,
        yieldMonths: 9,
    },
    monthly: {
        inflationMonths: 6,
        wagesMonths: 6,
        yieldMonths: 4,
    },
    weekly: {
        // Weekly is intentionally short and yield-heavy
        inflationMonths: 2,
        wagesMonths: 2,
        yieldMonths: 2, // ~ last 6–8 weeks of data
    },
};

// ------------------------------------------------------------
// CORE NUMERICAL PRIMITIVE
// ------------------------------------------------------------

/**
 * Compute average monthly change over a lookback window.
 * This is intentionally simple, transparent, and auditable.
 */
export function computeSlopeMonthly(
    points: SeriesPoint[],
    months: number
): number {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);

    const window = points
        .filter(p => p.value != null && new Date(p.date) >= cutoff)
        .sort(
            (a, b) => +new Date(a.date) - +new Date(b.date)
        );

    // Not enough data → treat as flat
    if (window.length < 3) return 0;

    const first = window[0].value!;
    const last = window[window.length - 1].value!;

    return (last - first) / months; // avg change per month
}

// ------------------------------------------------------------
// CLASSIFIERS (HORIZON-AWARE)
// ------------------------------------------------------------

export function classifyInflation(
    cpi: SeriesPoint[],
    core: SeriesPoint[],
    horizon: Horizon
): InflationState {
    const { inflationMonths } = HORIZON_LOOKBACKS[horizon];

    const slope =
        (computeSlopeMonthly(cpi, inflationMonths) +
            computeSlopeMonthly(core, inflationMonths)) /
        2;

    // Conservative thresholds to avoid jitter
    if (slope < -0.02) return "Cooling";
    if (slope > 0.02) return "Re-accelerating";
    return "Sticky";
}

export function classifyWages(
    wages: SeriesPoint[],
    horizon: Horizon
): WageState {
    const { wagesMonths } = HORIZON_LOOKBACKS[horizon];

    const slope = computeSlopeMonthly(wages, wagesMonths);

    if (slope < -0.01) return "Easing";
    if (slope > 0.01) return "Tightening";
    return "Stable";
}

export function classifyYield2Y(
    yields: SeriesPoint[],
    horizon: Horizon
): YieldState {
    const { yieldMonths } = HORIZON_LOOKBACKS[horizon];

    const slope = computeSlopeMonthly(yields, yieldMonths);

    if (slope < -0.01) return "Falling";
    if (slope > 0.01) return "Rising";
    return "Range";
}

// ------------------------------------------------------------
// USD BIAS DERIVATION
// ------------------------------------------------------------

export function deriveUsdBias(
    inflation: InflationState,
    wages: WageState,
    yield2y: YieldState,
    horizon: Horizon
): UsdBias {

    // ---------- WEEKLY LOGIC (yield-dominant) ----------
    if (horizon === "weekly") {
        if (yield2y === "Rising") return "Bullish";
        if (yield2y === "Falling") return "Bearish";
        // If yields are range, fall back to broader signals below
    }

    // ---------- DEFAULT LOGIC (monthly + macro) ----------
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

// ------------------------------------------------------------
// OPTIONAL: helper if you want all signals at once
// ------------------------------------------------------------

export function analyzeUsdSignals(
    cpi: SeriesPoint[],
    core: SeriesPoint[],
    wages: SeriesPoint[],
    yields2y: SeriesPoint[],
    horizon: Horizon
) {
    const inflation = classifyInflation(cpi, core, horizon);
    const wageState = classifyWages(wages, horizon);
    const yieldState = classifyYield2Y(yields2y, horizon);
    const usdBias = deriveUsdBias(
        inflation,
        wageState,
        yieldState,
        horizon
    );

    return {
        inflation,
        wageState,
        yieldState,
        usdBias,
    };
}
