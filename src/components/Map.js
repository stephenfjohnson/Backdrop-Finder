import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
// import Tooltip from './Tooltip';

// import InstagramEmbed from 'react-instagram-embed';

// Add Mapbox token TODO: send to config file
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w';

// Create map Component
class MapboxMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -118.2387,
      lat: 34.0485,
      zoom: 13,
      tourIsPlaying: true,
      isToggleOn: true
    };

    // This binding is nessary to make `this` work in the callback
    this.playTour = this.playTour.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  playTour() {
    this.setState(prevState => ({
      tourIsPlaying: !prevState.tourIsPlaying
    }));
  }

  handleClick() {
    this.setState({
      tourIsPlaying: false
    });
    console.log(this.state.tourIsPlaying);
  }

  componentDidMount() {
    const { data } = this.props;
    console.log(data[0].camera.center[0]);

    this.setState = {
      lng: data[0].camera.center[0],
      lat: data[0].camera.center[1]
    };

    const { lng, lat, zoom } = this.state;
    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom
    });

    map.on('load', () => {
      // map.addLayer({
      //   id: 'highlight'
      // });
      // Add a layer showing the places.
      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  description: '<strong>This is an instagram post!!</strong><p>Random description</p><img src="" />',
                  icon: 'art-gallery'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [lng, lat]
                }
              },
              {
                type: 'Feature',
                properties: {
                  description: '<strong>This is an instagram post!!</strong><p>Random description</p>',
                  icon: 'art-gallery'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [-118.2346, 34.0601]
                }
              },
              {
                type: 'Feature',
                properties: {
                  description: '<strong>This is an instagram post!!</strong><p>Random description</p>',
                  icon: 'art-gallery'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [-118.2258, 34.0451]
                }
              }
            ]
          }
        },
        layout: {
          'icon-image': '{icon}-15',
          'icon-allow-overlap': true
        }
      });
    });

    // map.flyTo({ center: [-118.2346, 34.0601], zoom: 9 });

    // Create Popup with tooltip
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true
    });

    map.on('click', 'places', e => {
      map.getCanvas().style.cursor = 'pointer';
      map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 14 });

      popup
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(e.features[0].properties.description)
        .addTo(map);
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <MapContainer>
          <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          </div>
          <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
        </MapContainer>
        <button onClick={this.playTour}>{this.state.tourIsPlaying ? 'ON' : 'OFF'}</button>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default MapboxMap;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1170px;
  height: 600px;
  margin: 0 auto;
`;
