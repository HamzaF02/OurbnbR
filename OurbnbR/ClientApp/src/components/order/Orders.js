import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './orders.css';
import { parseDateTime, parseNumber, parsePrice } from '../../formating';
import { Service } from "../Service"


export function Orders() {
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(true)
    const api = new Service ("order")
    

    useEffect(() => {
        getOrders()
    }, []);


    async function getOrders() {
        const data = await api.getAll()
        setOrders(data);
        setLoading(false);
    }

   
    
    
    
  
    return (
        loading ? <p>loading...</p> :
            <div>

                <div className="box">
                <table className="table table-striped table-dark" style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th scope="col">Order #</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Rental</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{parseDateTime( order.from)}</td>
                                <td>{parseDateTime(order.to)}</td>
                                <td>{parseNumber(order.rating,1)}</td>
                                <td>{order.customer.firstName} {order.customer.lastName}</td>
                                <td>{order.rental.name}</td>
                                <td>{parsePrice(order.totalPrice)}</td>
                                <td>
                                    <Link className="btn btn-outline-primary info knapp" to={"/orders/update/" + order.orderId}>Update</Link>
                                    <Link className="btn btn-outline-danger info knapp" to={"/orders/delete/" + order.orderId}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                        


                    </tbody>
                </table>
            </div>
            
        </div>
    );
  
}

