import React, { Component } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { media } from '../style-utils';
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

  handleClick(e) {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ sellectedCityId: value }, () => {
      console.log(`sellectedCityId: ${this.state.sellectedCityId}`);
    });

    this.props
      .mutate({
        variables: { repoFullName: 'apollographql/apollo-client' }
      })
      .then(({ data }) => {
        console.log('got data', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    if (this.props.allCitiesQuery.loading) {
      return <Loader />;
    }
    return (
      <LocationWrapper>
        {this.props.allCitiesQuery.allCities.map((city, index) => (
          <Location onClick={e => this.handleClick(e, city.id)} key={city.id} value={city.id}>
            {city.name}
          </Location>
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

const changeCity = gql`
  mutation changeCity($repoFullName: String!) {
    changeCity(repoFullName: $repoFullName) {
      id
    }
  }
`;

export default graphql(LIST_CITIES, { name: 'allCitiesQuery' })(Locations);

const LocationWrapper = styled.section`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto 2rem auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${media.handheld`
    position: absolute;
    top: 0;
    left: 0;
    grid-template-columns: repeat(1, 1fr);
    font-size: 2rem;
    padding: 2rem 0;
    z-index: 10;
    background: ${transparentize(0.1, '#fff')};
  `};
`;

const Location = styled.button`
  color: #b8bfd3;
  text-align: center;
  padding: 1rem 0;
  &:hover {
    background: #efefef;
    cursor: pointer;
  }
  ${media.handheld`
    padding: 1.4rem 1rem 1.4rem 2rem;
    text-align: left;
    color: black;
  `};
`;

const Dropdown = styled.setion;
