import React from 'react';
import styled from 'styled-components';

import MapboxMap from './Map';
import Backdrop from './Backdrop';
import Locations from './Locations';
import Loader from './Loader';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props.allBackdropsQuery.refetch();
    console.log(this.props.allBackdropsQuery);
    console.log(this.props.allBackdropsQuery.variables.id);
  }

  render() {
    console.log(`this.props.data`);
    console.log(this.props);
    if (this.props.allBackdropsQuery.loading) {
      return <Loader />;
    }

    console.log(`YOUKNOW`);
    console.log(this.props.allBackdropsQuery);

    console.log(`🌶 🌶 🌶 🌶 🌶 🌶 🌶`);

    return (
      <div className="App">
        <button onClick={this.changeCity}>Change what city is being queried</button>
        <Locations />
        {/* <MapboxMap data={this.props.allBackdropsQuery.City} /> */}
        {/* <Backdrop data={this.props.allBackdropsQuery.City} /> */}
      </div>
    );
  }
  changeCity = async () => {
    await this.props.mutate({ variables: { id: 'cjac8gnk83vjo01831fcrw0u6' } });
  };
}

const ALL_BACKDROPS_QUERY = gql`
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

const changeId = gql`
  mutation changeIdMutation($id: ID!) {
    City(id: $id) {
      id
    }
  }
`;

const DetailPageWithGraphQL = compose(
  graphql(ALL_BACKDROPS_QUERY, {
    name: 'allBackdropsQuery',
    options: {
      variables: {
        id: 'cjac8gnk83vjo01831fcrw0u6'
      }
    }
  }),
  graphql(changeId, {
    name: 'changeIdMutation',
    options: {
      variables: {
        id: 'cjac8gnk83vjo01831fcrw0u6'
      }
    }
  })
)(Home);

const ListPageWithQuery = graphql(changeId)(DetailPageWithGraphQL);

export default ListPageWithQuery;

// const ListPageWithQuery = graphql(ALL_BACKDROPS_QUERY, {
//   name: 'allBackdropsQuery',
//   options: {
//     fetchPolicy: 'network-only',
//     variables: { id: 'cjac8gnk83vjo01831fcrw0u6' }
//   }
// })(Home);
//
// export default ListPageWithQuery;
