import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from './svgs/Logo';

export default class Loader extends Component {
  render() {
    return (
      <LoaderWrapper>
        <LogoWrapper>
          <Logo color="#eb717c" />
        </LogoWrapper>
      </LoaderWrapper>
    );
  }
}

const LogoWrapper = styled.div`
  width: 40px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
