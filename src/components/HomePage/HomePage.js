import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            <p>{JSON.stringify(this.props.reduxState.user)}</p>
        </GameList>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(HomePage);