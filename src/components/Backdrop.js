import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from './svgs/Logo';
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
    // const { data } = this.state;
    // console.log(`Backdrop Data`);
    // console.log(`Backdrop Props`);
    // console.log(this.props);
    return (
      <BackdropCard>
        <Image href={backdrop.instagramPhotoUrl} />
        <Title>{backdrop.title}</Title>
        <Description>
          <i>{backdrop.description}</i>
        </Description>
        <Directions href={`http://maps.apple.com/?daddr=?ll=${backdrop.lat},${backdrop.lng}`}>
          <span className="logo-wrap">
            <Logo color="white" />
          </span>
          <span>Get Directions</span>
        </Directions>
      </BackdropCard>
    );
  }
}

export default Backdrop;

const BackdropCard = styled.div`
  border: 1px solid #f5f5f5;
  border: 1px solid #4a485a;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const backgroundSize = 'media/?size=m';
const Image = styled.a`
  ${'' /* height: 160px; */} width: 100%;
  background: url(${props => props.href}${backgroundSize}) no-repeat;
  background-size: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: block;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Title = styled.h3`
  padding: 1rem 1rem 0 1rem;
  color: #222328;
  color: white;
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
  background: #eb717c;
  color: #b8bfd3;
  color: white;
  padding: 0.5rem 1rem;
  margin: 1rem;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
  span {
    flex: 1;
    justify-content: center;
  }
  span.logo-wrap {
    flex: 0 13px;
    margin-right: 0.8rem;
  }
`;
