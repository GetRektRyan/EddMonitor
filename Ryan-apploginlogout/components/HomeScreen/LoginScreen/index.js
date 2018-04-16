import React from 'react';
import {Text, View, Button, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { gql } from 'apollo-boost';
import { graphql, compose } from "react-apollo";
import logo from './greenone.jpg'

// import t from 'tcomb-form-native';
// var Form = t.form.Form;
//
// var LoginForm = t.struct({
//   handle: t.String,
//   password: t.String,
// });

// var options = {
//   fields: {
//     password: {
//       type: 'password',
//       placeholder: 'password',
//       secureTextEntry: true
//     },
//     handle: {
//       placeholder: 'username or email'
//     }
//   }
// }

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  onClick() {
    this.props.login({
      variables: { handle: this.state.username, password: this.state.password }

    })
    .then(({ data }) => {
      this.props.data.refetch()
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }


  render() {
    console.log("Rendering")
    return (
      // <View>
      //   <Form
      //     ref="form"
      //     type={LoginForm}
      //     options={options}
      //   />
      //   <View>
      //     <Button block
      //     onPress={() => this.onClick()}
      //     title="Login"
      //     >
      //       <Text>Login</Text>
      //     </Button>
      //   </View>
      // </View>
      <KeyboardAvoidingView behaviour='padding' style={styles.wrapper}>
          <View style={styles.container}>


               <View style={{height:  425,  width:350, backgroundColor: '#FFF', borderRadius: 5}}>
               <Image style={{width: 350, height:100, alignSelf:'center', borderRadius: 5, marginTop: 35}} source={require('./greenone.jpg')} />
               <TextInput
                  style={styles.textInput} placeholder='Username'
                  onChangetext={ (username) => this.setState({username})}
                  underlineColorAndroid='transparent'
                  />
              <TextInput
              style={styles.textInput} placeholder='Password'
              onChangetext={ (password) => this.setState({password})}
              underlineColorAndroid='transparent'
              />

              <TouchableOpacity
            style={styles.btn}
            onPress={() => this.onClick()}>
            <Text style={{color: '#fff'}}> Log In </Text>
            </TouchableOpacity>

            <TouchableOpacity>

            <Text style={{color: '#0000FF', alignSelf:'center', marginTop:10 }}>Forgot your password?</Text>
            </TouchableOpacity>
               </View>
          </View>
      </KeyboardAvoidingView>

    );
  }
}

const LOGIN = gql`
  mutation login($handle: String!, $password: String!) {
    login(handle: $handle, password: $password) {
      name
      id
    }
  }
`

const LOGGED_IN_USER = gql`
  query {
    loggedInUser {
      name
      id
    }
  }
`

export default compose(
  graphql(LOGGED_IN_USER, {
    options: {
      forceFetch: true,
      fetchPolicy: "network-only"
    }
  }),
  graphql(LOGIN, {
    name: "login"
  })
)(LoginScreen)



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#FFF',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    justifyContent: 'center',
    fontSize:24,
    marginBottom: 20,
    color: '#000',
    //fontWeight: '',
   // alignItems: 'center',
   },
   textInput: {
     borderWidth: 1,
     borderColor: '#A9A9A9',
     borderRadius: 5,
     alignSelf: 'stretch',
     padding: 16,
     margin: 20,
     marginBottom: 0,
     backgroundColor:'#fff',
   },
   btn: {
     alignSelf: 'stretch',
     backgroundColor: '#A2CC3A',
     borderColor:'#A9A9A9',
     borderWidth: 1,
     //color: 'white',
     padding: 20,
     margin: 20,
     marginBottom: 0,
     alignItems: 'center',
     borderRadius: 5,
   },
});
