import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
          <Button icon labelPosition='left' onClick={this.favClick}>
            <Icon name='star outline'/>
            Favorite
          </Button>:
          <Button icon labelPosition='left' onClick={this.removeFavClick}>
            <Icon name='star' color='yellow'/>
            Favorite
          </Button>
          }
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(FavoriteItem);