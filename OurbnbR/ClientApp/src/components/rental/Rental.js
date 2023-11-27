import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import "./rental.css";
import { Card } from './Card';

export function Rental() {
    const [rentals, setRentals] = useState("");
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')


     async function getRentals() {
        const response = await fetch('api/rentals/');
        const data = await response.json();
        setRentals(data);
        setLoading(false);
    }

    useEffect(() => {
        getRentals()
    }, []);





     function Rental() {
        const rentals = useLoaderData();


        return (
            <div>
                <h1>List of Rentals</h1>

                <form>

                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder='Search for rentals'
                        type="text"
                    />

                </form>

                <div className="row col row-cols-xl-3 row-cols-lg-3  row-cols-md-2  row-cols-sm-1 ">

                    {rentals.filter((rental) => {
                        return search.toLowerCase() === '' ? rental : rental.name.toLowerCase().includes(search.toLowerCase())
                    }).map(rental => {
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

}

export async function getRentals() {
    const response = await fetch('api/rentals/');
    return await response.json();

}