import React from 'react';
import Locations from './Locations';
import Loader from './Loader';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {
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
        <h1>Select Location to to view cool places to take photos!</h1>
        <Locations />
      </div>
    );
  }
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
        id: 'cjac8grum3vjr0183k17y4ijm'
      }
    }
  })
)(Home);

const ListPageWithQuery = graphql(changeId)(DetailPageWithGraphQL);

export default ListPageWithQuery;
