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

// { index: 4, segments: [] }
const DATA_KEY = 'data';
const INDEX_KEY = 'index';
const SEGMENTS_KEY = 'segments';

// Gets all segments from the Store.
// Returns an array of Segment objects [{ name: 'mySeg', duration: '12:00'}]
export async function getSegments() {
  //deleteAllSegments(['index', 'data', 'segments']);
  try {
    return await AsyncStorage.getItem(DATA_KEY).then((data) => {
      console.log("data: " + data);
      if (data) {
        const d = JSON.parse(data);
        return d[SEGMENTS_KEY];
      }
      return [];
    });
  } catch(e) {
    console.log("getSegments() error:\n", e);
  }
}

// Adds a segment to the Store
// Returns nothing.
export async function addSegment(segment) {
  try {
    await AsyncStorage.getItem(DATA_KEY).then((data) => {
      if (data) {
        const d = JSON.parse(data);
        const segments = d[SEGMENTS_KEY];
        const index = d[INDEX_KEY];

        // update data
        segment[INDEX_KEY] = index + 1;
        d[INDEX_KEY] = index + 1;
        d[SEGMENTS_KEY] = [...segments, segment];

        return AsyncStorage.setItem(DATA_KEY, JSON.stringify(d));
      }
      else {
        var d = {};

        segment[INDEX_KEY] = 0;
        d[INDEX_KEY] = 0;
        d[SEGMENTS_KEY] = [segment];

        return AsyncStorage.setItem(DATA_KEY, JSON.stringify(d));
      }
    });
  } catch (e) {
    console.log("StoresError:\n", e)
  }
}

export async function deleteSegment(segment) {
  try {
    await AsyncStorage.getItem(DATA_KEY).then((data) => {
      if (data) {
        const d = JSON.parse(data);
        const segments = d[SEGMENTS_KEY];

        d[SEGMENTS_KEY] = arrayWithoutSegment(segments, segment);

        return AsyncStorage.setItem(DATA_KEY, JSON.stringify(d));
      }
    });
  } catch (e) {
    console.log("Error", e);
  }
}

function arrayWithoutSegment(array, segment) {
  var results = [];
  array.forEach((element) => {
    if (element.index != segment.index) {
      results.push(element);
    }
  });
  return results;
}

export async function deleteAllSegments(keys) {
  await AsyncStorage.multiRemove(keys);
}
