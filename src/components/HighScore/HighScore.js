import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Table, Card } from 'semantic-ui-react';

//renders the highscore table that shows scores next to usernames and avatar photos
class  HighScore extends Component {
    render() {
        return (
        <Card>
            <h3>High Scores</h3>
            <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.reduxState.game.scoreReducer.map((score) =>{
                            return (
                                <Table.Row>
                                    <Table.Cell><Image avatar src={`https://github.com/${score.github}.png?size=30`} alt={'/avatarImage/default.jpg?size=30'} />{score.username}</Table.Cell>
                                    <Table.Cell>{score.score}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
            </Table>
        </Card>
        );
    }
}
// {/* <Image floated='right' size='mini' src={`https://github.com/${this.props.comment.github}.png`}  /> */}


const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(HighScore);