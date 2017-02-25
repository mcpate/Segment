import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Home from './home';

const HOME_ROUTE = {
  title: 'Home',
  comonent: Home
};

export default class Navigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={HOME_ROUTE}
        renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    if (route === INTRO_ROUTE) {
      return (
        <route.component
          {...route.props}
          navigator={navigator}
        />
      );
    }
  }
}
