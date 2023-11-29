import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { parseDateTime, parseNumber, parsePrice } from '../../formating';

import "./rental.css";
import { Service } from '../Service';

export function Details() {
    //Stating variables to manage the rental data and loading state. 
    //Params is used to extract parameters from the URL
    const [rental,setRental] = useState();
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const api = new Service("rentals")
    //Useffect hook is used to do something after being rendered,
    //In this case, to get rentals. 
    

    useEffect(() => {
        getRental()
    }, []);

    //Asynchrous function to get the rental details
    async function getRental() {
        const data = await api.getObjByid(params.id)
        setRental(data);
        setLoading(false);
    }

    


    return (
        loading ? <p>loading...</p> :
        <div>
             <h1 className="my-3">
                {rental.name}
            </h1>
            <div>
                <div className="row row-cols-1 row-cols-lg-2  row-cols-md-1 row-cols-sm-1">
                        <div>
                            <img alt={rental.name} src={rental.image} className="img-fluid" style={{borderRadius: '20px' }} />
                    </div>
                    <div>

                            <h3 className="pull-right">Location: {rental.location}</h3>
                            <h5 className="pull-right">Owner: {rental.owner.firstName} {rental.owner.lastName}</h5>
                            <h5>{rental.description}</h5>
                            <h5>Available from {parseDateTime(rental.fromDate)} to {parseDateTime(rental.toDate)}</h5>
                            <h5 className="pull-right">Price per/n: {parsePrice(rental.price)}</h5>
                            <h5 className="pull-right">Rating: {parseNumber(rental.rating,1)}</h5>
                        <div >

                        <Link className="btn btn-outline-success info knapper" to={"/orders/create/" + rental.rentalId}>Rent out</Link>
                        <Link className="btn btn-outline-primary info knapper" to={"/rental/update/" + rental.rentalId}>Update</Link>
                        <Link className="btn btn-outline-danger info knapper" to={"/rental/delete/" + rental.rentalId}>Delete</Link>
                        
                        <Link className="btn btn-outline-info info knapper" to="/rental">Back to Grid View</Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}