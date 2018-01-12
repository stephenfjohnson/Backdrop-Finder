import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from './Loader';

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellectedCityId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props.allCitiesQuery.refetch();
    console.log(`🚧 🚧 🚧 Locations.js componentWillReceiveProps 🚧 🚧 🚧`);
  }

  render() {
    if (this.props.allCitiesQuery.loading) {
      return <Loader />;
    }
    return (
      <LocationWrapper>
        {this.props.allCitiesQuery.allCities.map((city, index) => (
          <Link to={`/city/${city.id}`} key={city.id}>
            <Location value={city.id}>{city.name}</Location>
          </Link>
        ))}
      </LocationWrapper>
    );
  }
}

const LIST_CITIES = gql`
  query allCitiesQuery {
    allCities(orderBy: id_DESC) {
      id
      name
    }
  }
`;

export default graphql(LIST_CITIES, { name: 'allCitiesQuery' })(Locations);

const LocationWrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow-x: hidden;
  z-index: 100;
  position: absolute;
`;

const Location = styled.button`
  color: #b8bfd3;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
  background: white;
  border-radius: 0;
  &:hover {
    background: #eb717c;
    color: white;
    cursor: pointer;
  }
`;
