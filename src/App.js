import React, { Component } from 'react';
// import InstagramEmbed from 'react-instagram-embed';
// import InstagramLoader from './components/InstagramEmbed';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import './App.css';
import MapboxMap from './components/Map';
import Backdrop from './components/Backdrop';
import laLocations from './data/LaLocations';
// import Locations from './components/Locations';

// Explore taken => https://www.instagram.com/p/BYmpLLggVWn/?taken-at=262123225

class App extends Component {
  // componentWillMount() {
  //   function loadInstagram() {
  //     if (!window.instgrm) {
  //       const s = document.createElement('script');
  //       console.log(s);
  //       s.async = s.defer = true;
  //       s.src = `https://platform.instagram.com/en_US/embeds.js`;
  //       s.id = 'react-instagram-embed-script';
  //       console.log(s.id);
  //       console.log(s.onload);
  //       // s.onload = this.onLoad;
  //       const body: HTMLElement | null = document.body;
  //       if (body) {
  //         body.appendChild(s);
  //       }
  //     }
  //     console.log(`Memes`);
  //   }
  //   loadInstagram();
  // }

  render() {
    // console.log(this);
    // console.log(this.state);
    // console.log(this.mapContainer);
    console.log();

    return (
      <div className="App">
        <Header>
          <Logo>Backdrop Finder</Logo>
          <h3>locating cool backdrops for your photos around your city.</h3>
        </Header>
        {/* <Locations /> */}
        <MapboxMap data={laLocations} />
        <Backdrops>{laLocations.map(instagramUrl => <Backdrop key={instagramUrl.id} instagramUrl={instagramUrl} />)}</Backdrops>
      </div>
    );
  }
}

export default App;

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
