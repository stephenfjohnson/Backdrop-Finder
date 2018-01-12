import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import styled from 'styled-components';
import { log } from 'async';

// Counter https://react.christmas/4

// Add Mapbox token TODO: send to config file
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w';

// Create map Component
class MapboxMap extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    // Set init map location as well as tour status
    this.state = {
      // data: data.backdrops,
      lng: 0,
      lat: 0,
      zoom: 13,
      pitch: 60,
      bering: 0,
      tourIsPlaying: false,
      currentLocation: [],
      value: 0,
      mapCenter: []
    };
  }

  componentDidMount() {
    console.log(`🚧 🚧 🚧 map.js componentDidMount 🚧 🚧 🚧`);
    this.fetchMap(this.props.data.id);
    // this.props.data.refetch();
    console.log(this.props.data);
    console.log(this.props);
  }

  componentWillReceiveProps() {
    console.log(`🚧 🚧 🚧 map.js componentWillReceiveProps 🚧 🚧 🚧`);
    console.log(this.props.data);
    // this.props.data.refetch();
    // this.fetchMap(this.props.data.id);
    this.updateMarkers('memes');
    this.fetchMap(this.props.data.id);
  }

  updateMarkers = async location => {
    console.log(location);
    // for (let item of data.backdrops) {
    //   let markerLocation = [Number(item.lng), Number(item.lat)];

    //   // Replace with JSX syntax
    //   let customMarker = document.createElement('div');
    //   customMarker.className = 'marker';
    //   customMarker.style.backgroundImage = `url(${item.instagramPhotoUrl}media/?size=t)`;

    //   let popup = new mapboxgl.Popup().setHTML(`<h2>${item.title}</h2><h3>${item.description}</h3>`);

    //   new mapboxgl.Marker(customMarker)
    //     .setLngLat(markerLocation)
    //     .setPopup(popup)
    //     .addTo(map);

    //   customMarker.addEventListener('click', () => {
    //     // customMarker.style.zIndex = '20';
    //     map.flyTo({
    //       center: markerLocation,
    //       zoom,
    //       pitch,
    //       bering,
    //       speed: 0.9, // make the flying slow
    //       curve: 1
    //     });
    //     console.log(`Title: ${item.title} Lng: ${item.lng} Lat: ${item.lat}`);
    //   });
    // }
  };

  fetchMap = async location => {
    console.log(`Location Stuff map.js`);
    await console.log(location);

    const { data } = await this.props;
    const { lng, lat, pitch, bering, zoom, tourIsPlaying, currentLocation, mapCenter } = await this.state;

    // console.log(`lng`);
    // console.log(lng);

    // console.log(`lat`);
    // console.log(lat);

    // console.log(`currentLocation`);
    // console.log(currentLocation);

    // console.log(`mapCenter`);
    // console.log(mapCenter);

    function valueSmoothing() {
      // Adverage location in map
      let lngArray = [];
      let latArray = [];
      for (let item of data.backdrops) {
        let intLng = Number(item.lng);
        let intLat = Number(item.lat);

        lngArray.push(intLng);
        latArray.push(intLat);
      }

      console.log(`lngArray`);
      console.log(lngArray);

      console.log(`latArray`);
      console.log(latArray);

      console.log(`0`);

      function average(value) {
        let values = value;
        let sum = values.reduce((previous, current) => (current += previous));
        let avg = sum / values.length;
        return avg;
      }

      console.log(`1`);

      let adverageLng = average(lngArray);
      let adverageLat = average(latArray);

      return [adverageLng, adverageLat];
    }

    // this.setState({
    //   mapCenter: valueSmoothing(lng, lat)
    // });

    console.log(`Center of the map you dumb shit`);
    console.log(valueSmoothing());
    // console.log(valueSmoothing(lat));

    // console.log(`Map Center array`);
    // console.log(mapCenter);

    this.tooltipContainer = document.createElement('div');

    console.log(`2`);

    const map = await new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: valueSmoothing(),
      pitch,
      zoom
    });

    map.on('load', () => {
      // Fixes weird 300px height bug
      map.resize();
      // This places all the locations on the map onload.
      for (let item of data.backdrops) {
        let markerLocation = [Number(item.lng), Number(item.lat)];

        // Replace with JSX syntax
        let customMarker = document.createElement('div');
        customMarker.className = 'marker';
        customMarker.style.backgroundImage = `url(${item.instagramPhotoUrl}media/?size=t)`;

        let popup = new mapboxgl.Popup().setHTML(`<h2>${item.title}</h2><h3>${item.description}</h3>`);

        new mapboxgl.Marker(customMarker)
          .setLngLat(markerLocation)
          .setPopup(popup)
          .addTo(map);

        customMarker.addEventListener('click', () => {
          // customMarker.style.zIndex = '20';
          map.flyTo({
            center: markerLocation,
            zoom,
            pitch,
            bering,
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
    // map.scrollZoom.disable();
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  };

  render() {
    const { data } = this.props;
    const { lng, lat, zoom, pitch, bering, tourIsPlaying } = this.state;

    return (
      <div>
        <div className="data-previewer inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`In: ${this.props.data.name} Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom} Pitch: ${pitch} Bering: ${bering}`}</div>
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
