import React from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components'
// import MapboxGeocoder from 'mapbox-gl-geocoder';

// Counter https://react.christmas/4

// Add Mapbox token TODO: send to config file
// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w';

// Create map Component
class MapboxMap extends React.Component {
  constructor(props) {
    super(props);
    // const { data } = this.props;

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
    console.log(this.props.data);
    console.log();

    if (this.props.data.backdrops.length !== 0) {
      this.fetchMap(this.props.data.id);
    }
    else {
      console.log(`No Locations`);
    }
    // this.props.data.refetch();
  }

  componentWillReceiveProps() {
    console.log(`🚧 🚧 🚧 map.js componentWillReceiveProps 🚧 🚧 🚧`);
    console.log(this.props.data);
    // this.updateMarkers('memes');
    if (this.props.data.backdrops.length !== 0) {
      this.fetchMap(this.props.data.id);
    }
    else {
      console.log(`No Locations`);
    }
  }

  fetchMap = async location => {
    console.log(`Location Stuff map.js`);
    await console.log(location);

    const { data } = await this.props;
    const { pitch, bering, zoom } = await this.state;

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

      function average(value) {
        let values = value;
        let sum = values.reduce((previous, current) => (current += previous));
        let avg = sum / values.length;
        return avg;
      }

      let adverageLng = average(lngArray);
      let adverageLat = average(latArray);

      return [adverageLng, adverageLat];
    }

    this.tooltipContainer = document.createElement('div');

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
        let customMarkerDot = document.createElement('div');
        customMarker.className = 'marker';
        customMarkerDot.className = 'marker-dot';
        customMarker.style.backgroundImage = `url(${item.instagramPhotoUrl}media/?size=t)`;

        let popup = new mapboxgl.Popup().setHTML(`<h2>${item.title}</h2><h3>${item.description}</h3>`);

        new mapboxgl.Marker(customMarker)
          .setLngLat(markerLocation)
          .setPopup(popup)
          .addTo(map);

        new mapboxgl.Marker(customMarkerDot)
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
    // const { data } = this.props;
    const { lng, lat, zoom, pitch, bering } = this.state;

    console.log(`this.props.data.backdrops`);
    console.log(this.props.data.backdrops);


    if (this.props.data.backdrops.length === 0) {
      return (
        <NoLocation>
          <h1>Sorry no locations here yet 🤷🏼‍♂️</h1>
        </NoLocation>
      );
    } else {
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
}

export default MapboxMap;

const NoLocation = styled.div`
height: 100vh;
display: flex;
align-items: center;
  justify-content: center;
`
