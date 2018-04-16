import React from 'react';
import {Text, View, Button, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { gql } from 'apollo-boost';
import { graphql, compose } from "react-apollo";

class UnitScreen extends React.Component {
  render() {
    return (
      <View>
        {String(this.props.unit)}
      </View>
    );
  }
}

const UNIT = gql`
  query unitQuery($unitId: Int!){
    unit(id: $unitId) {
      name
      id
      online
      variables {
        name
        id
        current_value
        new_value
        units
      }
    }
  }
`
/*
export default graphql(UNIT,
  options: (ownProps) => {
    return {
      variables: {unitId: ownProps.navigation.state.unitId}
    }
  }
)(UnitScreen)
*/
