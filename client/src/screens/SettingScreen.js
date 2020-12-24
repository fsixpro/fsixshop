import React, { useEffect, useState } from 'react'
import DashboardPanel from '../components/DashboardPanel'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../stateManagement/actions/userAction'

const SettingScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { userInfo } = useSelector(state => state.userLogin)
  const { user } = useSelector(state => state.userProfile)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserProfile())
      } else {
        console.log(!user)
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, user, userInfo, history])

  return (
    <section className='section-content padding-y'>
      <div className='container'>
        <div className='row'>
          <DashboardPanel />
          <main className='col-md-9'>
            <div className='card'>
              <div className='card-body'>
                <form className='row'>
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
                        <label>Country</label>
                        <select id='inputState' className='form-control'>
                          <option> Choose...</option>
                          <option>Uzbekistan</option>
                          <option>Russia</option>
                          <option selected=''>United States</option>
                          <option>India</option>
                          <option>Afganistan</option>
                        </select>
                      </div>
                      <div className='form-group col-md-6'>
                        <label>City</label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>

                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        <label>Zip</label>
                        <input
                          type='text'
                          className='form-control'
                          value='123009'
                        />
                      </div>
                      <div className='form-group col-md-6'>
                        <label>Phone</label>
                        <input
                          type='text'
                          className='form-control'
                          value='+123456789'
                        />
                      </div>
                    </div>

                    <button className='btn btn-primary'>Save</button>
                    <button className='btn btn-light'>Change password</button>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}

export default SettingScreen
