import React from 'react';
import styled from 'styled-components';
import CityButtons from './CityButtons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3RlcGhlbmZqb2huc29uIiwiYSI6ImNqOWt4NmdyaTRkdXEzM2xzejhwMThiZnQifQ.7CZRuejXYOHFrHA_IF3u7w';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

class CreateBackdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Abbot's Habit",
      description: 'Ice cream for breakfast 🍦',
      instagramPhotoUrl: 'https://www.instagram.com/p/BbKa398BcJ1/',
      address: '7104 W Kidd Island Rd, Coeur D Alene, Idaho 83814, United States',
      mapCenter: [],
      lng: '',
      lat: '',
      sellectedCityId: 'cjac8gtvv3vjv0183grcl7ag6'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBackdrop = this.handleBackdrop.bind(this);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-118.2387, 34.0485],
      zoom: 6
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN
      })
    );

    map.on('moveend', () => {
      console.log(`🚧 🚧 🚧 Center Here 🚧 🚧 🚧`);
      const center = map.getCenter();
      let lng = center.lng.toString();
      let lat = center.lat.toString();

      let addressValue = document.querySelector(".mapboxgl-ctrl-geocoder input[type='text']").value;
      this.setState({
        mapCenter: [center.lng, center.lat],
        address: addressValue,
        lng: lng,
        lat: lat
      });
      console.log(this.state.mapCenter);
    });
    // disable map zoom when using scroll
    map.scrollZoom.disable();
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(`Change`);
  }

  handleBackdrop = async e => {
    await e.preventDefault();
    const { title, description, instagramPhotoUrl, address, lng, lat, sellectedCityId } = this.state;
    await this.props.createBackdropMutation({ variables: { title, description, instagramPhotoUrl, address, lng, lat, sellectedCityId } });
    await console.log(`Sent Backdrop to DB`);
    // debugger;
    // e.preventDefault;
    // await e.preventDefault;
  };

  render() {
    const { title, description, instagramPhotoUrl, address, mapCenter, lat, lng, sellectedCityId } = this.state;
    return (
      <Wrapper>
        <h3>Submit a new location and become a hunter!</h3>
        <Line />
        <Form>
          <Sample>
            <Photo href={instagramPhotoUrl} />
            <TitleStyle>{title}</TitleStyle>
            <DescriptionStyle>
              <i>{description}</i>
            </DescriptionStyle>
            <p>{sellectedCityId}</p>
            <p>{mapCenter}</p>
            <p>{address}</p>
            <p>
              {lng} - {lat}
            </p>
          </Sample>
          <Input>
            <label htmlFor="title">Title Of Post</label>
            <input type="text" name="title" value={title} placeholder="Location Title" onChange={this.handleInputChange} autoFocus required />
            <label htmlFor="title">Instagram Photo Url</label>
            <input type="text" name="instagramPhotoUrl" value={instagramPhotoUrl} placeholder="Instagram Photo Link" onChange={this.handleInputChange} required />
            <label htmlFor="title">Your description of the backdrop</label>
            <input type="text" name="description" value={description} placeholder="Location Description" onChange={this.handleInputChange} required />
            <label htmlFor="address">Location of Backdrop</label>
            <input type="text" name="address" value={address} placeholder="123 Main St. Seattle WA" onChange={this.handleInputChange} required />
            <CityButtons />
            <Button onClick={this.handleBackdrop}>Submit Backdrop</Button>
          </Input>
        </Form>
        <MapContainer>
          <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
        </MapContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  max-width: 850px;
  width: 100%;
  margin: 4rem auto;
  h3 {
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #343e5c;
  }
`;

const Line = styled.div`
  margin: 1rem 0;
  height: 1px;
  background: #f0f2f7;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 1rem;
  margin-bottom: 2rem;
`;

const Sample = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e7ebf2;
  padding: 2rem;
  border-radius: 5px;
`;

const backgroundSize = 'media/?size=l';
const Photo = styled.div`
  background: url(${props => props.href}${backgroundSize}) no-repeat;
  background-size: cover;
  flex: 2 100%;
  border-radius: 5px;
`;

const TitleStyle = styled.h3`
  flex: 1;
  padding: 1rem 1rem 0 1rem;
  color: #222328;
  font-weight: 500;
`;

const DescriptionStyle = styled.p`
  flex: 1;
  font-family: 'Crimson Text', serif;
  font-style: italicized;
  font-size: 1.1rem;
  padding: 0 1rem;
  color: #b8bfd3;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  label {
    padding-left: 1rem;
    font-size: 12px;
    color: #a1a6bb;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  input {
    background: #fff;
    border: 1px solid #e7ebf2;
    border-radius: 100px;
    padding: 0.5rem 1rem;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0;
    margin-bottom: 1.5rem;
    transition: box-shadow 0.3s ease-in-out;
    transition: background 0.3s ease-in-out;
    &::placeholder {
      color: #3a405b;
    }
    &:hover {
      /* Input Field: */
      background: #ffffff;
      border: 1px solid #e7ebf2;
      box-shadow: 0 10px 25px 0 rgba(58, 64, 91, 0.15);
      border-radius: 100px;
    }
    &:focus {
      background: white;
    }
  }
`;

const Button = styled.button`
  background: #3b55e6;
  border-radius: 100px;
  color: #ffffff;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  text-align: center;
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1170px;
  height: 300px;
  margin: 0 auto;
`;

const CREATE_BACKDROP_MUTATION = gql`
  mutation CreateBackdropMutation($title: String!, $description: String!, $instagramPhotoUrl: String!, $address: String!, $lng: String!, $lat: String!, $sellectedCityId: ID) {
    createBackdrop(title: $title, description: $description, instagramPhotoUrl: $instagramPhotoUrl, address: $address, lng: $lng, lat: $lat, cityId: $sellectedCityId) {
      id
      title
      description
      instagramPhotoUrl
      address
      lng
      lat
      city {
        id
      }
    }
  }
`;

const CreateBackdropWithMutation = graphql(CREATE_BACKDROP_MUTATION, { name: 'createBackdropMutation' })(CreateBackdrop);
export default CreateBackdropWithMutation;
