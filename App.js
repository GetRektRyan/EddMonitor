import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View
   } from 'react-native';
  import { StackNavigator } from 'react-navigation';
  import { ApolloProvider } from 'react-apollo';
  import  ApolloCLient, { createNetworkInterface} from 'apollo-client';
  import gql from 'graphql-tag'
  import { graphql } from 'react-apollo'
  import Login from './app/components/login';
  import List from './app/components/list';
const Application = StackNavigator({
  Home: { screen: Login },
  List: { screen: List},
},{
  navigationOptions:{
      header: false,
  }
});
//Database connection
export default class extends Component {
  constructor(...args){
    super(...args);


    const networkInterface = createNetworkInterface('https://green1telemetry.nz/graphql');
    this.client= new ApolloCLient({
      networkInterface,
      dataIdFromObject: r => r.id,

    })
  }
  render() {
    return (
     <ApolloProvider client={this.client}>
      <Application/>
      </ApolloProvider>
    );
  }
}

//export default class App extends React.Component {
  
//}


