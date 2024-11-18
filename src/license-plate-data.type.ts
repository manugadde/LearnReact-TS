export interface LicensePlateData {
    _id: string;
    onSale: boolean;
    picture: string;
    title: string;
    price: number;
    year: number;
    state: string;
    description: string;
}


export type Currency = "USD" | "EUR" | "GBP";

export interface CurrencyInfo {
	currency: Currency;
	exchangeRate: number;
	symbol: string;
}

export type ExchangeRates = Record<Currency, number>;
