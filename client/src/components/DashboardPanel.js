import React from 'react'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const DashboardPanel = ({ active }) => {
  const location = useLocation()

  return (
    <aside className='col-md-3'>
      <nav className='list-group'>
        <Link
          className={`list-group-item ${
            location.pathname === '/profile' ? 'active' : ''
          }`}
          to='/profile'
        >
          {' '}
          Account overview{' '}
        </Link>
        {/* <a
          className={`list-group-item ${
            location.pathname === '/profile' ? 'active' : ''
          }`}
          href='page-profile-address.html'
        >
          {' '}
          My Address{' '}
        </a> */}
        <Link
          className={`list-group-item ${
            location.pathname === '/orders' ? 'active' : ''
          }`}
          to='/orders'
        >
          {' '}
          My Orders{' '}
        </Link>
        {/* <a className='list-group-item' href='page-profile-wishlist.html'>
          {' '}
          My wishlist{' '}
        </a> */}

        <Link
          className={`list-group-item ${
            location.pathname === '/edit/profile' ? 'active' : ''
          }`}
          to='/edit/profile'
        >
          {' '}
          Settings{' '}
        </Link>
      </nav>
    </aside>
  )
}

export default DashboardPanel
