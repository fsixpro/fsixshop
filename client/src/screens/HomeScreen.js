import React, { useEffect } from 'react'

import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
//import Message from '../components/Message'
import { getProducts } from '../stateManagement/actions/productAction'
import Paginate from '../components/Paginate'
const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const pageNumber = Number(match.params.pageNumber || 1)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  const productList = useSelector(state => state.productList)
  const { loading, products, pages, currentPageNumber } = productList
  console.log(pages, pageNumber)

  return (
    <>
      <h1>Popular Product</h1>
      {loading ? (
        <Loader />
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
