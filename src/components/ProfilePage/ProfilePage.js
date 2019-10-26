import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameItem from '../GameItem/GameItem';
import { Tab, Button, Icon, Card } from 'semantic-ui-react';
import CommentItem from '../CommentItem/CommentItem';
import styled from 'styled-components';

const Profile = styled.div`
  padding-top: 150px;
  padding-left: 150px;
  padding-right: 150px;
`
class  ProfilePage extends Component {
  state ={
    favorite: true
  }
  componentDidMount = () =>{
    this.getFavGames();
    this.getMyComments();
  }
  getFavGames = () =>{
    this.props.dispatch({ type: 'FETCH_FAV_GAMES'})
  }
  getMyComments = () =>{
    this.props.dispatch({ type: 'FETCH_MY_COMMENTS'})
  }
  removeFavorite = (id) =>{
    if(window.confirm('Are you sure you want to remove this favorite?')){
      this.props.dispatch({ type: 'REMOVE_MY_FAVORITE', payload: id})
    }
  }
  render() {
    const panes = [
      { menuItem: 'My Comments', render: () => <Tab.Pane>
        <Card.Group centered>
          {this.props.reduxState.game.myCommentsReducer.map((comment) =>{
              return (
                <CommentItem comment = {comment} profile = {true}/>
              )
            })}
          </Card.Group>
      </Tab.Pane> },
      { menuItem: 'My Favorite Games', render: () => <Tab.Pane>
         {this.props.reduxState.game.allFavoritesReducer.map((game) =>{
            return(
              <>
              <GameItem game = {game} />
              <Button icon labelPosition='left' onClick={() => this.removeFavorite(game.id)}>
                <Icon color='red' name='delete'/>
                Remove Favorite
              </Button>
              </>
            )
          })}
      </Tab.Pane> }
    ]
    const ProfilePageTabs = () => <Tab panes={panes}/>
    return (
      <Profile>
          <ProfilePageTabs />
      </Profile>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});
export default connect(mapStateToProps)(ProfilePage);