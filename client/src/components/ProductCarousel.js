import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTopProduct } from '../stateManagement/actions/productAction'
import Loader from './Loader'
const ProductCarousel = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopProduct())
  }, [dispatch])
  const { products, loading } = useSelector(state => state.productTop)
  return loading ? (
    <Loader />
  ) : (
    <Carousel
      nextIcon={
        <span aria-hidden='true' className='fas fa-arrow-circle-right' />
      }
      prevIcon={
        <span aria-hidden='true' className='fas fa-arrow-circle-left' />
      }
    >
      {products.map(product => (
        <Carousel.Item className='bg-primary' key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img
              className='d-block w-100'
              src={product.image}
              alt='First slide'
              height='300px'
            />
            <Carousel.Caption>
              <h2>
                {product.name} (<span>&#8358;</span>
                {product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
