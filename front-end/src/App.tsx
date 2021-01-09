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
import AllModalContainer from './Components/Modals/AllModalContainer';
import AuthTry from './Components/HOC/AuthTry';
import SwapTheme from './Components/SwapTheme';
import OrdersHistory from './Pages/OrdersHistory';

function App() {
  return (
    <AuthTry>
      <ToastsContainer />
      <Navbar />
      <SwapTheme />
      <Switch>
        <Route exact path={routesStatic.home} component={Home} />
        <Route exact path={routesStatic.order} component={Order} />
        <Route path={routesStatic.ordersHistory} component={OrdersHistory} />
        <Route exact path={routesStatic.goods} component={Goods} />
        <Route path={`${routesStatic.goods}/:id`} component={Pizza} />
      </Switch>
      <AllModalContainer />
      <ScrollTopArrow />
    </AuthTry>
  );
}

export default App;
