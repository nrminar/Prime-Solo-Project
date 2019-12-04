import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './Menu.css'

//navigation bar that allows you to go to everywhere on the site.
class  MenuItem extends Component {
    state = {
        hidden: false
    }
    render() {
      return (
          <div className="navBack">
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => this.setState({hidden: false})}
                vertical
                visible={this.state.hidden}
                width='thin' 
            >
                <Link to="/home">
                    <Menu.Item as='a'>
                    <Icon name='home' />
                    {this.props.reduxState.user.id ? 'Home' : 'Login / Register'}
                    </Menu.Item>
                </Link>
                
                {this.props.reduxState.user.id ?
                <>
                <Link to="/profile">
                    <Menu.Item as='a'>
                    <Icon name='users' />
                    Profile
                    </Menu.Item>
                </Link>
                
                <Link to="/home">
                    <Menu.Item as='a' onClick={() => this.props.dispatch({ type: 'LOGOUT' })} >
                        <Icon name='log out'/>
                        Logout
                    </Menu.Item>
                </Link>
                </>
                : ''
                }
                {!this.props.reduxState.user.admin ? '' : 
                <Link to="/admin">
                    <Menu.Item as='a'>
                        <Icon name='code' />
                        Admin
                    </Menu.Item>
                </Link>
      }
            </Sidebar>

            <Sidebar.Pusher dimmed={this.state.hidden}>
                <Segment basic textAlign="left">
                    <Link to="/">
                        <Header color="yellow" as='h1'>React Games</Header>
                    </Link>
                    <Button onClick={()=>{this.setState({hidden: true})}}>
                        Menu
                        <Icon name="angle double right"/>
                    </Button>
                </Segment>
            </Sidebar.Pusher>
        </div>
      )
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(MenuItem));