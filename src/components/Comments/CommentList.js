import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../CommentItem/CommentItem';
import { Button, Input } from 'semantic-ui-react';

class  CommentList extends Component {
  state = {
    newMessage: '',
  }
  handleChange = (event) =>{
    this.setState({newMessage: event.target.value }, function(){
      console.log(this.state.newMessage);
    })
  }
  handleSubmit = () =>{
    this.props.dispatch({ type: 'POST_COMMENT', payload: {user: this.props.reduxState.user.id, game: this.props.reduxState.game.gameReducer.id, comment: this.state.newMessage}})
    this.setState({newMessage: ''});
    this.commentInput.value = '';
  }
  handleChange = this.handleChange.bind(this)
  handleSubmit = this.handleSubmit.bind(this)
  render() {
    return (
      <div className="commentList">
        <Input focus ref={(ref) => this.commentInput= ref} onChange = {(event) => this.handleChange(event)} placeholder="Leave a Comment!"></Input>
        <Button onClick = {this.handleSubmit}>Comment</Button>
          {this.props.reduxState.game.commentReducer.map((comment) =>{
            return (
              <CommentItem comment = {comment} />
            )
          })}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CommentList);