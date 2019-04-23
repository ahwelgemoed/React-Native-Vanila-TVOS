import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NodeUp from './NodeUp';
import NodeDown from './NodeDown';

export default class ProdNode extends Component {
  state = {
    nodeUp: false
  };
  componentDidMount() {
    this.openWS();
  }
  openWS = () => {
    var ws = new WebSocket('wss://socket.mto.group:1337');
    var runner;
    ws.onopen = () => {
      console.log('open');
      this.setState({
        nodeUp: true
      });
      setTimeout(this.openWS, 300000);
    };
    ws.onclose = () => {
      console.log('close');
      this.setState({
        nodeUp: false
      });
      setTimeout(this.openWS, 5000);
    };
    let redState = ws.readyState;
    console.log(redState);
  };
  render() {
    const { nodeUp } = this.state;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100
        }}
      >
        {nodeUp ? (
          <NodeUp Title={'Prod Node'} />
        ) : (
          <NodeDown Title={'Prod Node'} />
        )}
      </View>
    );
  }
}
