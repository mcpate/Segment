import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as SegmentStore from '../stores/segmentStore';
import * as GlobalStyles from '../styles/global';


const DURATION_REGEX = /^[0-9][0-9]\:[0-9][0-9]$/;

export default class Segment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      duration: ''
    };

    this.handleSavePressed = this.handleSavePressed.bind(this);
    this.handleCancelPressed = this.handleCancelPressed.bind(this);
  }

  render() {
    return (
      <View style={[styles.debug1, styles.container]}>
        <Text style={GlobalStyles.TITLE}>{this.props.title}</Text>

        <View style={[styles.debug2]}>
          <Text>Name:</Text>
          <TextInput
            style={[styles.debug2, styles.input]}
            autoCorrect={false}
            keyboardType='default'
            onChangeText={(text) => this.setState({ name: text })}
          />

          <Text>Duration:</Text>
          <TextInput
            style={[styles.debug2, styles.input]}
            autoCorrect={false}
            keyboardType='default'
            onChangeText={(text) => this.setState({ duration: text })}
          />

          <Text>Alert:</Text>
          <Text>Default</Text>
        </View>

        <View style={[styles.debug3, styles.buttonContainer]}>
          <TouchableOpacity onPress={this.handleSavePressed}>
            <Text>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleCancelPressed}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  handleSavePressed() {
    // error, duration not in right format
    if (!DURATION_REGEX.test(this.state.duration)) {
      alert("Duration is not in the correct format (mm:ss)! Please correct and try again.");
    } else {
      SegmentStore.addSegment({
        name: this.state.name,
        duration: this.state.duration
      });

      this.props.navigator.pop();
    }
  }

  handleCancelPressed() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  debug1: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  debug2: {
    borderWidth: 1,
    borderColor: 'red'
  },
  debug3: {
    borderWidth: 1,
    borderColor: 'brown'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    height: 20,
    borderWidth: 1,
    borderRadius: 5
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});
