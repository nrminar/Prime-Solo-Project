import React, { Component } from 'react';
import { connect } from 'react-redux';

class  FavoriteItem extends Component {
  componentDidMount = () =>{
    this.getFavorite();
  }
  getFavorite = () =>{
    this.props.dispatch({ type: 'FETCH_FAVORITE', payload: this.props.gameId})
  }
  favClick = () =>{
    this.props.dispatch({ type: 'ADD_FAVORITE', payload: this.props.gameId})
  }
  removeFavClick = () =>{
    this.props.dispatch({ type: 'REMOVE_FAVORITE', payload: this.props.gameId})
  }

  render() {
    return (
      <div className = "favButton">
          {!this.props.reduxState.game.favoriteReducer ? 
          <button onClick = {this.favClick}>Favorite</button> :
          <button onClick = {this.removeFavClick}>Un-Favorite</button> 
          }
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(FavoriteItem);