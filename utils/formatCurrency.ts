export type CurrencyType = "EUR" | "USD" | "GBP" | "SEK" | "DKK";

export function formatCurrency(value: string, currencyCode: CurrencyType): string {
    let locale;
    switch (currencyCode) {
        case "EUR":
            locale = "de-DE";
            break;
        case "USD":
            locale = "en-US";
            break;
        case "GBP":
            locale = "en-GB";
            break;
        case "SEK":
            locale = "sv-SE";
            break;
        case "DKK":
            locale = "da-DK";
            break;
        default:
            locale = "en-US";
    }

    const numericValue = parseFloat(value.replace(/,/g, ""));
    if (isNaN(numericValue)) {
        throw new Error("Invalid number format");
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);
}
