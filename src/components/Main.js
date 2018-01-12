import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import CityView from './CityView';
import CreateBackdrop from './CreateBackdrop';

const Main = () => (
  <MainContent>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/city/:id" component={CityView} />
      <Route path="/add" component={CreateBackdrop} />
    </Switch>
  </MainContent>
);

const MainContent = styled.main`
  padding: 0;
`;

export default Main;
