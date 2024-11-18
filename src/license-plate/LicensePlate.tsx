import React from 'react';
import './LicensePlate.css';
import { LicensePlateData, CurrencyInfo } from '../license-plate-data.type';

export interface LicensePlateProps {
    plate: LicensePlateData;
    buttonText: string;
    currencyInfo: CurrencyInfo;
    onButtonClick: (plate: LicensePlateData) => void;
}

export function LicensePlate(props: LicensePlateProps): JSX.Element {
    const { buttonText, onButtonClick, plate, currencyInfo } = props;
    const price = currencyInfo ? Number((plate.price / currencyInfo.exchangeRate).toFixed(2)) : 0;

    return (
        <>
            <h2>{plate.title}</h2>
            {plate.onSale && <img src="sale.png" alt="On Sale" />}
            <img src={plate.picture} alt={plate.title} className="img-fluid" />
            <p>{plate.description}</p>
            <div>
                <h2 className="float-left">{currencyInfo ? currencyInfo.symbol : ''}{price}</h2>
                <button onClick={() => onButtonClick(plate)} className="btn btn-primary float-right">
                    {buttonText}
                </button>
            </div>
        </>
    );
}