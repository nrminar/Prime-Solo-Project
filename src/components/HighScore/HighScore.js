import React, { Component } from 'react';
import { connect } from 'react-redux';

class  HighScore extends Component {
    render() {
      return (
        <div>
            <h3>High Scores</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.reduxState.game.scoreReducer.map((score) =>{
                        return (
                            <tr><td>{score.username}</td><td>{score.score}</td></tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
      );
    }
  }

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(HighScore);