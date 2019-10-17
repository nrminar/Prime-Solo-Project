import React, { Component } from 'react';
import { connect } from 'react-redux';

class  CommentList extends Component {
    componentDidMount = () =>{
        // this.props.dispatch({ type: 'FETCH_SCORES', payload: this.props.gameId})
    }
    render() {
      return (
        <div className="commentList">
            <p>{JSON.stringify(this.props.reduxState.commentReducer)}</p>
        </div>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CommentList);