import React, { Component } from 'react'
import { Container, Name, GameList, GameListHeader, GameRecord, Column, ColumnLabels } from '../styled/Profile'

class Profile extends Component {


    static defaultProps = {
        user: {
            email: "email",
            games: [{
                winner: true,
                createdAt: '12/12/2012',
                id: 12
            }, {
                winner: true,
                createdAt: '12/13/2012',
                id: 13
            }, {
                winner: false,
                createdAt: '12/14/2012',
                id: 14
            }]
        }
    }

    get records() {
        return this.props.user.games
            .map((game, index) => {
                return (
                    <GameRecord
                        key={index}
                        index={index}
                    >
                        <Column>
                            {(game.winner) ? 'won' : 'looser'}
                        </Column>

                        <Column>

                        </Column>

                        <Column>

                        </Column>

                        <Column>
                            {game.createdAt}
                        </Column>

                    </GameRecord>
                )
            })
    }

    render() {
        let { email } = this.props.user
        return (
            <Container>
                <Name>
                    {email}
                </Name>
                <GameList>
                    <GameListHeader>
                        MyGames
                    </GameListHeader>
                    <ColumnLabels>
                        <Column>
                            Outcome
                        </Column>
                        <Column>
                            Guess
                        </Column>
                        <Column>
                            Guessed cor
                        </Column>
                        <Column>
                            Date
                        </Column>
                    </ColumnLabels>
                    {this.records}
                </GameList>

            </Container>
        )
    }
}

export default Profile