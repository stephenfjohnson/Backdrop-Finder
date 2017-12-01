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
  // constructor() {
  //   super(props);
  // }

  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }
    console.log(this.props);
    console.log(this.props.data);
    return (
      <div className="App">
        <Locations />
        <p>{this.props.data.id}</p>
        {/* <MapboxMap data={this.props.data.City} /> */}
        {/* <Backdrop data={this.props.data.City} /> */}
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

const BackdropWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: grid;
  padding: 2rem 0;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2rem;
`;
