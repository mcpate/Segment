import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Segments from './segments';

const SEGMENTS_ROUTE = {
  title: 'Segments',
  component: Segments
};

export default class Nav extends Component {
  render() {
    return (
      <Navigator
        initialRoute={SEGMENTS_ROUTE}
        renderScene={this.renderScene}
        {...this.props}
      />
    );
  }

  renderScene(route, navigator) {
    if (route === SEGMENTS_ROUTE) {
      return (
        <route.component
          {...route.props}
          navigator={navigator}
        />
      );
    }
  }
}
