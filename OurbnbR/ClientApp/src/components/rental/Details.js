import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export function Details() {
    const [rental,setRental] = useState();
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        getRental()
    }, []);


    async function getRental() {
        const response = await fetch('api/rentals/' + params.id);
        const data = await response.json();
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
                            <img alt={rental.name} src={rental.image} className="img-fluid" />
                    </div>
                    <div>

                            <h3 className="pull-right">Location: {rental.location}</h3>
                            <h5 className="pull-right">Owner: {rental.owner.firstName} {rental.owner.lastName}</h5>
                            <h5>{rental.description}</h5>
                            <h5>Available from {rental.fromDate} to {rental.to}</h5>   
                            <h5 className="pull-right">Price per/n: {Number.parseFloat(rental.price).toFixed(2)}</h5>
                            <h5 className="pull-right">Rating: {rental.rating}</h5>
                        <div >

                        <Link className="btn btn-outline-primary info" to={"/rental/update/" + rental.rentalId}>Update</Link>
                        <Link className="btn btn-outline-danger info" to={"/rental/delete/" + rental.rentalId}>Delete</Link>
                        <Link className="btn btn-outline-success info" to={"/orders/create/" + rental.rentalId}>Rent out</Link>




                            <Link className="btn btn-outline-info info" to="/rental">Back to Grid View</Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}