import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import CityView from './CityView';
import CreateBackdrop from './CreateBackdrop';
import withTracker from './Tracker'

const Main = () => (
  <MainContent>
    <Switch>
      <Route exact path="/" component={withTracker(Home)} />
      <Route path="/city/:id" component={withTracker(CityView)} />
      <Route path="/add" component={withTracker(CreateBackdrop)} />
    </Switch>
  </MainContent>
);

const MainContent = styled.main`
  padding: 0;
`;

export default Main;
