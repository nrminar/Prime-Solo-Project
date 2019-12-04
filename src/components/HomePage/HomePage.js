import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameItem from '../GameItem/GameItem'
import styled from 'styled-components' 
import { Card } from 'semantic-ui-react'

const GameList = styled.div`
  padding-top: 150px;
`
//home page that shows all the games
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
          <Card.Group centered>
              {this.props.reduxState.game.allGamesReducer.map((game, index) =>{
                  return(
                      <GameItem game = {game} index = {index} />
                  )
              })}
          </Card.Group>
        </GameList>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(HomePage);