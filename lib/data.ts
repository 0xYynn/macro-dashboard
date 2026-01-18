import fs from "fs";
import path from "path";

export type Point = {
    date: string;
    value: number | null;
};

export type Series = {
    id: string;
    points: Point[];
};

function loadSeries(filename: string): Series {
    const filePath = path.join(process.cwd(), "data/normalized", filename);
    console.log(`[DATA] Loading ${filename} from ${filePath}`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    return {
        id: json.id,
        points: json.points,
    };
}

export function loadAllMacroData() {
    return {
        cpi: loadSeries("CPIAUCSL.json"),
        corePce: loadSeries("PCEPILFE.json"),
        nfp: loadSeries("PAYEMS.json"),
        wages: loadSeries("CES0500000003.json"),
        dgs2: loadSeries("DGS2.json"),
    };
}
