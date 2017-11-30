import React, { Component } from 'react';
import styled from 'styled-components';
// import InstagramEmbed from 'react-instagram-embed';

class Backdrop extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data: data.backdrops
    };
  }
  render() {
    const { data } = this.state;
    console.log(`Backdrop Data`);
    console.log(data);
    return (
      <BackdropWrapper>
        {data.map((backdrop, index) => (
          <BackdropCard key={backdrop.id}>
            <Image href={backdrop.instagramPhotoUrl} />
            <Title>{backdrop.title}</Title>
            <Description>
              <i>{backdrop.description}</i>
            </Description>
            <Directions href={`http://maps.apple.com/?daddr=?ll=${backdrop.lat},${backdrop.lng}`}>📍 Get Directions</Directions>
          </BackdropCard>
        ))}
      </BackdropWrapper>
    );
  }
}

export default Backdrop;

const BackdropWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: grid;
  padding: 2rem 0;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2rem;
`;

const BackdropCard = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const backgroundSize = 'media/?size=m';
const Image = styled.a`
  height: 160px;
  background: url(${props => props.href}${backgroundSize}) no-repeat;
  background-size: cover;
  border-radius: 5px;
  display: block;
`;

const Title = styled.h3`
  padding: 1rem 1rem 0 1rem;
  color: #222328;
  font-weight: 500;
`;

const Description = styled.p`
  font-family: 'Crimson Text', serif;
  font-style: italicized;
  font-size: 1.1rem;
  padding: 0 1rem 0 1rem;
  color: #b8bfd3;
`;

const Directions = styled.a`
  background: #efefef;
  color: #b8bfd3;
  padding: 0.5rem 1rem;
  margin: 1rem 0.5rem;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
