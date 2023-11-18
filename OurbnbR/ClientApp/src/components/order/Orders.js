import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './orders.css';
export function Orders() {
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOrders()
    }, []);


    async function getOrders() {
        const response = await fetch('api/order/');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
    }


  
    return (
        loading ? <p>loading...</p> :
        <div>
            <div style={{ overflowX: 'auto' }}>
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
                                <td>{order.from}</td>
                                <td>{order.to}</td>
                                <td>{order.rating}</td>
                                <td>{order.customer.firstName} {order.customer.lastName}</td>
                                <td>{order.rental.name}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary info" to={"/orders/update/" + order.orderId}>Update</Link>
                                        <Link className="btn btn-outline-danger info" to={"/orders/delete/" + order.orderId}>Delete</Link>
                                    </td>
                            </tr>
                        ))}
                        


                    </tbody>
                </table>
            </div>
            {/* <button className="btn btn-outline-info info" style={{ marginTop: '30px' }} onClick={() => onGoBackHome()}>Go back Home</button>*/}
        </div>
    );
  
}

