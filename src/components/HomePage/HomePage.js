import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import GameItem from '../GameItem/GameItem'
import styled from 'styled-components'

const GameList = styled.div`
  display: inline-flex;
`
class  HomePage extends Component {
    state = {
        games: []
    }
    componentDidMount = () =>{
        this.props.dispatch({type: 'FETCH_GAMES'})
    }
    render() {
      return (
        <GameList>
            {this.props.reduxState.game.allGamesReducer.map((game, index) =>{
                return(
                    <GameItem game = {game} index = {index} />
                )
            })}
        </GameList>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(HomePage);