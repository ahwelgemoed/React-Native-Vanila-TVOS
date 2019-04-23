import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Pulse from 'react-native-pulse';

export default class NodeDown extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pulse
          color="#cb3837"
          numPulses={4}
          diameter={400}
          speed={100}
          duration={2000}
        />
        <Text
          style={{ fontSize: 22, fontFamily: 'TimeBurner', color: 'white' }}
        >
          {' '}
          {this.props.Title} is Down{' '}
        </Text>
      </View>
    );
  }
}
