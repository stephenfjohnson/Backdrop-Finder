import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import instagram post viewer
import InstagramEmbed from 'react-instagram-embed';

class Tooltip extends Component {
  static propTypes = {
    features: PropTypes.array.isRequired
  };

  render() {
    const { features } = this.props;

    const renderFeature = (feature, i) => {
      return (
        <div key={i}>
          <strong className="mr3">{feature.layer['source-layer']}:</strong>
          <span className="color-gray-light">{feature.layer.id}</span>
        </div>
      );
    };

    return (
      <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom">
        <div className="flex-child px12 py12 bg-gray-dark color-white shadow-darken10 round txt-s w240 clip txt-truncate">
          <h4>Tooltip</h4>
          {/* <InstagramEmbed
            url={this.props.data[0].url}
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
          {features.map(renderFeature)}
        </div>
        <span className="flex-child color-gray-dark triangle triangle--d" />
      </div>
    );
  }
}

export default Tooltip;
