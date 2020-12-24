import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  saveDeliverytMethod,
  saveShippingAddress,
  saveShippingFee,
} from '../stateManagement/actions/cartAction'

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { shippingAddress, deliveryMethod, shippingFee } = useSelector(
    state => state.cart
  )

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [state, setState] = useState(shippingAddress.state || '')
  const [zip, setZip] = useState(shippingAddress.zip || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const [shippingFees, setShippingFees] = useState(shippingFee || 0)
  const [deliverMethod, setDeliverMethod] = useState(
    deliveryMethod || 'standard'
  )

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        zip,
        country,
      })
    )
    dispatch(saveDeliverytMethod(deliverMethod))
    dispatch(saveShippingFee(shippingFees))
    history.push('/payment_method')
  }
  return (
    <article className='card mb-4'>
      <div className='card-body'>
        <h4 className='card-title mb-4'>Delivery info</h4>

        <Form.Group className='form-check-inline'>
          <Form.Check
            type='radio'
            label='Standard Delivery'
            name='deliveryMethod'
            value='standard'
            id='standard'
            checked={deliverMethod === 'standard' ? true : false}
            className='mt-2 ml-2'
            onChange={e => {
              setDeliverMethod(e.target.value)
              setShippingFees(0)
            }}
          ></Form.Check>

          <Form.Check
            type='radio'
            label='Express Delivery'
            name='deliveryMethod'
            value='express'
            id='express'
            checked={deliverMethod === 'express' ? true : false}
            className='mt-2 ml-2 '
            onChange={e => {
              setDeliverMethod(e.target.value)
              setShippingFees(500)
            }}
          ></Form.Check>
        </Form.Group>
        <form onSubmit={submitHandler}>
          <div className='row'>
            <div className='form-group col-sm-12'>
              <label>Address*</label>
              <input
                type='text'
                placeholder='Enter Address'
                className='form-control'
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-12'>
              <label>City*</label>
              <input
                type='text'
                placeholder='Enter City'
                className='form-control'
                required
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>

            <div className='form-group col-sm-8'>
              <label>State*</label>
              <input
                type='text'
                placeholder='Enter State'
                className='form-control'
                required
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>

            <div className='form-group col-sm-4'>
              <label>Zip code</label>
              <input
                type='text'
                placeholder=''
                className='form-control'
                required
                value={zip}
                onChange={e => setZip(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-12'>
              <label>Country</label>
              <input
                type='text'
                placeholder='Enter Country'
                className='form-control'
                required
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-12'>
              <button type='submit' className='btn btn-primary'>
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  )
}

export default ShippingScreen
