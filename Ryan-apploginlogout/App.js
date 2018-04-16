import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { StackNavigator } from 'react-navigation';

//Used for generating graphql queries
import gql from "graphql-tag";

import App from './components/HomeScreen'


export default class extends Component {
  constructor(...args) {
    super(...args);

    this.client = new ApolloClient({
      uri: 'https://green1telemetry.nz/graphql'
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <App />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('Green1', () => App);
