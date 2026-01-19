import { CountryMacroData, MacroSeries } from "./types";
import fs from "fs";
import path from "path";

// Map abstract names to actual FRED file names
// Usage: FILE_MAP[country][metric]
const FILE_MAP: Record<string, Record<keyof CountryMacroData, string>> = {
    us: {
        inflation: "CPIAUCSL.json",
        coreInflation: "PCEPILFE.json",
        wages: "CES0500000003.json",
        yield2y: "DGS2.json",
        nfp: "PAYEMS.json", // Optional but good to map
    },
};

function loadSeries(country: string, filename: string): MacroSeries {
    // Construct path: data/[country]/normalized/[filename]
    const filePath = path.join(process.cwd(), "data", country, "normalized", filename);

    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const json = JSON.parse(raw);
        return {
            points: json.points,
        };
    } catch (e) {
        console.error(`[DATA] Failed to load ${filePath}`, e);
        return { points: [] };
    }
}

export async function loadCountryMacro(
    country: string
): Promise<CountryMacroData> {
    const map = FILE_MAP[country.toLowerCase()];
    if (!map) {
        throw new Error(`No file map found for country: ${country}`);
    }

    return {
        inflation: loadSeries(country, map.inflation),
        coreInflation: loadSeries(country, map.coreInflation),
        wages: loadSeries(country, map.wages),
        yield2y: loadSeries(country, map.yield2y),
        nfp: map.nfp ? loadSeries(country, map.nfp) : undefined,
    };
}

// Backward compatibility for existing pages
export function loadAllMacroData() {
    const map = FILE_MAP["us"];
    return {
        cpi: loadSeries("us", map.inflation),
        corePce: loadSeries("us", map.coreInflation),
        nfp: map.nfp ? loadSeries("us", map.nfp) : { points: [] },
        wages: loadSeries("us", map.wages),
        dgs2: loadSeries("us", map.yield2y),
    };
}
