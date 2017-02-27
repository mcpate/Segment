import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Segments from './segments';
import Segment from './segment';


const ROUTES = {
  'SEGMENTS_ROUTE': {
    component: Segments
  },
  'SEGMENT_ROUTE': {
    component: Segment
  }
};

export default class Nav extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'SEGMENTS_ROUTE' }}
        renderScene={this.renderScene}
        {...this.props}
      />
    );
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name].component;
    return (
      <Component
        {...route.props}
        navigator={navigator}
      />
    );
  }
}
