import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import OrderItem from '../components/OrderItem'
import { createOrder } from '../stateManagement/actions/orderAction'
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const {
    cartItems,
    paymentMethod,
    shippingAddress,
    deliveryMethod,
    shippingFee,
  } = useSelector(state => state.cart)
  //const { userInfo } = useSelector(state => state.userLogin)
  const totalItemPrice = cartItems.reduce(
    (acc, cur) => acc + cur.qty * cur.price,
    0
  )

  const totalPrice = totalItemPrice + shippingFee
  useEffect(() => {
    if (cartItems.length === 0) {
      history.push('cart')
    }
  }, [cartItems.length, history])
  // eslint-disable-next-line
  const { order, loading, error, success } = useSelector(
    state => state.orderCreate
  )
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        deliveryMethod,
        shippingPrice: shippingFee,
        totalPrice,
      })
    )
  }
  return (
    <div className='row'>
      <main className='col-md-8'>
        <article className='card mb-4'>
          <div className='card-body'>
            <h4 className='card-title mb-4'>Shipping Info</h4>
            <dl className='dlist-align'>
              <dt className='text-muted'>Address:</dt>
              <dd>{`${shippingAddress.address}, ${shippingAddress.state}, ${shippingAddress.country}`}</dd>
            </dl>
          </div>
        </article>
        <article className='card mb-4'>
          <div className='card-body'>
            <h4 className='card-title mb-4'>Review cart</h4>
            <div className='row'>
              {cartItems.map(cartItem => (
                <OrderItem key={cartItem.productId} order={cartItem} />
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
              <dd>{deliveryMethod}</dd>
            </dl>

            <dl className='dlist-align'>
              <dt className='text-muted'>Payment method:</dt>
              <dd>{paymentMethod}</dd>
            </dl>
            <hr />
            <dl className='dlist-align'>
              <dt>Total Item:</dt>
              <dd className='h5'>{totalItemPrice}</dd>
            </dl>
            <dl className='dlist-align'>
              <dt>Shipping Fee:</dt>
              <dd className='h5'>{shippingFee}</dd>
            </dl>
            <dl className='dlist-align'>
              <dt>Total Price:</dt>
              <dd className='h5'>{totalPrice}</dd>
            </dl>
            <hr />
            <p className='small mb-3 text-muted'>
              By clicking you are agree with terms of condition{' '}
            </p>
            <Button
              onClick={placeOrderHandler}
              className='btn btn-primary btn-block'
            >
              Place order
            </Button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default PlaceOrderScreen
