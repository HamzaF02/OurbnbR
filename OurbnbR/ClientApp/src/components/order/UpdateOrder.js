import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import './orders.css';
import { Service } from "../Service"
import { parseDateTime } from '../../formating';


export default function UpdateOrder() {
    const [values, setValues] = useState(
        {
        });

    // sets values to get info from rental to be displayed to user 
    const [rental, setRental] = useState(
        {
            rentalId: 0, name: "", from: "", to: "", rental: { owner: {} }, customer: {},
        });
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState("")
    const params = useParams()
    const navigate = useNavigate()
    const api = new Service("order")
  
   

    useEffect(() => {
        getOrder()
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (values.from > values.to) {
            setError("Dates are not valid")
            return;
        }
        values.to += ":00"
        values.from += ":00"

        try {
            const answer = await api.update(values);
            console.log("Success: " + answer.success);
            if (answer.success) {
                navigate("/orders")
            }
        // error shows that it failed to post to db
        } catch (error) {
            console.log("Failed" + error.message)
            setError(error.message)
        }
    }

    // 
    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value });
    }

    async function getOrder() {
        const data = await api.getObjByid(params.id)
        console.log(data)
        setValues(data); setLoading(false);
    }


    return (

        loading ? <p>loading...</p> :
            <div>
                <h1>Update Order</h1>
                <div className="rentalInfo">
                    <p className="ptxt"> Name of Rental: {values.rental.name}</p>
                    <p className="ptxt">Available From: {parseDateTime(values.rental.fromDate)}</p>
                    <p className="ptxt">Available To: {parseDateTime(values.rental.toDate)}</p>
                </div>
                <p>{error}</p>
                <form onSubmit={handleSubmit}>
                    {inputlist.map((input) => (
                        <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />
                    ))}
                    <button type="submit" className="btn btn-primary submitUpdate" value="Post">Submit</button>
                </form>
            </div>
    );
}


