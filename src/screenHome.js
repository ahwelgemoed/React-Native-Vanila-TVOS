import React from 'react';
import { Platform } from 'react-native';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Api from './api';
import config from '../platformAssets/config.json';
import packageJson from '../package.json';
import Button from './button';
import Backlog from './components/Backlog';
import DevNode from './components/DevNode';
import ProdNode from './components/ProdNode';
import axios from 'axios';

import { Col, Row, Grid } from 'react-native-easy-grid';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textH2: {
    fontFamily: 'TimeBurner',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 35,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textH3: {
    fontFamily: 'TimeBurner',
    textAlign: 'center',
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 30,
    color: '#62DBFB',
    justifyContent: 'center',
    // alignSelf: 'flex-end'
    alignItems: 'center'
  },
  textH4: {
    fontFamily: 'TimeBurner',
    textAlign: 'center',
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 30,
    color: '#efefef',
    justifyContent: 'center',
    // alignSelf: 'flex-end'
    alignItems: 'center'
  },
  image: {
    marginBottom: 30,
    width: 83,
    height: 97
  }
});

class ScreenHome extends React.Component {
  static path = '';

  static navigationOptions = {
    title: 'Home'
  };

  constructor() {
    super();
    this.state = { bgColor: '#222222', joke: [] };
  }
  componentDidMount() {
    this.getJoke();
    this.interval = setInterval(this.getJoke, 600000);
  }
  getJoke = () => {
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    axios
      .get('https://icanhazdadjoke.com/', config)
      .then(res => this.setState({ joke: res.data }));
  };

  render() {
    const Pete = Platform.isTV ? Col : Row;

    const title = `Hello from ${config.common.title}!`;
    return (
      <ScrollView>
        <Text style={styles.textH2}>mtoStatus Board</Text>
        <Grid>
          <Pete style={{ marginLeft: 30 }}>
            <Backlog />
          </Pete>
          <Pete style={Platform.isTV ? null : { marginTop: 100 }}>
            <DevNode />
          </Pete>
          <Pete style={Platform.isTV ? null : { marginTop: 150 }}>
            <ProdNode />
          </Pete>
        </Grid>
        <Grid style={{ marginTop: 30 }}>
          <Col style={Platform.isTV ? { marginTop: 300 } : { marginTop: 150 }}>
            <Text style={styles.textH4}>icanhazdadjoke</Text>
            {this.state.joke ? (
              <Text style={styles.textH3}>{this.state.joke.joke}</Text>
            ) : null}
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

export default ScreenHome;

{
}
