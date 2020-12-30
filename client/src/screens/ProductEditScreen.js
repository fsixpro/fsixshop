import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import {
  getProductById,
  updateProduct,
  uploadImage,
} from '../stateManagement/actions/productAction'
import { UPDATE_PRODUCT_RESET } from '../stateManagement/types/productTypes'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const [previewSource, setPreviewSource] = useState('')

  const { product, loading } = useSelector(state => state.productDetails)
  const { success } = useSelector(state => state.updateProduct)
  const {
    success: successImage,
    image: uploadedImage,
    loading: loadingImage,
  } = useSelector(state => state.productImageUpload)

  useEffect(() => {
    if (successImage) {
      setImage(uploadedImage.public_id)
    }
  }, [successImage, uploadedImage])

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_PRODUCT_RESET })
      history.push('/admin/products')
    }
    if (!product.name || product._id !== productId) {
      dispatch(getProductById(productId))
    }

    setName(product.name)
    setPrice(product.price)
    setImage(product.image)
    setBrand(product.brand)
    setCountInStock(product.countInStock)
    setCategory(product.category)
    setDescription(product.description)
  }, [dispatch, productId, product, success, history])
  const updateHandler = async e => {
    e.preventDefault()

    dispatch(
      updateProduct(productId, {
        name,
        price,
        image,
        brand,
        countInStock,
        category,
        description,
      })
    )
  }
  const handleBack = () => {
    history.push('/admin/products')
  }
  const onChangeHandler = e => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = file => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setPreviewSource(fileReader.result)
    }
    dispatch(uploadImage(previewSource))
  }
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Card className='mx-auto'>
        <Card.Body>
          <Button onClick={handleBack}>Go Back</Button>
          <Card.Title as='h4' className='text-center'>
            Edit Product
          </Card.Title>
          <Form onSubmit={updateHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>

              <Form.File
                id='image-file'
                label='choose image'
                custom
                onChange={onChangeHandler}
                value={''}
              />
              {previewSource && (
                <img src={previewSource} alt='' width='120px' height='120px' />
              )}
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>{' '}
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>{' '}
            <Button type='submit' disabled={loadingImage}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProductEditScreen
