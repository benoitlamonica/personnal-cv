import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';
import Home from '../page/homepage/home';
import Button from './button/Button';
import Template from './template/template';
import Error404 from './404/404';
import SVG from '../page/svgpage/svg';
import ListGames from '../page/games/ListGames';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Template>

                <Switch>
                    <Route exact path="/" render={props => <Home {...props} />} />

                    <Route path="/button">
                    <Button>COUCOU</Button>
                    </Route>

                    <Route path="/svg">
                    <SVG />
                    </Route>

                    <Route path="/games" render={props => <ListGames {...props}/>} />

                    <Route path="*" render={props => <Error404 {...props} />} />

                </Switch>
                
                </Template>
            </Router>
        )
    }
}