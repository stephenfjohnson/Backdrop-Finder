import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from './Loader';

class CityButtons extends React.Component {
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

  componentDidMount() {
    console.log(this.props.allCitiesQuery);
  }

  handleClick(e) {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ sellectedCityId: value }, () => {
      console.log(`sellectedCityId: ${this.state.sellectedCityId}`);
    });
  }

  render() {
    if (this.props.allCitiesQuery.loading) {
      return <Loader />;
    }
    return (
      <Buttons>
        {this.props.allCitiesQuery.allCities.map((city, index) => (
          <button onClick={e => this.handleClick(e, city.id)} key={city.id} id={city.id} value={city.id}>
            {city.name}
          </button>
        ))}
      </Buttons>
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

export default graphql(LIST_CITIES, { name: 'allCitiesQuery' })(CityButtons);

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
  button {
    background: red;
    color: white;
    background: red;
    border-radius: 100px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 0.3rem 1rem;
    font-size: 0.7rem;
    text-align: center;
  }
`;
