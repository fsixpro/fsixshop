import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
// import Loader from '../components/Loader'
// import Message from '../components/Message'

import { getProductById } from '../stateManagement/actions/productAction'
import { addToCart } from '../stateManagement/actions/cartAction'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductById(match.params.id))
  }, [dispatch, match.params.id])
  const productDetails = useSelector(state => state.productDetails)
  const { product } = productDetails

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
    dispatch(addToCart(match.params.id, 2))
  }
  return (
    <div className='card'>
      <div className='row no-gutters'>
        <aside className='col-md-6'>
          <article className='gallery-wrap'>
            <div className='img-big-wrap'>
              <img src={product.image} alt={product.name} />
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

            {/* <a href='#' className='btn  btn-primary'>
              {' '}
              Buy now{' '}
            </a> */}
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
  )
}

export default ProductScreen
