import React, { Component } from 'react';
// import InstagramEmbed from 'react-instagram-embed';
// import InstagramLoader from './components/InstagramEmbed';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import './App.css';
import MapboxMap from './components/Map';
import Backdrop from './components/Backdrop';
import laLocations from './data/LaLocations';
import Loader from './components/Loader';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// __SIMPLE_API_ENDPOINT__ looks like: 'https://api.graph.cool/simple/v1/__SERVICE_ID__'
// const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9w1lpyp1pd101735znmymnf' });

// import Locations from './components/Locations';

// Explore taken => https://www.instagram.com/p/BYmpLLggVWn/?taken-at=262123225

class App extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(ALL_BACKDROPS_QUERY);

    this.props.allBackdropsQuery.refetch();
    // if (this.props.location.key !== nextProps.location.key) {
    //
    // }
    console.log(ALL_BACKDROPS_QUERY);
  }
  render() {
    console.log('console.log(this.props.allPostsQuery);');
    console.log(this.props.allBackdropsQuery);
    if (this.props.allBackdropsQuery.loading) {
      return <Loader />;
    }

    return (
      <div className="App">
        <Header>
          <Logo>Backdrop Finder</Logo>
          <h3>locating cool backdrops for your photos around your city.</h3>
        </Header>
        {/* <Locations /> */}
        <MapboxMap data={this.props.allBackdropsQuery.allBackdrops} />
        <Backdrops>{this.props.allBackdropsQuery.allBackdrops.map(backdrop => <Backdrop key={backdrop.id} backdrop={backdrop} />)}</Backdrops>
      </div>
    );
  }
}

const Header = styled.header`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto 2rem auto;
`;

const Logo = styled.h1`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.5em;
`;

const Backdrops = styled.section`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: grid;
  padding: 2rem 0;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 2rem;
`;

const ALL_BACKDROPS_QUERY = gql`
  query allBackdropsQuery {
    allBackdrops(orderBy: id_DESC) {
      id
      description
      instagramPhotoUrl
    }
  }
`;

const ListPageWithQuery = graphql(ALL_BACKDROPS_QUERY, {
  name: 'allBackdropsQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(App);

export default ListPageWithQuery;
