import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Pulse from 'react-native-pulse';

export default class NodeUp extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pulse
          color="#62DBFB"
          numPulses={4}
          diameter={400}
          speed={50}
          duration={2000}
        />
        <Text
          style={{ fontSize: 22, fontFamily: 'TimeBurner', color: 'white' }}
        >
          {' '}
          {this.props.Title} is Up{' '}
        </Text>
      </View>
    );
  }
}
