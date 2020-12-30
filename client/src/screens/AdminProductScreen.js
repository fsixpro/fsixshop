import React, { useEffect } from 'react'
import AdminDashboardPanel from '../components/AdminDashboardPanel'
import { useDispatch, useSelector } from 'react-redux'

import {
  createProduct,
  getProductsAdmin,
  productDelete,
} from '../stateManagement/actions/productAction'
import { PRODUCT_CREATE_RESET } from '../stateManagement/types/productTypes'

const AdminProductScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const { products } = useSelector(state => state.productListAdmin)
  const { success } = useSelector(state => state.deleteProduct)

  const {
    loading: loadingCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector(state => state.productCreate)

  useEffect(() => {
    dispatch(getProductsAdmin())
  }, [dispatch, success])

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/')
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }
  }, [dispatch, userInfo, history, successCreate, createdProduct])

  const deleteProduct = id => {
    if (
      window.confirm(
        'this Action will permanently delete the Product, click OK to continue'
      )
    ) {
      dispatch(productDelete(id))
    }
  }

  const handleEdit = id => {
    history.push(`/admin/product/${id}/edit`)
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <section className='section-content padding-y'>
        <div className='container'>
          <div className='row'>
            <AdminDashboardPanel />
            <main className='col-md-9'>
              <button
                disabled={loadingCreate}
                className='btn btn-success mb-3'
                onClick={createProductHandler}
              >
                Create Product
              </button>
              <article className='card  mb-3'>
                <table className='table table-bordered table-hover table-responsive-sm'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>
                          {' '}
                          <span>&#8358;</span>
                          {product.price}
                        </td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(product._id)}
                            className='btn btn-primary'
                          >
                            <i className='fas fa-edit'></i>
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className='btn btn-danger'
                          >
                            <i className='fas fa-trash'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminProductScreen
