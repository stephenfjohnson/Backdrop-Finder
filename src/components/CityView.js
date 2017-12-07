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
      <div>
        <Locations />
        <MapContainer>
          <MapboxMap data={this.props.data.City} />
        </MapContainer>
        <BackdropWrapper>{this.props.data.City.backdrops.map(backdrop => <Backdrop key={backdrop.id} backdrop={backdrop} />)}</BackdropWrapper>
      </div>
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

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1170px;
  height: 600px;
  height: 40vh;
  margin: 0 auto;
  @media (max-width: 1000px) {
    height: 35vh;
  }
  @media (max-width: 800px) {
    height: 30vh;
  }
`;

const BackdropWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: grid;
  padding: 2rem 0;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2rem;
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
