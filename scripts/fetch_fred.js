import fs from "fs";

const API_KEY = process.env.FRED_KEY;

if (!API_KEY) {
    console.error("❌ FRED_KEY is not set in your environment!");
    console.error("Run: setx FRED_KEY \"your_api_key_here\"");
    process.exit(1);
}

const SERIES = [
    "CPIAUCSL",
    "PCEPI",
    "PCEPILFE",
    "PAYEMS",
    "CES0500000003",
    "DGS2"
];

async function fetchSeries(seriesId) {
    const url =
        `https://api.stlouisfed.org/fred/series/observations?` +
        `series_id=${seriesId}&api_key=${API_KEY}&file_type=json`;

    const res = await fetch(url);
    const data = await res.json();

    // 🔹 IMPORTANT: check if FRED returned an error
    if (data.error_code) {
        console.error(`❌ FRED error for ${seriesId}:`, data.error_message);
        process.exit(1);
    }

    return data;
}

function normalize(raw) {
    return raw.observations.map(o => ({
        date: o.date,
        value: o.value === "." ? null : Number(o.value)
    }));
}

async function run() {
    for (const id of SERIES) {
        console.log(`Fetching: ${id}`);

        const raw = await fetchSeries(id);

        // Save raw data
        const rawDir = `data/raw`;
        if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir, { recursive: true });
        fs.writeFileSync(
            `${rawDir}/${id}_raw.json`,
            JSON.stringify(raw, null, 2)
        );

        // Normalize data
        const clean = {
            id,
            points: normalize(raw)
        };

        // Save clean data
        const normalizedDir = `data/normalized`;
        if (!fs.existsSync(normalizedDir)) fs.mkdirSync(normalizedDir, { recursive: true });
        fs.writeFileSync(
            `${normalizedDir}/${id}.json`,
            JSON.stringify(clean, null, 2)
        );

        console.log(`✅ Saved: ${id}`);
    }

    console.log("🎯 Pipeline complete.");
}

run();
