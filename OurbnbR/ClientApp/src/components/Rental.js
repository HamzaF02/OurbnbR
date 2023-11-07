import React, { Component } from 'react';
import "./rental.css";


export class Rental extends Component {
    static displayName = Rental.name;

    render() {
        return (

          <>

                <h1>List of Rentals</h1>

                <a className="btn btn-light text-dark" asp-action="Table">Table View</a>


                    <div className="row col  row-cols-xl-3 row-cols-lg-3  row-cols-md-2  row-cols-sm-1 ">
                       
                       
                          

                       
                        <a asp-controller="Rental" asp-action="Create" className="link-dark">

                            <div className="d-flex new justify-content-between mt-1" >
                                <div className="col addcard" >
                                    <h1 className="add">+</h1>
                                    <p className="add">Post new Rental!</p>
                                </div>
                            </div>
                        </a>
                    </div>
    
                </>
       );
    }
}

