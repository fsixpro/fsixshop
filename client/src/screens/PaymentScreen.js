import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { PaystackButton } from 'react-paystack'
import OrderItem from '../components/OrderItem'
import { orderDetail, orderPay } from '../stateManagement/actions/orderAction'
import Message from '../components/Message'
import formatDate from '../util/formateDate'
import { ORDER_PAY_RESET } from '../stateManagement/types/orderTypes'

const PaymentScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const { order, error } = useSelector(state => state.orderDetail)
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    shippingPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    paymentMethod,
    deliveryMethod,
    user,
  } = order
  const { loading, success: successPay } = useSelector(state => state.orderPay)

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET })
    dispatch(orderDetail(orderId))
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(orderDetail(orderId))
    }
  }, [orderId, dispatch, successPay])
  //   useEffect(() => {
  //     if (success) {
  //       history.push(`/order/${order._id}`)
  //     }
  //     // eslint-disable-next-line
  //   }, [history, success])
  const onSuccessPayHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(orderPay(orderId, paymentResult))
  }

  return (
    <div className='row'>
      {error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {' '}
          <main className='col-md-8'>
            <article className='card mb-4'>
              <div className='card-body'>
                <h4 className='card-title mb-4'>Shipping Info</h4>
                <dl className='dlist-align'>
                  <dt className='text-muted'>Name:</dt>
                  <dd>{user && user.name}</dd>
                </dl>
                <dl className='dlist-align'>
                  <dt className='text-muted'>Email:</dt>
                  <dd>
                    <a href={`mailto:${user && user.email}`}>
                      {user && user.email}
                    </a>
                  </dd>
                </dl>
                <dl className='dlist-align'>
                  <dt className='text-muted'>Address:</dt>
                  <dd>{`${shippingAddress && shippingAddress.address}, ${
                    shippingAddress && shippingAddress.state
                  }, ${shippingAddress && shippingAddress.country}`}</dd>
                </dl>
                {isDelivered ? (
                  <Message>
                    Delivered on : {deliveredAt && formatDate(deliveredAt)}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </div>
            </article>
            <article className='card mb-4'>
              <div className='card-body'>
                <h4 className='card-title mb-4'>Payment</h4>

                <dl className='dlist-align'>
                  <dt className='text-muted'>Payment method:</dt>
                  <dd>{paymentMethod && paymentMethod}</dd>
                </dl>

                {isPaid ? (
                  <Message>Paid on : {paidAt && formatDate(paidAt)}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </div>
            </article>
            <article className='card mb-4'>
              <div className='card-body'>
                <h4 className='card-title mb-4'>Review cart</h4>
                <div className='row'>
                  {orderItems &&
                    orderItems.map(orderItem => (
                      <OrderItem order={orderItem} />
                    ))}
                </div>
              </div>
            </article>
          </main>
          <aside className='col-md-4'>
            <div className='card shadow'>
              <div className='card-body'>
                <h4 className='mb-3'>Overview</h4>

                <dl className='dlist-align'>
                  <dt className='text-muted'>Delivery type:</dt>
                  <dd>{deliveryMethod && deliveryMethod}</dd>
                </dl>

                <hr />
                <dl className='dlist-align'>
                  <dt>Total Item:</dt>
                  <dd className='h5'>
                    <span>&#8358;</span>
                    {totalPrice && totalPrice - shippingPrice}
                  </dd>
                </dl>
                <dl className='dlist-align'>
                  <dt>Shipping Fee:</dt>

                  <dd className='h5'>
                    <span>&#8358;</span>
                    {shippingPrice && shippingPrice}
                  </dd>
                </dl>
                <dl className='dlist-align'>
                  <dt>Total Price:</dt>
                  <dd className='h5'>
                    <span>&#8358;</span>
                    {totalPrice && totalPrice}
                  </dd>
                </dl>

                {!isPaid && (
                  <>
                    <hr />
                    <PaystackButton
                      text='Make Payment'
                      publicKey='pk_test_ba9a6948dce5d65cd0f680c28db5ca4b3c6d2689'
                      amount={totalPrice * 100}
                      email={user && user.email}
                      onSuccess={onSuccessPayHandler}
                      className='btn btn-primary'
                      channels={['card']}
                    />
                  </>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}

export default PaymentScreen
