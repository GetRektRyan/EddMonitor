import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
 } from 'react-native';
  import { StackNavigator } from 'react-navigation';
  import {NavigationActions} from 'react-native';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  ComponentDidMount(){
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user')
    if (value !== null) {
      this.props.navigation.navigate('Profile')
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView behaviour='padding' style={styles.wrapper}>
          <View style={styles.container}>

             <Image
             //source={require('/react-native/assets/icon.png')}
             />
              <Text style={styles.header}> LOGIN </Text>

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
            onPress={this.login}>
            <Text> Log In </Text>
            </TouchableOpacity>

          </View>
      </KeyboardAvoidingView>
    );
  } 
  //navigation on login
    login = () => { 
     
      this.props.navigation.navigate('List');
  } 
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize:24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
   },
   textInput: {
     alignSelf: 'stretch',
     padding: 16,
     marginBottom: 20,
     backgroundColor:'#fff',
   },
   btn: {
     alignSelf: 'stretch',
     backgroundColor: '#01c853',
     padding: 20,
     alignItems: 'center',

   }
});


