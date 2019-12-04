import React, { Component } from 'react';
import {HashRouter as Router,} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

//renders each game on the home page, navigates you to that game when you click on it
class  GameItem extends Component {
    goGame = (id) =>{
        this.props.history.push(`/game/${id}`)
    }
    render() {
      return (
          <Card onClick = {() => this.goGame(this.props.game.id)}>
            <Card.Content >
                <Router>
                    <Image src = {this.props.game.image} alt = "game"/>
                    <Card.Header textAlign='center'>
                      {this.props.game.name}
                    </Card.Header>
                </Router>
              </Card.Content>
          </Card>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(GameItem));