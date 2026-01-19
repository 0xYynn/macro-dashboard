export type SeriesPoint = {
    date: string;
    value: number | null;
};

export type MacroSeries = {
    points: SeriesPoint[];
};

export type CountryMacroData = {
    inflation: MacroSeries;
    coreInflation: MacroSeries;
    wages: MacroSeries;
    nfp?: MacroSeries;
    yield2y: MacroSeries;
};
