import React, { Component } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

class Locations extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { isToggleOn: true };
  // }
  // flyLosAngeles() {
  //   handleChange = e => {
  //     e.preventDefault();
  //     console.log('The link was clicked.');
  //   };
  // }
  componentDidMount() {}

  flyLosAngeles = () => {
    const start = [-74.5, 40];
    const end = [74.5, 40];
    // depending on whether we're currently at point a or b, aim for
    // point a or b
    let target = isAtStart ? end : start;
    // and now we're at the opposite point
    isAtStart = !isAtStart;

    console.log('this is:', this);
    map.flyTo({
      // These options control the ending camera position: centered at
      // the target, at zoom level 9, and north up.
      center: target,
      zoom: 9,
      bearing: 0,

      // These options control the flight curve, making it move
      // slowly and zoom out almost completely before starting
      // to pan.
      speed: 0.2, // make the flying slow
      curve: 1, // change the speed at which it zooms out

      // This can be any easing function: it takes a number between
      // 0 and 1 and returns another number between 0 and 1.
      easing: function(t) {
        return t;
      }
    });
  };

  render() {
    return (
      <LocationWrapper>
        <Location onClick={this.flyLosAngeles}>Los Angeles</Location>
        {/* <Location onClick={flySeattle}>Seattle</Location>
        <Location onclick={flySanFrancisco}>San Francisco</Location>
        <Location onclick={flyNewYork}>New York</Location> */}
      </LocationWrapper>
    );
  }
}

export default Locations;

const LocationWrapper = styled.section`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto 2rem auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Location = styled.button`
  color: #b8bfd3;
  padding: 1rem;
  text-align: center;
  &:hover {
    background: #efefef;
    cursor: pointer;
  }
`;
