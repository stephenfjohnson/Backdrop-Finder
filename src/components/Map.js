import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import styled from 'styled-components';
// import Tooltip from './Tooltip';

// import InstagramEmbed from 'react-instagram-embed';

// Add Mapbox token TODO: send to config file

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Create map Component
class MapboxMap extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    console.log(`Backdrop Data`);
    console.log(data.name);
    console.log(data.backdrops);
    // Set init map location as well as tour status
    this.state = {
      data: data.backdrops,
      lng: -118.2387,
      lat: 34.0485,
      zoom: 13,
      pitch: 30,
      bering: 0,
      tourIsPlaying: true,
      currentLocation: [-118.2387, 34.0485],
      value: 0,
      mapCenter: []
    };
  }

  playTour() {
    this.setState(prevState => ({
      tourIsPlaying: !prevState.tourIsPlaying
    }));
  }

  componentDidMount() {
    console.log(this.props);
    const { data } = this.state;
    // console.log(`Component Did Mount Data`);
    // console.log(data);
    // console.log(`State Data `);
    // console.log(this.state.data);

    const increment = 1;
    let up = true;
    let ceiling = 1;
    // let ceiling = data.length;
    let value = 0;

    // -= 1 removes one from length

    function plusOne() {
      if (up === true && value <= ceiling) {
        value += increment;
        return value;
        if (value === ceiling) {
          up = false;
          return value;
        } else {
          console.log(`Memes 1`);
        }
      } else {
        up = false;
        value -= increment;
        if (value === 0) {
          up = true;
          return value;
        } else {
          console.log(`Memes 2`);
        }
      }
    }

    setInterval(() => {
      plusOne();
      let memes = this.state.value;
      let intLng = Number(data[memes].lng);
      let intLat = Number(data[memes].lat);
      let cameraLocation = [intLng, intLat];
      let randomBearing = Math.floor(Math.random() * 201) - 100;
      // let randomPitch = Math.floor(Math.random() * 41) - 20;
      let randomPitch = 30;
      // let randomZoom = Math.floor(Math.random() * 21) - 10;
      let randomZoom = 13;
      this.setState({
        value: value,
        currentLocation: cameraLocation,
        bering: randomBearing,
        pitch: randomPitch,
        zoom: randomZoom
      });
    }, 4000);

    const { lng, lat, zoom, tourIsPlaying } = this.state;
    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN
      })
    );

    // const geocoder = new MapboxGeocoder({
    //   accessToken: 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w'
    // });
    //
    // window.geocoder = geocoder;

    // map.once('moveend', () => {
    //   let index = 0;
    //   // Duration the slide is on screen after interaction
    //   window.setTimeout(() => {
    //     // Increment index
    //
    //     index = index + 1 === locations.length ? 0 : index + 1;
    //     console.log(index);
    //     playback(index);
    //   }, 3000); // After callback, show the location for 3 seconds.
    // });

    map.on('load', () => {
      const { data } = this.state;
      console.log(data);
      for (let item of data) {
        let intLng = Number(item.lng);
        let intLat = Number(item.lat);
        let markerLocation = [Number(item.lng), Number(item.lat)];

        let customMarker = document.createElement('div');
        customMarker.className = 'marker';
        customMarker.style.backgroundImage = `url(${item.instagramPhotoUrl}media/?size=t)`;

        customMarker.style.width = '50px';
        customMarker.style.height = '50px';

        new mapboxgl.Marker(customMarker).setLngLat(markerLocation).addTo(map);

        console.log(`🚧 🚧 🚧 ${item.title} 🚧 🚧 🚧`);
        console.log(item);
        console.log(customMarker);
        console.log(item.instagramPhotoUrl);
        console.log(`${item.instagramPhotoUrl}media/?size=t`);
        console.log(markerLocation);
        console.log(`🚧 🚧 🚧 ${item.title} Done 🚧 🚧 🚧`);

        customMarker.addEventListener('click', function() {
          window.alert(item.title);
        });
      }

      setInterval(() => {
        const { zoom, pitch, bering } = this.state;
        if (this.state.tourIsPlaying === false) {
          map.flyTo({
            center: this.state.currentLocation,
            zoom: zoom,
            pitch: pitch,
            bering,
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            speed: 0.9, // make the flying slow
            curve: 1,
            easing: function(t) {
              return t;
            }
          });
        } else {
          console.log(`Not running`);
        }
      }, 4000);
    });

    map.on('moveend', () => {
      console.log(`🚧 🚧 🚧 Center Here 🚧 🚧 🚧`);
      const center = map.getCenter();
      this.setState({
        mapCenter: [center.lng, center.lat]
      });
      console.log(this.state.mapCenter);
    });

    // // Create Popup with tooltip
    // const popup = new mapboxgl.Popup({
    //   closeButton: true,
    //   closeOnClick: true
    // });
    //
    // map.on('click', 'places', e => {
    //   map.getCanvas().style.cursor = 'pointer';
    //   map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 14 });
    //
    //   popup
    //     .setLngLat(e.features[0].geometry.coordinates)
    //     .setHTML(e.features[0].properties.description)
    //     .addTo(map);
    // });

    // disable map zoom when using scroll
    map.scrollZoom.disable(); // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  }

  render() {
    const { data } = this.props;
    console.log(`Map Data`);
    console.log(data);
    const { lng, lat, zoom, pitch, bering } = this.state;
    return (
      <div>
        <MapContainer>
          <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${this.state.currentLocation[0]} Latitude: ${this.state.currentLocation[1]} Zoom: ${zoom} Pitch: ${pitch} Bering: ${bering}`}</div>
          </div>
          <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
        </MapContainer>
        <button onClick={() => this.playTour()}>{this.state.tourIsPlaying ? 'Play Tour' : 'Stop Tour'}</button>
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

const LocationThumbnail = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background: red;
`;
