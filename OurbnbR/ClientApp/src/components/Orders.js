import React, { Component } from 'react';
import './orders.css';
export class Orders extends Component {
  static displayName = Orders.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
      return (
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
                          {Orders.map(item => (
                              <tr key={item.OrderId}>
                                  <td>{item.OrderId}</td>
                                  <td>{item.From}</td>
                                  <td>{item.To}</td>
                                  <td>{item.Rating}</td>
                                  <td>{`${item.Customer.FirstName} ${item.Customer.LastName}`}</td>
                                  <td>{item.Rental.Name}</td>
                                  <td>{item.TotalPrice}</td>
                                  <td>
                                      {/*{
                                          item.Customer.IdentityId === user.id && (
                                              <div>
                                                  <button className="btn btn-info" onClick={() => onOrderUpdate(item.OrderId)}>Update</button>
                                                  <button className="btn btn-danger" onClick={() => onOrderDelete(item.OrderId)}>Delete</button>
                                              </div>
                                          )
                                      }*/}
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
  }
