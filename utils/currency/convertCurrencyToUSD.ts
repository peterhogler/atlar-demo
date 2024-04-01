// /utils/currency/convertCurrencyToUSD.ts

export type Currency = "EUR" | "GBP" | "SEK" | "DKK" | "USD";

const conversionRates: Record<Currency, number> = {
    EUR: 1, // 1 EUR = 1 USD
    GBP: 1, // 1 GBP = 1 USD
    SEK: 0.1, // 10 SEK = 1 USD
    DKK: 0.1, // 10 DKK = 1 USD
    USD: 1, // 1 USD = 1 USD
};

const convertCurrencyToUSD = (amount: number, currency: Currency): number => {
    const rate = conversionRates[currency] || 1;
    // Apply the conversion rate directly to the amount, keeping its sign (positive or negative)
    return amount * rate;
};

export default convertCurrencyToUSD;
