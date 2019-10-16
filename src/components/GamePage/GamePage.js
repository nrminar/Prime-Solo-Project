import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import asteroids from '../../games/roids/sketch3';
import falling from '../../games/falling/sketch4';
import aim from '../../games/aim/sketch2';
import { connect } from 'react-redux';

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
    if(name === 'Asteroids'){
      game =  <P5Wrapper sketch={asteroids}></P5Wrapper>
    }else if(name === 'Falling Spheres'){
      game =  <P5Wrapper sketch={falling}></P5Wrapper>
    }else if(name === 'Aim Booster'){
      game =  <P5Wrapper sketch={aim}></P5Wrapper>
    }
    return (
      <div className="App">
        {game}
        <p>{JSON.stringify(this.props.reduxState.game.gameReducer)}</p>
      </div>
    );
  }
}
  const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(GamePage);