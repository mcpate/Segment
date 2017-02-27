import React from 'react';
import { AsyncStorage } from 'react-native';
import store from 'react-native-simple-store';

// Some convenience functions for working with AsyncStorage and Segments.
// Notes:
// - It seems I needed to use await so that I could do 'then', otherwise
//   I was calling then on 'undefined'. I could have avoided this by
//   passing up the promise but then other classes would need to know how
//   to manipulate what the Store passes back.
// - In order to use 'await' I had to add async to the function def.
// - I then needed to make sure to return what I was 'await'ing otherwise I
//   was returning nothing (even with the return statements inside the then())
// - The backing store requires strings so we're using JSON to parse/stringify

const SEGMENTS_KEY = 'segments';

// Gets all segments from the Store.
// Returns an array of Segment objects [{ name: 'mySeg', duration: '12:00'}]
export async function getSegments() {
  try {
    return await AsyncStorage.getItem(SEGMENTS_KEY).then((segments) => {
      if (segments) {
        return JSON.parse(segments);
      }
      return [];
    });
  } catch(e) {
    console.log("StoresError:\n", e);
  }
}

// Adds a segment to the Store
// Returns nothing.
export async function addSegment(segment) {
  try {
    await AsyncStorage.getItem(SEGMENTS_KEY).then((segments) => {
      if (segments) {
        const segmentsArray = JSON.parse(segments);
        return AsyncStorage.setItem(
          SEGMENTS_KEY,
          JSON.stringify([...segmentsArray, segment])
        );
      }
      return AsyncStorage.setItem(SEGMENTS_KEY, JSON.stringify(segment));
    });
  } catch (e) {
    console.log("StoresError:\n", e)
  }
}
