import React, {useEffect} from 'react';
import {LicensePlate} from '../license-plate/LicensePlate';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {useCart} from "../cart-service/cart-hook";


export function CartView(props) {

	const [cartContents, , removeFromCart] = useCart();

	const removeItemFromCart = (plate) => {
		removeFromCart(plate);
	}
	useEffect(() => {
		console.log("Cart contents updated:", cartContents);
	}, [cartContents]);

	let rows;
	if (cartContents) {
		rows = cartContents.map((licensePlate, index) => {
			return (
				<div key={licensePlate._id} className="col-md-4" style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}>
					<LicensePlate currencyInfo={props.currencyInfo} plate={licensePlate} buttonText="Remove from cart &times;"
					   onButtonClick={() => removeItemFromCart(licensePlate)}/>
				</div>
			);
		});
	}
	return (
		<>
			<Jumbotron title="My Cart" description="Your current cart contents:"/>
			<div className="container">
				{rows && rows.length === 0 && <div className="alert alert-info" role="alert">Your cart is empty</div>}
				<div className="row" >
					{rows}
				</div>
				<hr/>
			</div>
		</>
	);
}
