import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
// import Loader from '../components/Loader'
import Message from '../components/Message'

import {
  createProductReview,
  getProductById,
} from '../stateManagement/actions/productAction'
import { addToCart } from '../stateManagement/actions/cartAction'
import Review from '../components/Review'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading: loadingProductReview, success, error } = useSelector(
    state => state.createProductReview
  )
  const { product } = productDetails

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
    dispatch(addToCart(match.params.id, 2))
  }
  useEffect(() => {
    if (success) {
      setComment('')
      setRating(0)
    }
    dispatch(getProductById(match.params.id))
  }, [dispatch, match.params.id, success])
  const submitHandler = e => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      <div className='card'>
        <div className='row no-gutters'>
          <aside className='col-md-6'>
            <article className='gallery-wrap'>
              <div className='img-big-wrap'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='mx-auto d-block img-fluid'
                />
              </div>
              <div className='thumbs-wrap'>
                <div className='item-thumb'>
                  {' '}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='item-thumb'>
                  {' '}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='item-thumb'>
                  {' '}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='item-thumb'>
                  {' '}
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
            </article>
          </aside>
          <main className='col-md-6 border-left'>
            <article className='content-body'>
              <h2 className='title'>{product.name}</h2>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />

              <div className='mb-3'>
                <var className='price h4'>
                  <span>&#8358;</span>
                  {product.price}
                </var>
              </div>

              <p>{product.description}</p>

              <hr />

              <div>{'  '}</div>
              <dl className='row'>
                <dt className='col-sm-3'>Availability:</dt>
                <dd className='col-sm-9'>
                  {product.countInStock === 0 ? 'Out of Stock' : 'In stock'}
                </dd>
                {product.countInStock === 0 ? (
                  ''
                ) : (
                  <>
                    <dt className='col-sm-3'>
                      <Form.Label>Quantity:</Form.Label>
                    </dt>
                    <dd className='col-sm-9'>
                      {' '}
                      <Form
                        as='select'
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(count => (
                          <option key={count + 1} value={count + 1}>
                            {count + 1}
                          </option>
                        ))}
                      </Form>
                    </dd>
                  </>
                )}
              </dl>

              <br />
              <Button
                onClick={addToCartHandler}
                className='mt-4 center ml-4'
                disabled={product.countInStock === 0 ? true : false}
              >
                <i className='fas fa-shopping-cart'></i>
                {'  '}Add to Cart
              </Button>
            </article>
          </main>
        </div>
      </div>
      <div className='mt-3'>
        <div className='row'>
          <div className='col-6'>
            <h2>Write a review</h2>
            {error && <Message close>{error}</Message>}
            {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='rating'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as='select'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={loadingProductReview}
                  type='submit'
                  variant='primary'
                >
                  Submit
                </Button>
              </Form>
            ) : (
              <Message>
                Please{' '}
                <Link to={`/login?redirect=/product/${product._id}`}>
                  sign in
                </Link>{' '}
                to write a review{' '}
              </Message>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <h2 className='mt-3'>Reviews</h2>
            {product.reviews.length === 0 ? (
              <Message>Product have no reviews</Message>
            ) : (
              product.reviews.map(review => (
                <Review key={review._id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductScreen
