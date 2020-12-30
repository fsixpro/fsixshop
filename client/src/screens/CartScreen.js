import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'

import {
  addToCart,
  removeItemFromCart,
} from '../stateManagement/actions/cartAction'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeItemHandler = id => {
    dispatch(removeItemFromCart(id))
    console.log(id)
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <>
      <h1>Shopping list</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Go back</Link>
        </Message>
      ) : (
        <>
          <Link to='/' className='btn btn-primary mb-2'>
            Go back
          </Link>
          <div className='row'>
            <aside className='col-lg-9'>
              <div className='card table-responsive'>
                <table className='table table-borderless table-shopping-cart'>
                  <thead className='text-muted'>
                    <tr className='small text-uppercase'>
                      <th scope='col'>Product</th>
                      <th scope='col' width='120'>
                        Quantity
                      </th>
                      <th scope='col' width='120'>
                        Price
                      </th>
                      <th scope='col' className='text-right' width='200'>
                        {' '}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(cartItem => (
                      <tr key={cartItem.productId}>
                        <td>
                          <figure className='itemside align-items-center'>
                            <div className='aside mr-3'>
                              <img
                                src={cartItem.image}
                                alt={cartItem.name}
                                className='img-sm'
                              />
                            </div>
                            <figcaption className='info'>
                              <Link
                                to={`/product/${cartItem.productId}`}
                                className='title text-dark'
                              >
                                {cartItem.name}
                              </Link>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          <Form.Control
                            value={cartItem.qty}
                            as='select'
                            onChange={e =>
                              dispatch(
                                addToCart(
                                  cartItem.productId,
                                  parseInt(e.target.value)
                                )
                              )
                            }
                          >
                            {[...Array(cartItem.countInStock).keys()].map(
                              count => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </td>
                        <td>
                          <div className='price-wrap'>
                            <var className='price'>
                              <span>&#8358;</span>
                              {cartItem.price * cartItem.qty}
                            </var>
                            <small className='text-muted'>
                              <span>&#8358;</span>
                              {`${cartItem.price} each`}{' '}
                            </small>
                          </div>
                        </td>
                        <td className='text-right'>
                          <Button
                            onClick={() =>
                              removeItemHandler(cartItem.productId)
                            }
                            className='btn btn-danger'
                          >
                            <i className='fa fa-trash-alt'></i> Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className='card-body border-top'>
                  <p className='icontext'>
                    <i className='icon text-success fa fa-truck'></i> Free
                    Delivery within 1-2 weeks
                  </p>
                </div>
              </div>
            </aside>
            <aside className='col-lg-3'>
              <div className='card'>
                <div className='card-body'>
                  <dl className='dlist-align'>
                    <dt>Total item:</dt>
                    <dd>{cartItems.reduce((acc, cur) => acc + cur.qty, 0)}</dd>
                  </dl>
                  <dl className='dlist-align'>
                    <dt>Total price:</dt>
                    <dd>
                      <strong>
                        <span>&#8358;</span>
                        {cartItems.reduce(
                          (acc, cur) => acc + cur.qty * cur.price,
                          0
                        )}
                      </strong>
                    </dd>
                  </dl>

                  <hr />

                  <Button
                    onClick={checkoutHandler}
                    className='btn btn-primary btn-block'
                  >
                    {' '}
                    Checkout{' '}
                  </Button>
                  <Link to='/' className='btn btn-light btn-block'>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  )
}

export default CartScreen
