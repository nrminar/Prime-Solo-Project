import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Input, Form, Icon} from 'semantic-ui-react';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    open: false,
    message: '',
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
      this.setState({ open: true, message: this.props.errors.loginMessage })
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
        <Modal
          open={this.state.open}
          size="large"
          basic
          centered
          size='mini'
        >
          <Modal.Content>
            <h3>{this.props.errors.loginMessage}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={()=>{this.setState({open: false})}} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
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
