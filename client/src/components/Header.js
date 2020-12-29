import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../stateManagement/actions/userAction'
import SearchBox from './SearchBox'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.userLogin)

  const logoutHandler = () => {
    dispatch(logout())
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [])
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              FsixShop<i className='fas fa-shopping-cart mr-4'></i>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
                  <span className='badge badge-pill badge-danger notify'>
                    {cartItems &&
                    cartItems.reduce((acc, cur) => acc + cur.qty, 0) === 0
                      ? ''
                      : cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                  </span>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='mx-2'>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler} className='mx-2'>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='mx-2'>
                    <i className='fas fa-user'></i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminMenu'>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item className='mx-2'>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item className='mx-2'>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item className='mx-2'>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
