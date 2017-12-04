import React from 'react';

class Logo extends React.Component {
  render() {
    console.log(this.props.color);
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 91.86 120.86">
        <g>
          <path
            stroke={this.props.color}
            fill={this.props.color}
            d="M45.94 120.86a3.34 3.34 0 0 1-2.56-1.28L7.92 71.65A45.9 45.9 0 1 1 84 20.22a45.48 45.48 0 0 1 0 51.27l-21.4 29.06a3.2 3.2 0 1 1-5.1-3.84l21.18-28.9A39.5 39.5 0 0 0 13 23.88 39.57 39.57 0 0 0 13 68l35.3 47.76a3.13 3.13 0 0 1-.64 4.48 2.4 2.4 0 0 1-1.75.64z"
          />
          <path
            stroke={this.props.color}
            fill={this.props.color}
            d="M45.94 67.66A21.57 21.57 0 0 1 24.37 46.1a21.3 21.3 0 0 1 21.4-21.4 21.54 21.54 0 0 1 21.57 21.4 21.54 21.54 0 0 1-21.4 21.56zm0-36.58A15.18 15.18 0 1 0 61 46.25a15 15 0 0 0-15.06-15.17z"
          />
        </g>
      </svg>
    );
  }
}

export default Logo;
