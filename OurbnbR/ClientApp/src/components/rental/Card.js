
import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ rental }) {
    return (
        <Link className="link-dark" to={"/rental/details/" + rental.rentalId}>
            <div className="d-flex justify-content-between mt-1">
                <div className="col card ">
                    <div>
                        <img src={rental.image} className="card-img-top" alt={rental.name} />
                        <div>
                            <div className="d-flex justify-content-between mt-1">
                                <h5 className="text-start" >
                                    {rental.name}
                                </h5>
                            </div>
                            <div className="d-flex justify-content-between mt-1 flex-lg-column flex-md-column flex-xl-row">
                                <div className="text-nowrap  p-2">
                                    <p >Rating</p>
                                    {rental.rating}
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="text-nowrap  p-2">
                                    <p>Location</p>
                                    {rental.location}
                                </div>
                                <div className="text-nowrap  p-2">
                                    <p>Price per/n:</p>
                                    {Number.parseFloat(rental.price).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    );
}