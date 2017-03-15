import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SegmentStore from '../stores/segmentStore';
import * as GlobalStyles from '../styles/global';


export default class Segments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      segments: []
    };

    // Get segments, callback of "setState" when done.
    SegmentStore.getSegments().then((s) => {
      this.setState({ segments: s })
    });

    this.buildSegments = this.buildSegments.bind(this);
    this.handleDeleteSegmentPressed = this.handleDeleteSegmentPressed.bind(this);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={GlobalStyles.TITLE}>Segments</Text>

        {this.buildSegments()}

        <TouchableOpacity onPress={() => this.props.navigator.push({
          name: 'SEGMENT_ROUTE', props: { title: 'New Segment'}})}>
            <Icon
              name='ios-add-circle-outline'
              size={50}
              color={GlobalStyles.BLACK}
            />
         </TouchableOpacity>

      </View>
    );
  }

  buildSegments() {
    return this.state.segments.map((segment) => {
      return (
        <View key={segment.index} style={[styles.segment]}>
          <TouchableOpacity>
            <Text>{segment.name} - {segment.duration}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleDeleteSegmentPressed(segment)}>
            <Icon
              name='ios-trash-outline'
              size={25}
              color={GlobalStyles.RED}/>
          </TouchableOpacity>
        </View>
      );
    });
  }

  handleDeleteSegmentPressed(segment) {
    SegmentStore.deleteSegment(segment);
  }

}

// - default flex direction is 'column'
// - the 'main' axis is the axis corresponding to the flex direction.
// - justifyContent moves items along the 'main' axis, alignItems moves
//   items along the cross axis.
const styles = StyleSheet.create({
  container: {
    alignItems: 'center' // flex is column so this moves along cross axis (X axis)
  },
  segment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200
  },
  debug: {
    borderWidth: 1,
    borderColor: 'green'
  }
});
