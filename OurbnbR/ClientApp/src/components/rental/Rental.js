import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./rental.css";
import { Card } from './Card';


export function Rental (){
    const [rentals, setRentals] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRentals()
    }, []);


    async function getRentals() {
        const response = await fetch('api/rentals/');
        const data = await response.json();
        setRentals(data);
        setLoading(false);
    }


    return (
        loading ? <p>loading...</p> :
            <div>
                <h1>List of Rentals</h1>

                <button className="btn btn-light text-dark">Table View</button>

                    <div className="row col  row-cols-xl-3 row-cols-lg-3  row-cols-md-2  row-cols-sm-1 ">

                    {rentals.map(rental => {
                        return <Card key={rental.rentalId} rental={rental} />
                        
                    })}
                         
                    <Link tag={Link} className="link-dark" to="/rental/create">

                            <div className="d-flex new justify-content-between mt-1" >
                                <div className="col addcard" >
                                    <h1 className="add">+</h1>
                                    <p className="add">Post new Rental!</p>
                                </div>
                            </div>
                        </Link>
                    </div>
          </div>
       );
}

