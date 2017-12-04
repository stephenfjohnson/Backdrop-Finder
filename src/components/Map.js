import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import styled from 'styled-components';

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
      zoom: 13,
      pitch: 30,
      bering: 0,
      tourIsPlaying: false,
      currentLocation: [-118.2387, 34.0485],
      value: 0,
      mapCenter: []
    };
  }

  playTour() {
    this.setState(prevState => ({
      tourIsPlaying: !prevState.tourIsPlaying
    }));
    console.log(this.state.tourIsPlaying);
  }

  componentWillReceiveProps() {
    const increment = 1;
    let up = true;
    let ceiling = this.props.data.backdrops.length;
    let value = 0;

    // -= 1 removes one from length

    function plusOne(value) {
      if (up === true && value <= ceiling) {
        value += increment;
        if (value === ceiling) {
          up = false;
          return value;
        } else {
          up = false;
          value -= increment;
          if (value === 0) {
            up = true;
            return value;
          }
        }
      }

      // this.setState({
      //   value: value
      // });
    }

    // map.flyTo({
    //   center: this.state.currentLocation,
    //   zoom: this.state.zoom,
    //   pitch: this.state.pitch,
    //   bering: this.state.bering,
    //   // This can be any easing function: it takes a number between
    //   // 0 and 1 and returns another number between 0 and 1.
    //   speed: 0.9, // make the flying slow
    //   curve: 1,
    //   easing: function(t) {
    //     return t;
    //   }
    // });

    setInterval(() => {
      console.log(`Ran Set Interval`);
      console.log();
      const { data } = this.props;
      console.log(data);
      plusOne(this.state.value);
      let theValueFormerlyKnownAsMemes = this.state.value;
      let intLng = Number(data.backdrops[theValueFormerlyKnownAsMemes].lng);
      let intLat = Number(data.backdrops[theValueFormerlyKnownAsMemes].lat);
      let cameraLocation = [intLng, intLat];
      console.log(cameraLocation);
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
      console.log(this.state);
    }, 4000);

    const { lng, lat, pitch, bering, zoom, tourIsPlaying } = this.state;
    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [lng, lat],
      zoom
    });

    map.on('load', () => {
      const { data } = this.props;
      console.log(`🚧 🚧 🚧 MAP ON LOAD DATA 🚧 🚧 🚧`);
      console.log(data);

      console.log(`🚧 🚧 🚧 STATE VALUE 🚧 🚧 🚧`);
      console.log(this.state.value);

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

        new mapboxgl.Marker(customMarker).setLngLat(markerLocation).addTo(map);

        // console.log(`🚧 🚧 🚧 ${item.title} 🚧 🚧 🚧`);
        // console.log(item);
        // console.log(customMarker);
        // console.log(item.instagramPhotoUrl);
        // console.log(`${item.instagramPhotoUrl}media/?size=t`);
        // console.log(markerLocation);
        // console.log(`🚧 🚧 🚧 ${item.title} Done 🚧 🚧 🚧`);

        customMarker.addEventListener('click', function() {
          window.alert(`Title: ${item.title} Lng: ${item.lng} Lat: ${item.lat}`);
        });
      }

      // Timing function sudo code
      //.I want the function to check if tourIsPlaying === false

      // If so the map center moves to the first lng lat in the list
      // Wait 4 seconds and check for second item in list to travel to
      // While traving dont

      // setTimeout(() => {
      //   const { zoom, pitch, bering } = this.state;
      //   if (this.state.tourIsPlaying === false) {
      //     map.flyTo({
      //       center: this.state.currentLocation,
      //       zoom: zoom,
      //       pitch: pitch,
      //       bering,
      //       // This can be any easing function: it takes a number between
      //       // 0 and 1 and returns another number between 0 and 1.
      //       speed: 0.9, // make the flying slow
      //       curve: 1,
      //       easing: function(t) {
      //         return t;
      //       }
      //     });
      //     let addOneToValue = this.state.value++;
      //     this.setState({
      //       value: addOneToValue
      //     });
      //     console.log(addOneToValue);
      //     console.log(this.state.value);
      //   } else {
      //     console.log(`Not running`);
      //   }
      // }, 4000);
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

  // componentWillReceiveProps() {
  //   if (this.state.tourIsPlaying) {
  //     setInterval(() => {
  //       // plusOne();
  //       // this.setState({
  //       //   value: value,
  //       //   currentLocation: [this.props.data.backdrops[value].lng, this.props.data.backdrops[value].lat]
  //       // });
  //       // console.log(`VALUE 👉 ${value}`);
  //       console.log(this.props.data.backdrops[this.state.value].title);
  //     }, 1000);
  //   }
  // }

  render() {
    const { data } = this.props;
    const { lng, lat, zoom, pitch, bering, tourIsPlaying } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`In: ${this.props.data.name} Longitude: ${this.state.currentLocation[0]} Latitude: ${this.state.currentLocation[1]} Zoom: ${zoom} Pitch: ${pitch} Bering: ${bering}`}</div>
        </div>
        <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
        <TourToggle onClick={() => this.playTour()}>{this.state.tourIsPlaying ? 'Play Tour' : 'Stop Tour'}</TourToggle>
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
