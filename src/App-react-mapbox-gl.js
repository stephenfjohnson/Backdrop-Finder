import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import InstagramEmbed from 'react-instagram-embed';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const Map = ReactMapboxGl({
      accessToken: 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w'
    });

    return (
      <div className="App">
        <Header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Backdrop Finder</h1>
        </Header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <InstagramEmbed
          url="https://instagr.am/p/Zw9o4/"
          maxWidth={320}
          hideCaption={false}
          containerTagName="div"
          protocol=""
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
        <Map style="mapbox://styles/mapbox/streets-v9">
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
      </div>
    );
  }
}

export default App;

const Header = styled.header`
  max-width: 1170px;
  width: 100%;
`;
