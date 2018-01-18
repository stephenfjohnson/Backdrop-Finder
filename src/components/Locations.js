import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter, Match, Location, History } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from './Loader';

class Locations extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
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
    const { match, location, history } = this.props;
    if (this.props.allCitiesQuery.loading) {
      return <Loader />;
    }

    console.log(`Location Props`);

    console.log(this.props);

    console.log(location.pathname);

    if (location.pathname === '/') {
      return (
        <HomepageLocationWrapper>
          {this.props.allCitiesQuery.allCities.map((city, index) => (
            <HomepageLinkWrapper to={`/city/${city.id}`} key={city.id}>
              <LocationImage photo={city.photo} />
              <LocationLink value={city.id}>{city.name}</LocationLink>
            </HomepageLinkWrapper>
          ))}
        </HomepageLocationWrapper>
      );
    } else {
      return (
        <LocationWrapper>
          {this.props.allCitiesQuery.allCities.map((city, index) => (
            <Link to={`/city/${city.id}`} key={city.id}>
              <LocationLink value={city.id}>{city.name}</LocationLink>
            </Link>
          ))}
        </LocationWrapper>
      );
    }
  }
}

const LIST_CITIES = gql`
  query allCitiesQuery {
    allCities(orderBy: id_DESC) {
      id
      name
      photo
    }
  }
`;

const LocationsWithRouter = withRouter(Locations)



export default graphql(LIST_CITIES, { name: 'allCitiesQuery' })(LocationsWithRouter);

const HomepageLocationWrapper = styled.section`
height: 100vh;
width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow-x: hidden;
  z-index: 100;
  position: absolute;
`;

const HomepageLinkWrapper = styled(Link) `
display: flex;
flex-direction: column;
`

const LocationWrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow-x: hidden;
  z-index: 100;
  position: absolute;
`;

const backgroundSize = 'media/?size=l';
const LocationImage = styled.div`
width: 100%;
 background: url(${props => props.photo}${backgroundSize}) no-repeat center center; 
  background-size: cover;
      flex: 2;
`

const LocationLink = styled.button`
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
