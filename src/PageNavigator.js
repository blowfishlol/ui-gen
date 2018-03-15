import React, { Component } from 'react';

import App from './ui-component/App';

export default class PageNavigator extends Component {
  render() {
    return <App config={this.props.config} />
  }
}
