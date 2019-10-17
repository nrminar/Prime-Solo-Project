import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import asteroids from '../../games/roids/sketch3';
import falling from '../../games/falling/sketch4';
import aim from '../../games/aim/sketch2';
import HighScore from '../HighScore/HighScore';
import CommentList from '../Comments/CommentList';
import { connect } from 'react-redux';
import './gamePage.css';

class  GamePage extends Component {
  state = {

  }
  componentDidMount = () =>{
      this.ID();
  }
  ID = () =>{
    this.props.dispatch({ type: 'FETCH_ONE_GAME', payload: this.props.match.params.id })
  }
  render() {
    let name = this.props.reduxState.game.gameReducer.name
    let game;
    let score;
    let comments;
    if(name === 'Asteroids'){
      game =  <P5Wrapper sketch={asteroids}></P5Wrapper>
      score = <HighScore gameId={2}/>
      comments = <CommentList gameId={2}/>
    }else if(name === 'Falling Spheres'){
      game =  <P5Wrapper sketch={falling}></P5Wrapper>
      score = <HighScore gameId={1}/>
      comments = <CommentList gameId={1}/>
    }else if(name === 'Aim Booster'){
      game =  <P5Wrapper sketch={aim}></P5Wrapper>
      score = <HighScore gameId={3}/>
      comments = <CommentList gameId={3}/>
    }
    return (
      <div className="game">
        <div>{game}</div>
        <div>{score}</div>
        <br/>
        <div>{comments}</div>
        <p>{JSON.stringify(this.props.reduxState.game.gameReducer)}</p>
      </div>
    );
  }
}
  const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(GamePage);