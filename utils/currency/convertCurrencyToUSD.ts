// /utils/currency/convertCurrencyToUSD.ts

import { Currency } from "@/typings/account.typings";

const conversionRates: Record<Currency, number> = {
    EUR: 1, // 1 EUR = 1 USD
    GBP: 1, // 1 GBP = 1 USD
    SEK: 0.1, // 10 SEK = 1 USD
    DKK: 0.1, // 10 DKK = 1 USD
    USD: 1, // 1 USD = 1 USD
};

const convertCurrencyToUSD = (stringValue: string, currency: Currency): number => {
    const numericValue = parseFloat(stringValue.replace(/,/g, ""));
    const rate = conversionRates[currency] || 1;
    return numericValue * rate;
};

export default convertCurrencyToUSD;
