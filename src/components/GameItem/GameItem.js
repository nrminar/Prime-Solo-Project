import React, { Component } from 'react';
import {HashRouter as Router,} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class  GameItem extends Component {
    goGame = (id) =>{
        this.props.history.push(`/game/${id}`)
    }
    render() {
      return (
        <div className="game">
            <Router>
                    <div onClick = {() => this.goGame(this.props.game.id)}>
                        <img src = {this.props.game.image}/>
                        <h3>{this.props.game.name}</h3>
                    </div>
            </Router>
        </div>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(GameItem));