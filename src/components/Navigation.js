import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoSVG from './svgs/Logo.js';

class Navigation extends React.Component {
  render() {
    return (
      <Header>
        <Link to="/city/cjac8gnk83vjo01831fcrw0u6">
          <LogoWrapper>
            <Logo>
              <LogoSVG color="#eb717c" />
            </Logo>
            <LogoText>
              <h1>Backdrop Finder</h1>
              <h2>locating cool backdrops for your photos around your city.</h2>
            </LogoText>
          </LogoWrapper>
        </Link>
        {/* <Nav>
          <Link to="/add">
            <button>+ Add Backdrop</button>
          </Link>
        </Nav> */}
      </Header>
    );
  }
}

const Header = styled.header`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
`;

const LogoWrapper = styled.header`
  display: flex;
  flex: 2;
  justify-content: space-between;
  max-width: 1170px;
  width: 100%;
  margin: 2rem auto 2rem auto;
  padding: 0 2rem;
`;

const Logo = styled.div`
  flex: 0 40px;
  margin-right: 1rem;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  justify-content: center;
  h1 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.5em;
  }
  h2 {
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
`;

const Nav = styled.nav`
button {
  border-radius: 100px;
  border 2px solid rgba(0, 0, 0, 0.1);
  padding: 0.2rem 1rem;
}
`;

export default Navigation;
