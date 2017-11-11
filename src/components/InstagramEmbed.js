import React, { Component } from 'react';

import InstagramEmbed from 'react-instagram-embed';

type Props = {
  url?: string
};
type State = {
  isLoaded: boolean
};

export default class InstagramLoader extends Component<Props, State> {
  static defaultProps = {};
  onLoad: Function;
  loadInstagram: Function;
  constructor() {
    super();

    this.onLoad = this.onLoad.bind(this);
    this.loadInstagram = this.loadInstagram.bind(this);
  }
  state = {
    isLoaded: false
  };
  componentWillMount() {
    this.loadInstagram();
  }
  loadInstagram() {
    if (!window.instgrm) {
      const s = document.createElement('script');
      s.async = s.defer = true;
      s.src = `https://platform.instagram.com/en_US/embeds.js`;
      s.id = 'react-instagram-embed-script';
      s.onload = this.onLoad;
      const body: HTMLElement | null = document.body;
      if (body) {
        body.appendChild(s);
      }
    }
  }
  onLoad() {
    console.log('Loaded instagram');
    this.setState({
      isLoaded: true
    });
  }
  render() {
    const { url = '' } = this.props;
    const { isLoaded } = this.state;

    const css = {
      outer: {},
      blank: {
        padding: 12
      }
    };

    return <div style={css.outer}>{url.length > 0 && isLoaded ? <InstagramEmbed url={url} hideCaption /> : <div style={css.blank}>Instagram URL not provided</div>}</div>;
  }
}
