import { CountryDashboard } from "@/components/CountryDashboard";
import { loadCountryMacro } from "@/lib/data";

export default async function USPage() {
    const data = await loadCountryMacro("us");

    return (
        <CountryDashboard
            countryCode="US"
            data={data}
        />
    );
}

