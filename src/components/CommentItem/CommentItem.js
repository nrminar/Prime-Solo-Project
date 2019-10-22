import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Card, Image } from 'semantic-ui-react';

class  CommentItem extends Component {
    state = {
        comment: '',
        isEdit: false,
    }
    componentDidMount = () =>{
        this.setComment();
    }
    setComment = () =>{
        this.setState({ comment: this.props.comment.comment});
    }
    editComment = () =>{
        this.setState({ isEdit: !this.state.isEdit})
    }
    saveComment = () =>{
        if(this.props.isAdmin){
            this.props.dispatch({ type: 'ADMIN_UPDATE_COMMENT', payload: {id: this.props.comment.id , comment: this.state.comment, game: this.props.comment.game_id}})
        }else{
            this.props.dispatch({ type: 'UPDATE_COMMENT', payload: {id: this.props.comment.id , comment: this.state.comment, game: this.props.comment.game_id}})
        }
        this.setState({ isEdit: !this.state.isEdit})
    }
    handleChange = (event) =>{
        this.setState({ comment: event.target.value})
    }
    deleteComment = () =>{
        if(window.confirm('Are you sure you want to delete this comment?')){
            this.props.dispatch({ type: 'DELETE_COMMENT', payload: {id: this.props.comment.id , game: this.props.comment.game_id}})
        }
    }
    render() {
      return (
        <div className="comment">
            {!this.state.isEdit ?
            <>
            <p>{this.props.comment.username}: {this.props.comment.comment}</p>
            {(this.props.comment.username === this.props.reduxState.user.username) ? 
            <>
            <Button icon onClick = {this.editComment}>
                <Icon name='edit'/>
            </Button>
            <Button onClick = {this.deleteComment}>
                <Icon name='delete'/>
            </Button>
            </> 
            : (this.props.reduxState.user.admin) ?
            <>
            <Button icon onClick = {this.editComment}>
                <Icon name='edit'/>
            </Button>
            <Button onClick = {this.deleteComment}>
                <Icon name='delete'/>
            </Button>
            </> 
            : ''
            }
            </> :
            <>
            <p>{this.props.comment.username}:</p>
            <input onChange = {(event) => this.handleChange(event)} value = {this.state.comment}></input>
            <button onClick = {this.saveComment}>Save</button>
            </>
            }
        </div>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(CommentItem));