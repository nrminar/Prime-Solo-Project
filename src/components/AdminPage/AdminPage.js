import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import CommentItem from '../CommentItem/CommentItem';

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
            {this.props.reduxState.game.commentReducer.map((comment) =>{
                return(
                    <CommentItem comment = {comment} isAdmin = {true}/>
                )
            })}
            {JSON.stringify(this.props.reduxState.game.commentReducer)};
        </div>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(AdminPage));