import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import styled from 'styled-components';

// Counter https://react.christmas/4

// Add Mapbox token TODO: send to config file
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w';

// Create map Component
class MapboxMap extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    console.log(`Backdrop Data`);
    console.log(data);
    // Set init map location as well as tour status
    this.state = {
      // data: data.backdrops,
      lng: -118.2387,
      lat: 34.0485,
      zoom: 11,
      pitch: 50,
      bering: 0,
      tourIsPlaying: false,
      currentLocation: [-118.32513622278702, 34.04802369917432],
      value: 0,
      mapCenter: []
    };
  }

  componentWillReceiveProps() {
    const { lng, lat, pitch, bering, zoom, tourIsPlaying } = this.state;
    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom
    });

    map.on('load', () => {
      const { data } = this.props;

      // This places all the locations on the map onload.
      for (let item of data.backdrops) {
        let intLng = Number(item.lng);
        let intLat = Number(item.lat);
        let markerLocation = [Number(item.lng), Number(item.lat)];

        let customMarker = document.createElement('div');
        customMarker.className = 'marker';
        customMarker.style.backgroundImage = `url(${item.instagramPhotoUrl}media/?size=t)`;

        customMarker.style.width = '50px';
        customMarker.style.height = '50px';

        let popup = new mapboxgl.Popup().setHTML(`<h2>${item.title}</h2><h3>${item.description}</h3>`);

        new mapboxgl.Marker(customMarker)
          .setLngLat(markerLocation)
          .setPopup(popup)
          .addTo(map);

        // console.log(`🚧 🚧 🚧 ${item.title} 🚧 🚧 🚧`);
        // console.log(item);
        // console.log(customMarker);
        // console.log(item.instagramPhotoUrl);
        // console.log(`${item.instagramPhotoUrl}media/?size=t`);
        // console.log(markerLocation);
        // console.log(`🚧 🚧 🚧 ${item.title} Done 🚧 🚧 🚧`);

        // let customPopup = document.createElement('div');
        // customPopup.className = 'marker';
        // customPopup.style.width = '200px';
        // customPopup.style.height = '200px';
        // new mapboxgl.Popup(customPopup).setLngLat(markerLocation).addTo(map);

        customMarker.addEventListener('click', function() {
          map.flyTo({
            center: markerLocation,
            zoom,
            pitch,
            bering,
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            speed: 0.9, // make the flying slow
            curve: 1
          });
          console.log(`Title: ${item.title} Lng: ${item.lng} Lat: ${item.lat}`);
        });
      }
    });

    map.on('moveend', () => {
      console.log(`🚧 🚧 🚧 Center Here 🚧 🚧 🚧`);
      const center = map.getCenter();
      this.setState({
        mapCenter: [center.lng, center.lat]
      });
      console.log(this.state.mapCenter);
    });

    // disable map zoom when using scroll
    map.scrollZoom.disable(); // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  }

  render() {
    const { data } = this.props;
    const { lng, lat, zoom, pitch, bering, tourIsPlaying } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`In: ${this.props.data.name} Longitude: ${this.state.currentLocation[0]} Latitude: ${this.state.currentLocation[1]} Zoom: ${zoom} Pitch: ${pitch} Bering: ${bering}`}</div>
        </div>
        <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
      </div>
    );
  }
}

export default MapboxMap;

const LocationThumbnail = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background: red;
`;

const TourToggle = styled.button`
  position: relative;
  top: 3rem;
  left: 1rem;
`;
