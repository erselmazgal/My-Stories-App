import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../components/User';
import { Appbar } from 'react-native-paper';
import { Card } from 'react-native-elements';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements'

const renderItem = ({ item }) => (
    <Card>
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Icon
                name='people'
                color='#465882' />
            <View style={{ width: 10 }} />

            <Card.Title style={{ alignSelf: "flex-start" }}>Nick: {item.Username}</Card.Title>
        </View>


        <Card.Divider></Card.Divider>

        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Icon
                name='edit'
                color='#465882' />
            <View style={{ width: 10 }} />

            <Card.Title style={{ alignSelf: "flex-start" }}>Story: {item.Story}</Card.Title>
        </View>
        <Card.Divider></Card.Divider>

        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Icon
                name='favorite'
                color='#465882' />
            <View style={{ width: 10 }} />

            <Text style={styles.cardTitleStyle}>
                Likes: {item.Like}
            </Text>
        </View>
        <View style={{ height: 10 }} />

        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Icon
                name='delete'
                color='red' />

            <View style={{ width: 10 }} />

            <TouchableOpacity onPress={() => {
                firebase.database().ref('Stories/' + item.Id).remove();
                firebase.database().ref('Users/' + User.Id + '/UserStories/' + item.Id).remove(); User.TotalStories--;
                firebase.database().ref("Users/" + User.Id + "/TotalStories").set(User.TotalStories);
            }}><Text>Delete Story</Text></TouchableOpacity>
        </View>
    </Card >
);


export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            list2: []
        }
    }
    componentDidMount() {
        firebase.database().ref('Users/' + User.Id + '/UserStories/').on('value', (snapshot) => {
          var li = [];
          this.setState({list: [] ,list2:[] });
          var li2 = [];
            snapshot.forEach((child) => {
                li.push({
                    Id: child.val().Id
                })

            })

            User.TotalLikes = 0;
            this.setState({ list: li }, () => {
                this.state.list.forEach(element => {
                    firebase.database().ref().child('Stories').orderByChild('StoryId').equalTo(element["Id"]).once('value', snapshot => {

                        snapshot.forEach((child) => {
                            User.TotalLikes += child.val().Like;
                            li2.push({
                                Story: child.val().Story,
                                Username: child.val().Username, //like artıcak
                                Like: child.val().Like,
                                Id: element["Id"]
                            })
                        })
                        this.setState({ list2: li2 }, () => { firebase.database().ref("Users/" + User.Id + "/TotalLikes").set(User.TotalLikes); })
                    })
                })
            });
        })
    }
    render() {
        return (
            <SafeAreaView>
                <Appbar style={styles.appBar}>
                    <Appbar.Content title="Profil Sayfasi" />
                </Appbar>
                <View style={{ height: StatusBar.currentHeight }} />
                <View style={{ height: StatusBar.currentHeight }} />
                <View style={{ height: StatusBar.currentHeight }} />

                <ScrollView>
                    <Card>
                        <Card.Title>Nick: {User.Username}</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={{ alignSelf: 'center' }}>
                            <View>
                                <Text style={{ alignSelf: "center" }}>Total Stories: {User.TotalStories}</Text>
                            </View>
                            <View>
                                <Text style={{ alignSelf: "center" }}>Total Likes: {User.TotalLikes}</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={{ height: 20 }} />
                    <View style={{ alignSelf: 'center' }}><Text style={styles.storiesStyle}>Hikayelerim</Text></View>
                </ScrollView>

                <ScrollView >
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={this.state.list2}
                            renderItem={renderItem}
                            keyExtractor={item => item.Id} />
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: "#465882",
        position: 'absolute',
        left: 0,
        right: 0,
        top: StatusBar.currentHeight,
    },
    cardTitleStyle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'justify'
    },
    profilImage: {
        width: 250,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    storiesStyle: {
        fontSize: 23,
        color: "#465882",
        fontWeight: "bold"
    }
});
