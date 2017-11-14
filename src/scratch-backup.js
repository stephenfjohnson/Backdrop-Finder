// componentDidMount() {
//   const { lng, lat, zoom } = this.state;
//
//   const map = new mapboxgl.Map({
//     container: this.mapContainer,
//     style: 'mapbox://styles/mapbox/light-v9',
//     center: [lng, lat],
//     zoom
//   });
//
//   setTooltip();
//
//   // const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
//   //   offset: [-120, 0]
//   // })
//   //   .setLngLat([this.props.data[0].lng, this.props.data[0].lat])
//   //   .addTo(map);
//   //
//   // console.log(tooltip);
//
//   console.log(`Tooltip Container`);
//   console.log(this.tooltipContainer);
//
//   // const popup = new mapboxgl.Popup({ closeOnClick: false })
//   //   .setLngLat([this.props.data[0].lng, this.props.data[0].lat])
//   //   .setHTML(
//   //     <InstagramEmbed
//   //       url={this.props.data[0].url}
//   //       maxWidth={320}
//   //       hideCaption={false}
//   //       containerTagName="div"
//   //       protocol=""
//   //       onLoading={() => {}}
//   //       onSuccess={() => {}}
//   //       onAfterRender={() => {}}
//   //       onFailure={() => {}}
//   //     />
//   //   )
//   //   .addTo(map);
//
//   console.log(this.props.data[0].url);
//
//   map.on('move', () => {
//     const { lng, lat } = map.getCenter();
//
//     this.setState({
//       lng: lng.toFixed(4),
//       lat: lat.toFixed(4),
//       zoom: map.getZoom().toFixed(2)
//     });
//   });
// }

// try {
//   const res = await fetch('https://api.instagram.com/oembed/?url=http://instagr.am/p/fA9uwTtkSN/', { mode: 'cors' });
//   const instaData = await res;
//   console.log(instaData);
//   console.log(`SKRRRRT`);
//   //   this.setState({
//   //     instaData: instaData.results
//   //   });
// } catch (err) {
//   console.log(`🚧 🚧 🚧 🚧 Error Below`);
//   console.log(err);
// }

const laLocations = [
  {
    id: 1,
    title: 'First Instagram Location',
    description: 'Random filler text',
    url: 'https://www.instagram.com/p/BQhHPcujHDb/',
    camera: {
      center: [-118.2387, 34.0485],
      zoom: 12.21,
      pitch: 50
    }
  },
  {
    id: 1,
    title: 'First Instagram Location',
    description: 'Random filler text',
    url: 'https://www.instagram.com/p/BQhHPcujHDb/',
    camera: {
      center: [-118.2387, 34.0485],
      zoom: 12.21,
      pitch: 50
    }
  },
  {
    id: 2,
    url: 'https://www.instagram.com/p/BX3a29MF8Ig/'
  },
  {
    id: 3,
    url: 'https://www.instagram.com/p/BU0b5OYFvzL/'
  },
  {
    id: 4,
    url: 'https://www.instagram.com/p/57RqG-ksBd/'
  },
  {
    id: 5,
    url: 'https://www.instagram.com/p/iwt1g_r0aB/'
  },
  {
    id: 6,
    url: 'https://www.instagram.com/p/BbKa398BcJ1/'
  },
  {
    id: 7,
    url: 'https://www.instagram.com/p/BYmpLLggVWn/'
  },
  {
    id: 8,
    url: 'https://www.instagram.com/p/x2jc6Bmz8o/'
  },
  {
    id: 9,
    url: 'https://www.instagram.com/p/9exdGVspeP/'
  },
  {
    id: 10,
    url: 'https://www.instagram.com/p/3X5dyVFSlO/'
  }
];

export default laLocations;

map.on('load', () => {
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
