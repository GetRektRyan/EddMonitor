import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//Used for generating graphql queries
import { gql } from 'apollo-boost';
import { graphql, Query, compose } from 'react-apollo';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen'
import UnitList from './UnitList'
//import Unit from './Unit'

const LOGGED_IN_USER = gql`
  query {
    loggedInUser {
      name
      id
    }
  }
`

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

class HeaderScreen extends Component {
  render() {
    return(
      <View>
        <Text>User {this.props.data.loggedInUser.name} logged in</Text>
        <Button
          onPress={() => {
            this.props.logout().then(() => this.props.data.refetch());
          }}
          title="Logout"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}

const Header = compose(
  graphql(LOGGED_IN_USER, {
    options: {
      forceFetch: true,
      fetchPolicy: "network-only"}
    }
  ),
  graphql(LOGOUT, {
    refetchQueries: [
      {
        query: LOGGED_IN_USER
      }
    ],
    name: 'logout'
  })
)(HeaderScreen);

const User = StackNavigator(
  {
    UnitList: { screen: UnitList },
    //Unit: { screen: Unit },
  },
  {
    initialRouteName: 'UnitList',
    navigationOptions: {
      header: <Header />
    }
  }
);

class HomeScreen extends Component {
  render() {
    if (this.props.data.loading) return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
    if (this.props.data.error) return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Error :{error}</Text>
      </View>
    );

    if (this.props.data.loggedInUser != null) {
      return(
        <User />
      )
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LoginScreen />
        </View>
      )
    }
  }
}




export default compose(
  graphql(LOGGED_IN_USER, {
    options: {
      forceFetch: true,
      fetchPolicy: "network-only"}
    }
  ),
  graphql(LOGOUT, {
    refetchQueries: [
      {
        query: LOGGED_IN_USER
      }
    ],
    name: 'logout'
  })
)(HomeScreen);
