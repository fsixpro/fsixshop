import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../stateManagement/actions/userAction'
import Message from '../components/Message'

const LoginScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { error, loading, userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [redirect, userInfo, history])
  const loginHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Card className='mx-auto centre'>
      {error && (
        <Message className='mt-3' variant='danger' close>
          {error}
        </Message>
      )}
      <Card.Body>
        <Card.Title as='h4'>Sign in</Card.Title>
        <Form>
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
              type='submit'
              onClick={loginHandler}
              className='btn btn-success btn-block'
            >
              {loading ? (
                <span class='spinner-border spinner-border-sm'></span>
              ) : (
                'Login'
              )}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <p className='text-center mt-4'>
        Don't have account?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Sign up
        </Link>
      </p>
    </Card>
  )
}

export default LoginScreen
