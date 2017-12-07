import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { transparentize } from 'polished';
import mapboxgl from 'mapbox-gl';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from './Loader';

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellectedCityId: ''
    };
    // this.onClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.allCitiesQuery.refetch();
    console.log(LIST_CITIES);
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
  max-width: 1170px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2rem;
  margin: 0 auto 2rem auto;
  @media (max-width: 1000px) {
    grid-column-gap: 1.5rem;
  }
  @media (max-width: 800px) {
    grid-column-gap: 1rem;
    margin: 0 auto 1rem auto;
  }
  @media (max-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Location = styled.button`
  color: #b8bfd3;
  color: white;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
  background: #24232c;
  border-radius: 5px;
  &:hover {
    background: #efefef;
    background: #eb717c;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    margin-bottom: 1rem;
  }
`;

const Dropdown = styled.setion;
