import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShooterGame from '../../component/games/shooter';
import Button from '../../component/button/Button';

export default class ListGames extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.match;

    }

    render() {
        return (
            <Router>
                <Switch>
                    
                    <Route exact path={this.params.path}>
                        <h1>List of games</h1>
                        <p>A selection of games that i made</p>
                        <Button href="games/game1">ShooterGame</Button>
                    </Route>

                    <Route path={this.params.path + '/game1'}>
                        <h1>The shooter game</h1>
                        <ShooterGame />
                    </Route>

                </Switch>
                <a href={this.params.url}>Return</a>
            </Router>
        )
    }
} 