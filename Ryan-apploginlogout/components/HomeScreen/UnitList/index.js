import React from 'react';
import {Text, View, Button, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { gql } from 'apollo-boost';
import { graphql, compose } from "react-apollo";

class UnitPartial extends React.Component {
  navigateToUnit(unitId) {
    this.props.navigation.navigate('Unit', {
      unitId: unitId,
    });
  }

  render() {
    var online = <Text style={{color: "red"}}>Offline</Text>
    if (this.props.unit.online) {
      online  = <Text style={{color: "green"}}>Online</Text>
    }
    return(
      <View style={{
        minWidth: '90%',
        backgroundColor: 'skyblue',
        padding: 8,
        margin: 10,
      }}>
        <Text
          style={{
            fontSize: 15
          }}
          onClick={() => {this.navigateToUnit(this.props.unit.id)}}
        >
          {this.props.unit.user.name} | {this.props.unit.name}
        </Text>
        {online}
      </View>
    )
  }
}

class UnitList extends React.Component {
  renderItem({item}) {
    console.log("rendering partial")
    return (
      <UnitPartial unit={item} />
    )
  }

  render() {
    return (
      <View style={{
        padding: 0,
        margin: 0,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <FlatList
          data={this.props.data.allUnits}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const UNITS = gql`
  query {
    allUnits {
      name
      id
      online
      user {
        name
      }
    }
  }
`
export default graphql(UNITS, {
  options: {
    fetchPolicy: 'network-only', // we don't want to get the response from the cache
    pollInterval: 800 // in milliseconds,
  }
})(UnitList)
