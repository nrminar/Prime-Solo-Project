import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Input, Form, Header} from 'semantic-ui-react';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="login">
        {this.props.errors.loginMessage && (
          <Header as="h2"
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </Header>
        )}
        <Form onSubmit={this.login}>
          <h1>Login</h1>
          <Form.Field>
            <label htmlFor="username">
              Username:
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </Form.Field>
          <div>
            <Button
              color='blue'
              type="submit"
              name="submit"
              value="Log In"
            >Login
            </Button>
          </div>
        </Form>
        <center>
          <Button
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
