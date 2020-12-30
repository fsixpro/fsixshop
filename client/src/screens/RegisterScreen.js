import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../stateManagement/actions/userAction'
import Message from '../components/Message'

const RegisterScreen = ({ history, location }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const registerHandler = () => {
    dispatch(register(name, email, password))
  }
  const { loading, error, userInfo } = useSelector(state => state.userLogin)
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])
  return (
    <Card className='mx-auto centre'>
      {error && (
        <Message className='mt-3' variant='danger' close>
          {error}
        </Message>
      )}

      <Card.Body>
        <Card.Title as='h4'>Sign up</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button
              disabled={loading}
              className='btn btn-success btn-block'
              onClick={registerHandler}
            >
              {loading ? (
                <span class='spinner-border spinner-border-sm'></span>
              ) : (
                'Register'
              )}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <p className='text-center mt-4'>
        Already have an account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          Sign in
        </Link>
      </p>
    </Card>
  )
}

export default RegisterScreen
