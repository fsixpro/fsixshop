import React, { useEffect } from 'react'
import DashboardPanel from '../components/DashboardPanel'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../stateManagement/actions/userAction'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../stateManagement/actions/orderAction'
import formatDate from '../util/formateDate'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])
  const { myOrders, loading } = useSelector(state => state.myOrderList)
  const { userInfo } = useSelector(state => state.userLogin)

  const { user } = useSelector(state => state.userProfile)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserProfile())
      }
    }
  }, [dispatch, user, userInfo, history])

  return (
    <section className='section-content padding-y'>
      <div className='container'>
        <div className='row'>
          <DashboardPanel />
          <main className='col-md-9'>
            <article className='card mb-3'>
              <div className='card-body'>
                <figure className='icontext'>
                  <div className='text'>
                    <strong> {user && user.name}</strong> <br />
                    <p className='mb-2'> {user && user.email} </p>
                    <Link to='/edit/profile' className='btn btn-light btn-sm'>
                      Edit
                    </Link>
                  </div>
                </figure>
                <hr />
                <p>
                  <i className='fa fa-map-marker text-muted'></i> &nbsp; My
                  address:
                  <br />
                  {myOrders.length > 0 &&
                    ` ${myOrders[0].shippingAddress.address}, ${myOrders[0].shippingAddress.state}, ${myOrders[0].shippingAddress.country}`}{' '}
                  &nbsp;
                  <Link to='#' className='btn-link'>
                    {' '}
                    Edit
                  </Link>
                </p>

                <article className='card-group card-stat'>
                  <figure className='card bg'>
                    <div className='p-3'>
                      <h4 className='title'>{myOrders.length}</h4>
                      <span>Orders</span>
                    </div>
                  </figure>

                  <figure className='card bg'>
                    <div className='p-3'>
                      <h4 className='title'>0</h4>
                      <span>Awaiting delivery</span>
                    </div>
                  </figure>
                  <figure className='card bg'>
                    <div className='p-3'>
                      <h4 className='title'>0</h4>
                      <span>Delivered items</span>
                    </div>
                  </figure>
                </article>
              </div>
            </article>

            <article className='card  mb-3'></article>
          </main>
        </div>
      </div>
    </section>
  )
}

export default ProfileScreen
