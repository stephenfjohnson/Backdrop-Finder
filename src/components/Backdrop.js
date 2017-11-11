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
    const { instagramUrl } = this.props;
    console.log(this.props.instagramUrl.url);
    // console.log(instagramUrl.url);
    return (
      // <img src={`${url.url}media/?size=m`} alt="" />
      <BackdropImage href={instagramUrl.url} />
      // <InstagramEmbed url={url.url} maxWidth={320} hideCaption={false} containerTagName="div" protocol="" onLoading={() => {}} onSuccess={() => {}} onAfterRender={() => {}} onFailure={() => {}} />
    );
  }
}

export default Backdrop;

const BackdropImage = styled.a`
  height: 160px;
  background: url(${props => props.href}media/?size=m) no-repeat;
  background-size: cover;
  border-radius: 5px;
`;
