import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Order from './Pages/Order';
import Home from './Pages/Home';
import { routesStatic } from './types';
import './styles/app.scss';
import Goods from './Pages/Goods';
import ScrollTopArrow from './Components/ScrollTopArrow';
import Pizza from './Pages/Pizza';
import ToastsContainer from './Components/ToastsContainer';

function App() {
  return (
    <>
      <ToastsContainer />
      <Navbar />
      <Switch>
        <Route exact path={routesStatic.home} component={Home} />
        <Route path={routesStatic.order} component={Order} />
        <Route exact path={routesStatic.goods} component={Goods} />
        <Route path={`${routesStatic.goods}/:id`} component={Pizza} />
      </Switch>
      <ScrollTopArrow />
    </>
  );
}

export default App;
