import React from 'react';
import { StyleSheet } from 'react-native';
import Nav from './components/nav';
import * as GlobalStyles from './styles/global';

export default () => {
  return <Nav style={styles.container}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: GlobalStyles.GRAY
  }
})
