import React, { Component } from 'react';
import styled from 'styled-components';
// import InstagramEmbed from 'react-instagram-embed';

class Backdrop extends Component {
  // componentWillMount() {
  //   loadInstagram() {  // called from componentWillMount()
  //     if (!window.instgrm) {
  //       const s = document.createElement('script')
  //       s.async = s.defer = true
  //       s.src = `https://platform.instagram.com/en_US/embeds.js`
  //       s.id = 'react-instagram-embed-script'
  //       s.onload = this.onLoad
  //       const body: HTMLElement | null = document.body
  //       if (body) {
  //         body.appendChild(s)
  //       }
  //     }
  //   }
  // }

  render() {
    const { backdrop } = this.props;
    console.log(backdrop.instagramPhotoUrl);
    return (
      <BackdropCard>
        <BackdropImage href={backdrop.instagramPhotoUrl} />
        <BackdropDescription>{backdrop.description}</BackdropDescription>
      </BackdropCard>
    );
  }
}

export default Backdrop;

const BackdropCard = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 5px;
`;

const BackdropImage = styled.a`
  height: 160px;
  background: url(${props => props.href}media/?size=m) no-repeat;
  background-size: cover;
  border-radius: 5px;
  display: block;
`;

const BackdropDescription = styled.p`
  padding: 1rem;
  color: black;
`;
