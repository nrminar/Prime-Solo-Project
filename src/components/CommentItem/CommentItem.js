import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Card, Image, Input, Confirm } from 'semantic-ui-react';

class  CommentItem extends Component {
    state = {
        comment: '',
        isEdit: false,
        open: false,
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
        this.props.dispatch({ type: 'DELETE_COMMENT', payload: {id: this.props.comment.id , game: this.props.comment.game_id, admin: this.props.isAdmin, profile: this.props.profile}})
        this.close();
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
      return (
        <Card className="comment">
            <Card.Content>
                <Image floated='right' size='mini' src={`https://github.com/${this.props.comment.github}.png`}  />
            {!this.state.isEdit ?
            <>
            <Card.Header>{this.props.comment.username}</Card.Header>
            <Card.Meta>{this.props.comment.name}</Card.Meta>
            <Card.Description textAlign="left">
                {this.props.comment.comment}
            </Card.Description>
            <Card.Content extra="true">
            {(this.props.comment.username === this.props.reduxState.user.username) ? 
            <>
                <Button onClick = {this.open} extra floated='right'>
                    <Icon name='delete' color='red'/>
                    Delete
                </Button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={this.deleteComment}
                    basic
                    size="mini"
                />
                <Button icon onClick = {this.editComment} extra floated='right'>
                    <Icon name='edit' color='blue'/>
                    Edit
                </Button>
            </> 
            : (this.props.reduxState.user.admin) ?
            <>
                <Button onClick = {this.open} extra floated='right'>
                    <Icon name='delete' color='red'/>
                    Delete
                </Button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={this.deleteComment}
                    basic
                    size="mini"
                />
                <Button icon onClick = {this.editComment} extra floated='right'>
                    <Icon name='edit' color='blue'/>
                    Edit
                </Button>
            </> 
            : ''
            }
            </Card.Content>
            </> :
            <>
            <Card.Header>{this.props.comment.username}:</Card.Header>
            <Card.Meta>{this.props.comment.name}</Card.Meta>
            <Input focus onChange = {(event) => this.handleChange(event)} value = {this.state.comment}></Input>
            <Button onClick = {this.saveComment}>
                <Icon color='green' name='check'/>
                Save
            </Button>
            </>
            }
            </Card.Content>
        </Card>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(CommentItem));