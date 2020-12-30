import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashboardPanel from '../components/DashboardPanel'
import Message from '../components/Message'
import { getMyOrders } from '../stateManagement/actions/orderAction'
import formatDate from '../util/formateDate'
const OrderScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])
  const { myOrders } = useSelector(state => state.myOrderList)

  return (
    <section className='section-content padding-y'>
      <div className='container'>
        <div className='row'>
          <DashboardPanel />
          <main className='col-md-9'>
            {myOrders.length > 0 ? (
              myOrders.map((myOrder, index) => (
                <article key={index} className='card order-item mb-4'>
                  <header className='card-header'>
                    <strong className='d-inline-block mr-3'>
                      Order ID: {myOrder._id}
                    </strong>
                    <span>Order Date: {formatDate(myOrder.createdAt)}</span>
                  </header>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-8'>
                        <h6 className='text-muted'>Delivery to</h6>
                        {myOrder.isDelivered ? (
                          <p>
                            {myOrder.user.name}
                            <br />
                            Email: {myOrder.user.email} <br />
                            Location:
                            {` ${myOrder.shippingAddress.address}, ${myOrder.shippingAddress.state}, ${myOrder.shippingAddress.country}`}{' '}
                          </p>
                        ) : (
                          <Message variant='danger'>Not yet Delivered</Message>
                        )}
                      </div>
                      <div className='col-md-4'>
                        <h6 className='text-muted'>Payment</h6>
                        {myOrder.isPaid ? (
                          <>
                            {' '}
                            <span className='text-success'>
                              <i className='fab fa-lg fa-cc-visa'></i>
                              Visa **** 4216
                            </span>
                            <p>
                              Subtotal: <span>&#8358;</span>
                              {myOrder.totalPrice} <br />
                              Shipping: <span>&#8358;</span>
                              {myOrder.shippingPrice} <br />
                              <span className='b'>
                                Total Price:
                                <span>&#8358;</span>
                                {myOrder.totalPrice +
                                  myOrder.shippingPrice}{' '}
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            <Message variant='danger'>Not Paid</Message>
                            <Link
                              className='btn btn-primary'
                              to={`/order/${myOrder._id}`}
                            >
                              Make Payment
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='table-responsive'>
                    <table className='table table-hover'>
                      <tbody>
                        {myOrder.orderItems.map((orderItem, index) => (
                          <tr key={index}>
                            <td width='65'>
                              <img
                                src={orderItem.image}
                                className='img-xs border'
                                alt='ai'
                              />
                            </td>
                            <td>
                              <p className='title mb-0'>{orderItem.name}</p>
                            </td>

                            <td width='250'>
                              {orderItem.qty} X <span>&#8358;</span>
                              {orderItem.price}
                            </td>

                            <td width='250'>
                              <span>&#8358;</span>
                              {orderItem.qty * orderItem.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))
            ) : (
              <Message>you have no orders yet</Message>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}

export default OrderScreen
