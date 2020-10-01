import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss'
import * as serviceWorker from './serviceWorker';
import { 
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import Home from './page/homepage/home';
import Button from './component/button/Button';
import Template from './component/template/template';
import Error404 from './component/404/404';
import SVG from './page/svgpage/svg';
import ListGames from './page/games/ListGames';

ReactDOM.render(
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
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
