import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar,TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'react-native-gesture-handler'
import User from '../components/User.js'


export default class SettingScreen extends React.Component {

  constructor(props) {
      super(props);
    }


    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {firebase.auth().signOut().then(()=>{
                  User.Email="";
                  User.Password="";
                  User.Username="";
                  User.Id=0;
                  User.TotalLikes=0;
                  User.TotalStories=0;
                  this.props.navigation.navigate("Login")})}}><Text>Logout</Text></TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
