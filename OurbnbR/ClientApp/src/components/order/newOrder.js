import { React, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import "./neworder.css"
import { parseDateTime } from '../../formating';


export function NewOrder() {
    const params = useParams();

    // sets values to make an order
    const [values, setValues] = useState(
        {
            customerId: 0, rentalId: 0, rating: 0, from: "", to: "", rental: { owner: {} }, customer: {}, totalPrice: 0,
        });

    // sets values to get info from rental to be displayed to user 
    const [rental, setRental] = useState(
        {
            rentalId: 0, name: "", from: "", to: "", rental: { owner: {} }, customer: {},
        });
    
    const [validation, setValidation] = useState("loading");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    

    // calls the getrental method
    useEffect(() => {
        getRental()
    }, []);

    // method checks if rental has id bigger than 0 and gets data from getobjectfromid and get info 
    async function getRental() {
        if (params.id > 0) {
            const response = await fetch('api/rentals/' + params.id);
            const data = await response.json();
            setRental(data);
            setLoading(false);

        }

        else {
            setValidation("Invalid parameter")
        }

    }

    // method whem submiting data to database
    // we use a post method to create order
    // and gets rederected to orders
    // shows if it failed to post
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const rep = await fetch('api/order/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });

            const answer = await rep.json();
            console.log("Success: " + answer.success);

            // if it gets posted user gets sent to orders
            if (answer.success) {
                navigate("/orders")
            }
        // error shows that it failed to post
        } catch (error) {
            console.log("Failed")
        }
    }

    // sets values of the data from the input form
    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value });
    }

    // html for create order
    return (
        loading ? <p>{validation}</p> : 

        <div>
            <h1>Create Order</h1>
                <div className="rentalInfo">
                    <p className="ptxt"> Name of Rental: {rental.name}</p>
                    <p className="ptxt">Available From: {parseDateTime(rental.fromDate)}</p>
                    <p className="ptxt">Available To: {parseDateTime(rental.toDate)}</p>
            </div>
            <form onSubmit={handleSubmit}>
                {inputlist.map((input) => (
                    <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                ))}
                    <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                </form>
        </div>
    );
}


