import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import asteroids from '../../games/roids/sketch3';
import falling from '../../games/falling/sketch4';
import aim from '../../games/aim/sketch2';
import scroller from '../../games/sideScroller/side.sketch';
import invaders from '../../games/Invaders/invaders.sketch';
import command from '../../games/command/space.command';

import HighScore from '../HighScore/HighScore';
import CommentList from '../Comments/CommentList';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import { connect } from 'react-redux';
import './gamePage.css';
import { Card } from 'semantic-ui-react';

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
    }else if(name === 'Side Scroller'){
      game =  <P5Wrapper sketch={scroller}></P5Wrapper>
      score = <HighScore gameId={4}/>
      comments = <CommentList gameId={4}/>
      howto = <Card>How To Play: Dodge the things! SpaceBar: Jump</Card>
    }else if(name === 'Space Invaders'){
      game =  <P5Wrapper sketch={invaders}></P5Wrapper>
      score = <HighScore gameId={5}/>
      comments = <CommentList gameId={5}/>
      howto = <Card>How To Play: Dodge the things! Arrow Keys: Move, SpaceBar: Shoot</Card>
    }else if(name === 'Missile Command'){
      game =  <P5Wrapper sketch={command}></P5Wrapper>
      score = <HighScore gameId={6}/>
      comments = <CommentList gameId={6}/>
      howto = <Card>How To Play: Shoot the asteroids before they hit your city! Mouse to move cannon, Click to shoot</Card>
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