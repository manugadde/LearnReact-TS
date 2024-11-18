import React, {useEffect} from "react";

import {Jumbotron} from "../jumbotron/Jumbotron";
import {LicensePlate} from "../license-plate/LicensePlate";
import { LicensePlateData, CurrencyInfo } from '../license-plate-data.type';
import {PromoBanner} from "../promo-banner/PromoBanner";
import {Spinner} from "../spinner/Spinner";
import { PopupWindow } from "../popup/PopupWindow";
import { useCart } from "../cart-service/cart-hook";


export interface StoreViewProps {
    currencyInfo: CurrencyInfo;
}

export function StoreView(props: StoreViewProps): JSX.Element {

    const [licensePlates, setLicensePlates] = React.useState<LicensePlateData[]>([]);
	const [loading, setLoading] = React.useState(true);
    const [showPopup, setShowPopup] = React.useState(false);
    const [, addToCart] = useCart();

    const onButtonClick = (plate: LicensePlateData) => {
        addToCart(plate).then(() => setShowPopup(true));
    }

	useEffect(() => {
		fetch('http://localhost:8000/data')
			.then(response => response.json())
			.then(data => setLicensePlates(data));
	}, []);

	useEffect(() => {
		fetch('http://localhost:8000/data')
			.then(response => response.json())
			.then(data => {
				setLicensePlates(data);
				setLoading(false);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spinner />;
	}
	return (
		<>
				<Jumbotron title="Welcome to our store"
						   description="Browse our collection of plates"/>
				{loading && <Spinner />}
				<PromoBanner />
				<div className="container">
					<div className="row">
						{ licensePlates.map((plate, index) =>
                            <div className={getLicensePlateCssClass(index)}
                                 key={plate._id}>
								<LicensePlate 
                                currencyInfo={props.currencyInfo} 
                                buttonText="Add to cart"
								onButtonClick={onButtonClick}
								plate={plate}/>
                            </div>
						)
						}
					</div>
				</div>
                <PopupWindow show={showPopup} title="Plate added to cart" 
                    onClose={() => setShowPopup(false)} >
                        Happy shopping!
                    </PopupWindow>
			</>
);
};

export function getLicensePlateCssClass(index: number): string {
	return index % 2 === 0 ? "highlight col-md-4" : "col-md-4";
}
