import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'

import AllProducts from './components/AllProducts'

import Cart from './components/Cart'
import Checkout from './components/Checkout'

import SingleProduct from './components/SingleProduct'
import AdminPage from './components/adminPage'

import NotFound from './components/notFound'
import Home from './components/home'

import GoogleMap from './components/map'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    let {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/cart" render={props => <Cart {...props} />} />
        <Route exact path="/checkout" component={Checkout} />
        <Route
          path="/products/:id"
          render={routeProps => <SingleProduct {...routeProps} />}
        />
         home-page
        <Route exact path="/edit-products" component={AdminPage} />
        <Route exact path="/map" component={GoogleMap} />


        <Route exact path="/" component={Home} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isAdmin && <Route exact path="/admin" component={AdminPage} />}
            <Route component={NotFound} />
          </Switch>
        )}
        {/* Displays our Not Found component as a fallback */}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      // dispatch(productsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
