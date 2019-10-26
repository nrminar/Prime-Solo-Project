import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Modal, Input, Form, Icon} from 'semantic-ui-react';
import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    github: '',
    open: false,
    message: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.github) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          github: this.state.github,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
      this.setState({ open: true, message: this.props.errors.loginMessage })
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  render() {
    return (
      <div className="registerPage">
        <Modal
          open={this.state.open}
          size="large"
          basic
          centered
          size='mini'
        >
          <Modal.Content>
            <h3>{this.props.errors.registrationMessage}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={()=>{this.setState({open: false})}} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
        <Form onSubmit={this.registerUser}>
          <h1>Register User</h1>
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
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="github">
              Github Username:
              <Input
                type="text"
                name="github"
                value={this.state.github}
                onChange={this.handleInputChangeFor('github')}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <Button
              color="blue"
              type="submit"
              name="submit"
              value="Register"
            >
            Register
            </Button>
          </Form.Field>
        </Form>
        <center>
          <Button
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
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

export default connect(mapStateToProps)(RegisterPage);

