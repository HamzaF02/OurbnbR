import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import "./rental.css";
import { Card } from './Card';
import { Service } from '../Service';

//Function with custom hook to load rental Data and search useState to load searching rentals
export function Rental() {
    const rentals = useLoaderData();
    const [search, setSearch] = useState('')


    return (
        <div>
            <h1>List of Rentals</h1>

            <form>

                <input className="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='Search for rentals'
                    type="text"
                />

            </form>

            <div className="row col row-cols-xl-3 row-cols-lg-3  row-cols-md-2  row-cols-sm-1 fit ">

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

// Asynchronous function to fetch a list of rentals from the server
export async function getRentals() {
    const api = new Service("rentals")
    return await api.getAll()
}