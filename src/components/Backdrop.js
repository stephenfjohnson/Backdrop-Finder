import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from './svgs/Logo';
import Instagram from './svgs/Instagram';
// import InstagramEmbed from 'react-instagram-embed';

class Backdrop extends Component {
  // constructor(props) {
  //   super(props);
  //   const { data } = this.props;
  //   this.state = {
  //     data: data.backdrops
  //   };
  // }
  render() {
    const { backdrop } = this.props;
    return (
      <BackdropCard photo={backdrop.instagramPhotoUrl}>
        <UrlWrapper>
          <Url target="_blank" href={`http://maps.google.com/maps?daddr=${backdrop.address}`}>
            <Logo color="white" />
          </Url>
          <Url target="_blank" href={backdrop.instagramPhotoUrl}>
            <Instagram color="white" />
          </Url>
        </UrlWrapper>
        <Title>{backdrop.title}</Title>
      </BackdropCard>
    );
  }
}

export default Backdrop;

const backgroundSize = 'media/?size=m';
const BackdropCard = styled.div`
  background: url(${props => props.photo}${backgroundSize}) no-repeat;
  background-size: cover;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  min-width: 180px;
  min-height: 200px;
  margin: 0 0.5rem 1rem 0.5rem;
  position: relative;
  padding: 0.5rem;
  box-shadow: 10px 10px 10px #0000001a;
  &::after {
    display: block;
    content: '';
    background-image: radial-gradient(50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
  }
`;

const UrlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-content: space-between;
  justify-content: space-between;
`;

const Title = styled.h3`
  color: #222328;
  font-weight: 700;
  color: white;
  z-index: 1;
`;

const Url = styled.a`
  width: 20px;
  z-index: 1;
`;
