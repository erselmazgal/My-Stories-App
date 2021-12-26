import React from 'react';
import {
  View,
  Alert
} from 'react-native';
import * as firebase from 'firebase';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._Navigate();
    var config ={
      apiKey: "AIzaSyAcidyteCOU2hdmHCRFxAsjaaGxaw2VjAw",
      authDomain: "storiesapp-db2ab.firebaseapp.com",
      databaseURL: "https://storiesapp-db2ab-default-rtdb.firebaseio.com",
      projectId: "storiesapp-db2ab",
      storageBucket: "storiesapp-db2ab.appspot.com",
      messagingSenderId: "121979140729",
      appId: "1:121979140729:web:291c6823305e3dc425b2a8"
      }  
        
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
     }else {
        firebase.app(); // if already initialized, use that one
     }
  }

  _Navigate(){
    this.props.navigation.navigate('Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
      </View>
    );
  }
}