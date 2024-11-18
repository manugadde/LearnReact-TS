import React, {useState} from 'react';
import { UsStateDropdown } from '../us-state-dropdown/UsStateDropdown';

export function CheckoutForm() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [zipValid, setZipValid] = useState(false);
    const [state, setState] = useState('');
    const [cc, setCc] = useState('');

    const handleChange = (event, setter) => {
        const {value} = event.target;
        setter(value);
    };

    const onSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:8000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          street: street,
          city: city,
          zip: zip,
          state: state,
          cc: cc
        }).then(response => {alert('Order submitted')})
      })
    }

    const checkZipCodeValidity = (event) => {
      handleChange(event, setZip);
      if (event.target.validationMessage !== "") {
        setZipValid(false);
      }
      else {
        setZipValid(true);
      }
    }

    return (
        <form id="checkoutForm" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-lg-6">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="First name" name="firstname"
                         required value={firstname} onChange={e => handleChange(e, setFirstname)}/>
                </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Last name" name="lastname"
                       required value={lastname} onChange={e => handleChange(e, setLastname)}/>
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-lg-6">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Street" name="street"
                required value={street} onChange={e => handleChange(e, setStreet)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="City" name="city"
                required value={city} onChange={e => handleChange(e, setCity)}/>
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-lg-6">
              {!zipValid && <div className="alert alert-danger" role="alert">Invalid zip code</div>}
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Zip" name="zip"
                required pattern="[0-9]{5}" value={zip} onChange={checkZipCodeValidity}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group">
                <UsStateDropdown value={state} onChange={e => handleChange(e, setState)} />
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-lg-6">
              <div className="input-group">
                <input type="password" className="form-control" placeholder="Credit card number" name="cc" 
                required value={cc} onChange={e => handleChange(e, setCc)}/>
              </div>
            </div>
            <div className="col-lg-6">
            </div>
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    );
}
