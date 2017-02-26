import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SegmentStore from '../stores/segmentStore';
import * as GlobalStyles from '../styles/global';

export default ({ navigator }) => {
  SegmentStore.getSegments().then((segments) => {
    console.log(segments)
  });

  return(
    <View style={[styles.debug, styles.container]}>
      <TouchableOpacity>
          <Icon
            name='ios-add-circle-outline'
            size={50}
            color={GlobalStyles.LIGHT}/>
      </TouchableOpacity>
    </View>
  );
}

// - default flex direction is 'column'
// - the 'main' axis is the axis corresponding to the flex direction.
// - justifyContent moves items along the 'main' axis, alignItems moves
//   items along the cross axis.
const styles = StyleSheet.create({
  container: {
    alignItems: 'center' // flex is column so this moves along cross axis (X axis)
  },
  debug: {
    borderWidth: 1,
    borderColor: 'green'
  }
})
