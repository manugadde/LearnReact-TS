import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';

import {Navigation} from './navigation/Navigation';
import {StoreView} from './store-view/StoreView';
import {CartView} from './cart-view/CartView';
import {CheckoutView} from './checkout-view/CheckoutView';
import { UseCurrencyInfo } from './currency/UseCurrencyInfo';

export function App() {

   const [currencyInfo, setCurrency] = UseCurrencyInfo();

	return (
		<div className="App">
             <BrowserRouter>
               <Navigation currency={currencyInfo.currency} onCurrencyChange={setCurrency}/>
               <main role="main">
                 <Routes>
					<Route path="/" element={<StoreView currencyInfo={currencyInfo}    />} />
				    <Route path="/cart" element={<CartView currencyInfo={currencyInfo} />} />
				    <Route path="/checkout" element={<CheckoutView />} />
                 </Routes>
               </main>
              </BrowserRouter>
          </div>

);
};

