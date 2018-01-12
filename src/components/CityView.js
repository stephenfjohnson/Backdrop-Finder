import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MapboxMap from './Map';
import Backdrop from './Backdrop';
import Locations from './Locations';
import Loader from './Loader';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class City extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }
    return (
      <Content>
        <LocationsWrapper>
          <Locations />
        </LocationsWrapper>
        <MapContainer>
          <MapboxMap data={this.props.data.City} />
        </MapContainer>
        <BackdropWrapper>{this.props.data.City.backdrops.map(backdrop => <Backdrop key={backdrop.id} backdrop={backdrop} />)}</BackdropWrapper>
      </Content>
    );
  }
}

const CityQuery = gql`
  query cityQuery($id: ID!) {
    City(id: $id) {
      id
      name
      backdrops {
        id
        title
        description
        instagramPhotoUrl
        address
        lng
        lat
      }
    }
  }
`;

const DisplayCity = graphql(CityQuery, {
  options: props => ({
    variables: { id: props.match.params.id },
    fetchPolicy: 'cache-first'
  })
})(City);

// const DisplayCity = graphql(DisplayCity);

export default withRouter(DisplayCity);

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

const LocationsWrapper = styled.div``;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  flex: 1 100%;
`;

const BackdropWrapper = styled.div`
  position: relative;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  display: grid;
  ${'' /* padding: 2rem; */} grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2rem;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  ${'' /* margin-top: -215px; */} z-index: 100;
  padding: 0 1rem;
  bottom: 0;
  left: 0;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1.5rem;
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 1rem;
  }
`;
