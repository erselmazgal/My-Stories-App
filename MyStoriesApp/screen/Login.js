import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, StatusBar, Image } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import User from "../components/User";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
const avatar = require('../assets/kisspng-computer-icons-online-chat-chat-icon-5ade092894e8c9.2725279915245007766099.jpg');

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issign: false,
            Email: "",
            Password: "",
            Username: ""

        }
    }

    registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        firebase
            .database()
            .ref('Users/' + User.Id + '/push_token')
            .set(token);
    };

    valchange = key => val => {
        this.setState({ [key]: val })
    }
    login(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) { }).catch(error => {
            this.props.navigation.navigate("Login");
        });
        User.Email = email;
        User.Password = password;
        const rootRef = firebase.database().ref();
        const oneRef = rootRef.child('Users').orderByChild('Email');
        oneRef.equalTo(User.Email)
            .once('value', snapshot => {
                snapshot.forEach((child) => {
                    const text=child.toJSON();
                    User.Username = text["Username"];
                    User.Id = text["Id"];
                    User.TotalLikes = text["TotalLikes"];
                    User.TotalStories = text["TotalStories"];
                })
            })
        this.props.navigation.navigate("Home");
    }

    async signup(bool, email, password, username) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var userid;
        if (!(bool)) {
            this.setState({ issign: true });
        }
        else if (!(!reg.test(email) || password.trim() == "" || password.length < 6 || username.trim() == "")) {
            User.Email = email;
            User.Password = password;
            User.Username = username;
            User.TotalStories = 0;
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
                this.props.navigation.navigate("Login");
            });
            await firebase.database().ref('Total Users/').once("value", function (snapshot) {
                userid = parseInt(snapshot.val(), 10);
            });
            userid++;
            firebase.database().ref("Users/" + userid).set({ Username: this.state.Username, Email: this.state.Email, Password: this.state.Password, TotalLikes: 0, TotalStories: 0, Id: userid });
            User.Id = userid;
            firebase.database().ref('Total Users/').set(userid);

            await this.registerForPushNotificationsAsync();

            this.props.navigation.navigate("Home");
        }


    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                <View style={{ alignSelf: 'center' }}>
                    <View style={styles.profilImage}>
                        <Image source={avatar} style={styles.image} resizeMode="cover" ></Image>
                    </View>
                    <View style={{ height: StatusBar.currentHeight }} />
                    <Text style={{ alignSelf: "center", height: 30, fontSize: 14 }}> Welcome To Stories App </Text>
                </View>
                <View style={{ height: StatusBar.currentHeight }} />
                <View>
                    <View style={styles.inputView}>

                        <TextInput style={styles.inputText} placeholder=" Emailinizi Yazınız" value={this.state.Email} onChangeText={this.valchange("Email")} />
                    </View>
                    <View style={{ height: 5 }} />

                    {this.state.issign &&
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText} placeholder=" Kullanıcı Adınızı Yazınız" value={this.state.Username}
                                onChangeText={this.valchange("Username")} />
                        </View>
                    }
                    <View style={{ height: 5 }} />

                    <View style={styles.inputView}>
                        <TextInput secureTextEntry={true} style={styles.inputText} placeholder=" Şifrenizi Yazınız" value={this.state.Password} onChangeText={this.valchange("Password")} />
                    </View>
                    <View style={{ height: 5 }} />

                    {!this.state.issign &&
                        <View style={{ alignItems: "center", width: 100 + "%" }}>
                            <TouchableOpacity style={styles.loginbutton} onPress={() => this.login(this.state.Email, this.state.Password)}>
                                <Text style={styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ height: 5 }} />

                    <View style={{ alignItems: "center", width: 100 + "%" }}>
                        <TouchableOpacity style={styles.signupbutton} onPress={() => this.signup(this.state.issign, this.state.Email, this.state.Password, this.state.Username)}>
                            <Text style={styles.signupButtonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    loginButtonText: { color: "white", fontSize: 15 },
    signupButtonText: { color: "white", fontSize: 15 },
    loginbutton: {
        width: "80%",
        backgroundColor: "#009900",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signupbutton: {
        width: "80%",
        backgroundColor: "#465882",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    inputView: {
        alignSelf: "center",
        width: "80%",
        borderRadius: 25,
        borderColor: "#465882",
        borderWidth: 1,
        height: 60,
        marginBottom: 10,
        justifyContent: "center",
        padding: 10
    },
    inputText: {
        height: 50,
        color: "#465882",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    profilImage: {
        width: 250,
        height: 150,
        borderRadius: 25,
        overflow: "hidden"
    }
});

export default Login;
