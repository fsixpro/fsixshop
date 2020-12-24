import React, { useEffect } from 'react'
import AdminDashboardPanel from '../components/AdminDashboardPanel'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserProfile,
  getusers,
  userDelete,
} from '../stateManagement/actions/userAction'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../stateManagement/actions/orderAction'
import formatDate from '../util/formateDate'

const UsersScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const { users } = useSelector(state => state.usersList)
  const { success } = useSelector(state => state.deleteUser)
  useEffect(() => {
    dispatch(getusers())
  }, [dispatch, success])

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/')
    }
  }, [userInfo, history])
  const deleteUser = id => {
    if (
      window.confirm(
        'this Action will permanently delete the user, click OK to continue'
      )
    ) {
      dispatch(userDelete(id))
    }
  }

  return (
    <section className='section-content padding-y'>
      <div className='container'>
        <div className='row'>
          <AdminDashboardPanel />
          <main className='col-md-9'>
            <article className='card  mb-3'>
              <table className='table table-bordered table-hover'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-check-square'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <button className='btn btn-primary'>
                          <i className='fas fa-edit'></i>
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
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
  )
}

export default UsersScreen
