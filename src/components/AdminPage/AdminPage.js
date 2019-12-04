import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import CommentItem from '../CommentItem/CommentItem';
import { Card } from 'semantic-ui-react';
import './Admin.css';

//this page displays all the comments for the admin to view and moderate
class  AdminPage extends Component {
    componentDidMount = () =>{
        this.getComments();
    }
    getComments = () =>{
        this.props.dispatch({ type: 'FETCH_ALL_COMMENTS'})
    }
    render() {
      return (
        <div className="admin">
            <Card.Group centered >
                {this.props.reduxState.game.commentReducer.map((comment) =>{
                    return(
                        <CommentItem comment = {comment} isAdmin = {true}/>
                    )
                })}
            </Card.Group>
        </div>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(AdminPage));