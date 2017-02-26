import React from 'react';
import Store from 'react-native-simple-store';

const SEGMENTS = 'segments';

export function getSegments() {
  return Store.get(SEGMENTS);
}
