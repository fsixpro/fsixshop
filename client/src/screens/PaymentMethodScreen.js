import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../stateManagement/actions/cartAction'

const PaymentMethodScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const { shippingAddress } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  if (!shippingAddress.address) {
    history.push('/shipping')
  }
  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <div className='card mx-auto my-auto'>
      <Container>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Select Method</Form.Label>
            <Form.Check
              type='radio'
              label='Credit Card'
              name='paymentMethod'
              value='Credit Card'
              id='creditcard'
              checked={paymentMethod === 'Credit Card' ? true : false}
              className='mt-2 ml-2'
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Bank Transfer'
              name='paymentMethod'
              value='bank'
              id='bank'
              className='mt-2 ml-2'
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Card.Text
              className={`${
                paymentMethod === 'bank' ? 'visible' : 'invisible'
              } bg-warning mx-auto`}
            >
              Currently not available
            </Card.Text>
            <Button
              type='submit'
              className='mt-4 ml-2'
              disabled={paymentMethod === 'bank' ? true : false}
            >
              Continue
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default PaymentMethodScreen
