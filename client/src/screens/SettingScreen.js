import React, { useEffect, useState } from 'react'
import DashboardPanel from '../components/DashboardPanel'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserProfile,
  updateUser,
} from '../stateManagement/actions/userAction'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const SettingScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userInfo } = useSelector(state => state.userLogin)
  const { user } = useSelector(state => state.userProfile)
  const { loading, user: updatedUser, error, success } = useSelector(
    state => state.updateUser
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (success) {
      setPassword('')
      dispatch(getUserProfile())
    }
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserProfile())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, user, userInfo, history, updatedUser, success, loading, error])
  const submitHandler = e => {
    e.preventDefault()

    dispatch(updateUser(name, email, password))
  }
  return (
    <section className='section-content padding-y'>
      <div className='container'>
        <div className='row'>
          <DashboardPanel />
          <main className='col-md-9'>
            <div className='card'>
              {error && <Message close>{error}</Message>}
              {success && <Message close>{'updated successfully'}</Message>}
              {loading ? (
                <Loader />
              ) : (
                <div className='card-body'>
                  <form className='row' onSubmit={submitHandler}>
                    <div className='col-md-9'>
                      <div className='form-row'>
                        <div className='col form-group'>
                          <label>Name</label>
                          <input
                            type='text'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </div>
                        <div className='col form-group'>
                          <label>Email</label>
                          <input
                            type='email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className='form-row'>
                        <div className='form-group col-md-6'>
                          <label>Password</label>
                          <input
                            type='password'
                            className='form-control'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        disabled={loading}
                        className='btn btn-primary'
                        type='submit'
                      >
                        Save
                      </button>
                      <Link className='btn btn-light' to='/'>
                        Change password
                      </Link>

                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                  </form>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}

export default SettingScreen
