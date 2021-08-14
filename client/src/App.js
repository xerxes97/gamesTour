import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import LoadingHome from './components/LoadingPage/LoadingHome';
import Nav from './components/Nav/Nav';
import Details from './components/GameDetails/Details'
import Creator from './components/GameCreator/Creator'
import Favorites from './components/Favorites/Favorites';
import Match from './components/noMatch/Match';
import Footer from './components/Footer/Footer';
import Visual from './components/Visual/Visual';
import VisualSearch from './components/VisualSearch/VisualSearch';


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/'>
          <LoadingHome/>
        </Route>
        <Route path='/home'>
          <Nav/>
          <Home/>
          <Footer/>
        </Route>
        <Route path='/details/:id'>
          <Nav/>
          <Details/>
          <Footer/>
        </Route>
        <Route path='/addGame'>
          <Nav/>
          <Creator/>
          <Footer/>
        </Route>
        <Route path='/games'>
          <Nav/>
          <Visual/>
          <Footer/>
        </Route>
        <Route path='/gameSearch'>
          <Nav/>
          <VisualSearch/>
          <Footer/>
        </Route>
        <Route path='/favorites'>
          <Nav/>
          <Favorites/>
          <Footer/>
        </Route>
        <Route path='*'>
          <Nav/>
          <Match/>
          <Footer/>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
