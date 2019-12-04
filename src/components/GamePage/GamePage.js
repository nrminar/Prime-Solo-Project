import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import asteroids from '../../games/roids/sketch3';
import falling from '../../games/falling/sketch4';
import aim from '../../games/aim/sketch2';

import HighScore from '../HighScore/HighScore';
import CommentList from '../Comments/CommentList';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import { connect } from 'react-redux';
import './gamePage.css';
import { Card } from 'semantic-ui-react';

//renders the game and its comments, how to, and scores, contains highscore, commentlist, and favorite item componenet
class  GamePage extends Component {
  state = {

  }
  componentDidMount = () =>{
      this.getInfo();
      this.getComments();
  }
  getInfo = () =>{
    this.props.dispatch({ type: 'FETCH_ONE_GAME', payload: this.props.match.params.id })
    this.props.dispatch({ type: 'FETCH_SCORES', payload: this.props.match.params.id})
  }
  getComments = () =>{
    this.props.dispatch({ type: 'FETCH_COMMENTS', payload: this.props.match.params.id})
  }
  render() {
    let name = this.props.reduxState.game.gameReducer.name
    let game;
    let score;
    let comments;
    let howto;
    if(name === 'Asteroids'){
      game =  <P5Wrapper sketch={asteroids}></P5Wrapper>
      score = <HighScore gameId={2}/>
      comments = <CommentList gameId={2}/>
      howto = <Card>How To Play: Shoot the asteroids! Don't get hit! Arrow Keys: Move, Space Bar: Shoot</Card>
    }else if(name === 'Falling Spheres'){
      game =  <P5Wrapper sketch={falling}></P5Wrapper>
      score = <HighScore gameId={1}/>
      comments = <CommentList gameId={1}/>
      howto = <Card>How To Play: Dodge The Spheres! Arrow Keys: Move</Card>
    }else if(name === 'Aim Booster'){
      game =  <P5Wrapper sketch={aim}></P5Wrapper>
      score = <HighScore gameId={3}/>
      comments = <CommentList gameId={3}/>
      howto = <Card>How To Play: Click All the Circles!</Card>
    }
    return (
      <div className="game">
        <div>{game}</div>
        <div className="favorite-row">
          <div className="howTo">
            <div>{howto}</div>
          </div>
          <div className="favorite">
            <FavoriteItem gameId = {this.props.match.params.id}/>
          </div>
        </div>
        <div className="info">
          <div className="score">
            <div>{score}</div>
          </div>
          <div className="comments">
            <div>{comments}</div>
          </div>
        </div>
      </div>
    );
  }
}
  const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(GamePage);