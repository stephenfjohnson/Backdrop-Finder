import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MapboxMap from './Map';
import Backdrop from './Backdrop';
import Locations from './Locations';
import Loader from './Loader';

// import { graphql, gql } from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    mutate: PropTypes.func,
    refresh: PropTypes.func
  };
  // static propTypes = {
  //   post: React.PropTypes.object,
  //   mutate: React.PropTypes.func,
  //   refresh: React.PropTypes.func
  // };

  handleNewCity = () => {
    this.props.mutate({ variables: { id: 'cjac8grum3vjr0183k17y4ijm' } }).then(this.props.refresh);
  };

  render() {
    console.log(this.props);
    console.log(this.props.data);
    return (
      <div className="App">
        <span onClick={this.handleNewCity}>Delete</span>
        {/* <Locations /> */}
        {/* <MapboxMap data={this.props.allBackdropsQuery.City} /> */}
        {/* <Backdrop data={this.props.allBackdropsQuery.City} /> */}
      </div>
    );
  }
}

const getCities = gql`
  query allBackdropsQuery($id: ID!) {
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

const ListPageWithQuery = graphql(getCities, {
  options: {
    forcePolicy: 'cache-and-network',
    variables: { id: 'cjac8gnk83vjo01831fcrw0u6' }
  }
})(Home);

export default ListPageWithQuery;
