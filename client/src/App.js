import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import { Provider } from 'react-redux'
import store from './stateManagement/store'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingScreen from './screens/SettingScreen'
import OrderScreen from './screens/OrderScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import PaymentScreen from './screens/PaymentScreen'
import UsersScreen from './screens/UsersScreen'
import AdminProductScreen from './screens/AdminProductScreen'
import ProductEditScreen from './screens/ProductEditScreen'
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/edit/profile' component={SettingScreen} />
            <Route path='/orders' component={OrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment_method' component={PaymentMethodScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={PaymentScreen} />
            <Route path='/admin/users' component={UsersScreen} />
            <Route path='/admin/products' component={AdminProductScreen} />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
