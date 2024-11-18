import { useState, useEffect } from 'react';
import { Currency, CurrencyInfo, ExchangeRates } from '../license-plate-data.type';


const DEFAULT_RATES: ExchangeRates = {USD: 1, EUR: 0.85, GBP: 0.78};
const DEFAULT_CURRENCY_INFO: CurrencyInfo = {currency: 'USD' as Currency, exchangeRate: 1, symbol: '$'};
const CURRENCY_SYMBOLS: Record<Currency, string> = {EUR: '€', USD: '$', GBP: '£'};

type CurrencySetter = (currency: Currency) => void;

export function UseCurrencyInfo(): [CurrencyInfo, CurrencySetter]  {

    const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY_INFO.currency);
    const [rates, setRates] = useState<ExchangeRates>(DEFAULT_RATES);
    const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>(DEFAULT_CURRENCY_INFO);

    useEffect(() => {
		fetch(`http://localhost:8000/rates`).then(json => json.json())
		.then(data => setRates(data));
   }, []);

   useEffect(() => {
		setCurrencyInfo({
			currency, 
			exchangeRate: rates[currency], 
			symbol: CURRENCY_SYMBOLS[currency]});

   }, [rates, currency]);

    return [currencyInfo, setCurrency];

}