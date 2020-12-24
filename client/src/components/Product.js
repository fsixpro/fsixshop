import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <div className='row'>
      <main className='col-md-9'>
        <article className='card card-product-list'>
          <div className='row no-gutters'>
            <aside className='col-md-3'>
              <aside className='img-wrap'>
                <img
                  width={200}
                  height={200}
                  src={product.image}
                  alt={product.name}
                />
              </aside>
            </aside>
            <div className='col-md-6'>
              <div className='info-main'>
                <Link to={`/product/${product._id}`} className='h5 title'>
                  {product.name}
                </Link>
                <div className='rating-wrap mb-3'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />

                  <div className='label-rating'>7/10</div>
                </div>

                <p>{product.description}</p>
              </div>
            </div>
            <aside className='col-sm-3'>
              <div className='info-aside'>
                <div className='price-wrap'>
                  <span className='price h5'>
                    <span>&#8358;</span>
                    {product.price}
                  </span>
                </div>
                <p className='text-success'>Free shipping</p>
                <br />
                <p>
                  <Link
                    to={`/product/${product._id}`}
                    className='btn btn-primary btn-block'
                  >
                    {' '}
                    Details{' '}
                  </Link>
                </p>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </div>
  )
}

export default Product
