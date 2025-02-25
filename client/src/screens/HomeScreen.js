import React, { useEffect } from 'react'

import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProducts } from '../stateManagement/actions/productAction'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const pageNumber = Number(match.params.pageNumber || 1)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  const productList = useSelector(state => state.productList)
  const { loading, products, pages, currentPageNumber } = productList

  return (
    <>
      {!keyword && <ProductCarousel />}

      <h1>Popular Product</h1>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <Message>No product found</Message>
      ) : (
        <>
          {products.map(product => (
            <Row key={product._id} className='my-3 mx-auto'>
              <Col>
                <Product product={product} />
              </Col>
            </Row>
          ))}
          <Paginate pages={pages} pageNumber={currentPageNumber} />
        </>
      )}
    </>
  )
}

export default HomeScreen
