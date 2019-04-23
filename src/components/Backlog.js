import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { constructedToken } from '../config';
import styled from 'styled-components/native';
const StyledView = styled.View`
  /* background-color: #fcfcfc; */
  font-size: 20px;
  color: #efefef;
`;
const StyledText = styled.Text`
  font-family: 'TimeBurner';
  font-size: 20px;
  padding-top: 20px;
  color: #efefef;
`;
const StyledHeader = styled.Text`
  font-family: 'TimeBurner';
  font-size: 30px;
  padding-top: 10px;
  text-align: center;
  color: #efefef;
`;
const StatusText = styled.Text`
  font-family: 'TimeBurner';
  font-size: 16px;
  background: #6ecac5;
  color: white;
  padding: 10px;
  border-radius: 10px;
  color: #efefef;
`;

export default class Backlog extends Component {
  state = {
    activeSprint: null,
    totalProgress: [],
    totalReview: [],
    totalDone: [],
    totalToDo: []
  };
  componentDidMount() {
    this.getSprint();
    this.interval = setInterval(this.getSprint, 600000);
  }
  getSprint = () => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: constructedToken
      }
    };
    axios
      .get(
        'https://nudynamics.atlassian.net/rest/agile/1.0/board/2/sprint',
        config
      )
      .then(res => this.getActiveSprint(res.data));
  };
  getActiveSprint = async res => {
    const allSprints = res.values;
    for (let index = 0; index < allSprints.length; index++) {
      const element = allSprints[index];
      if (element.state == 'active') {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: constructedToken
          }
        };
        await axios
          .get(
            `https://nudynamics.atlassian.net/rest/agile/1.0/board/2/sprint/${
              element.id
            }/issue`,
            config
          )
          .then(res =>
            this.setState({
              activeSprint: res.data
            })
          )
          .then(res => this.totals(res));
      }
    }
  };
  totals = async () => {
    await this.setState({
      totalProgress: [],
      totalReview: [],
      totalDone: [],
      totalToDo: []
    });
    await this.state.activeSprint.issues.map(b => {
      if (b.fields.status.name === 'Review') {
        this.setState({
          totalReview: [...this.state.totalReview, b.fields.status.name]
        });
      }
      if (b.fields.status.name === 'To Do') {
        this.setState({
          totalToDo: [...this.state.totalToDo, b.fields.status.name]
        });
      }
      if (b.fields.status.name === 'Done') {
        this.setState({
          totalDone: [...this.state.totalDone, b.fields.status.name]
        });
      }
      if (b.fields.status.name === 'In Progress') {
        this.setState({
          totalProgress: [...this.state.totalProgress, b.fields.status.name]
        });
      }
    });
  };
  render() {
    const { totalDone, totalReview, totalProgress, totalToDo } = this.state;
    const { activeSprint } = this.state;
    return (
      <StyledView>
        <StyledHeader>Active Sprint</StyledHeader>
        {activeSprint ? (
          <React.Fragment>
            <StyledText>Total In Sprint - {activeSprint.total}</StyledText>
            <StyledText> Total To Do - {totalToDo.length}</StyledText>
            <StyledText> Total In Progress - {totalProgress.length}</StyledText>
            <StyledText> Total In Review - {totalReview.length}</StyledText>
            <StyledText> Total Done - {totalDone.length}</StyledText>
          </React.Fragment>
        ) : null}
      </StyledView>
    );
  }
}

{
  /* {activeSprint.issues.map(b => (
  <React.Fragment key={b.id}>
    <StyledText>
      {b.key} <StatusText>{b.fields.status.name}</StatusText>
    </StyledText>
    <Text>{b.fields.summary}</Text>
    <Text>{b.fields.assignee.displayName}</Text>
  </React.Fragment>
))} */
}
