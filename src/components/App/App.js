import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import P5Wrapper from 'react-p5-wrapper';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import styled from 'styled-components';

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import GamePage from '../GamePage/GamePage';
import AdminPage from '../AdminPage/AdminPage';

import header from '../../games/header/header.sketch';

import './App.css';

const Head = styled.div`
  position: fixed;
  z-index: 150;
`
const Back = styled.div`
  position: fixed;
  z-index: -50;
`
class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          {/* Navigation Menu */}
          <Head>
            <Menu/>
          </Head>
          {/* Background bubbles */}
          <Back>
            <P5Wrapper sketch={header}></P5Wrapper>
          </Back>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={HomePage}
            />
            <ProtectedRoute
              exact
              path="/game"
              component={GamePage} 
            />
            <ProtectedRoute
              exact
              path="/game/:id"
              render={({match})=><GamePage match={match}/>}/>
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            {!this.props.user.admin ? 
            <Redirect exact from="/admin" to="/home" /> :
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminPage}
            />}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(App);
