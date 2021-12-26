import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import User from '../components/User';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

const renderItem = ({ item }) => {
    return (
        <Card>
            <Text style={styles.cardTitleStyle}>
                Nick: {item.Username}
            </Text>
            <Text style={styles.cardTitleStyle}>
                Story: {item.Story}
            </Text>
            <Text style={styles.cardTitleStyle}>
                Likes: {item.Like}
            </Text>
            <TouchableOpacity onPress={() => {
                var isliked = false;
                firebase.database().ref('Users/' + User.Id + '/UserLikes/').on('value', (snapshot) => {
                    snapshot.forEach((child) => {
                        if (child.val().Id == item.Id) {
                            isliked = true;
                        }
                    })
                })
                if (!isliked) {
                    firebase.database().ref('Stories/' + item.Id).update({ Like: item.Like + 1 })
                    firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).set({ Id: item.Id });
                    firebase.database().ref('Users/' + item.UId + '/push_token/').once("value", function (snapshot) {
                        let response = fetch('https://exp.host/--/api/v2/push/send', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                to: snapshot.val(),
                                sound: 'default',
                                title: 'Liked',
                                body: User.Username+' Liked Your Story!',
                            })
                        });

                    }
                    );
                }
            }
            }><Text>Like Story</Text></TouchableOpacity>
        </Card>
    )
};




export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            list2: []
        }
    }

    componentDidMount() {
        firebase.database().ref('Users/' + User.Id + '/UserLikes/').on('value', (snapshot) => {
          var li = [];
          this.setState({list: [] ,list2:[] });
          var li2 = [];
            snapshot.forEach((child) => {
                li.push({
                    Id: child.val().Id
                })

            })

            this.setState({ list: li }, () => {
                firebase.database().ref('Stories/').on('value', (snapshot) => {
                    snapshot.forEach((child) => {
                        if (!(this.state.list.some(elem => {
                            return JSON.stringify({ Id: child.val().StoryId }) === JSON.stringify(elem);
                        }))) {
                            li2.push({
                                Story: child.val().Story,
                                Username: child.val().Username,
                                Like: child.val().Like,
                                Id: child.val().StoryId,
                                UId: child.val().UserId
                            })
                        }
                    })
                    this.setState({ list2: li2 })
                })
            })
        });
    }


    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ height: StatusBar.currentHeight }} />
                </ScrollView>

                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={this.state.list2}
                            renderItem={renderItem}
                            keyExtractor={item => item.Id}
                            
                        />
                        <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: ersel
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: ilk yazı
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: 3
        </Text>
        <TouchableOpacity onPress={() => {firebase.database().ref('Stories/' + item.Id).update({Like: item.Like-1})
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).remove();
      }}><Text>Dislike Story</Text></TouchableOpacity>
    </Card>
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: hakan
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: deneme
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: 1
        </Text>
        <TouchableOpacity onPress={() => {firebase.database().ref('Stories/' + item.Id).update({Like: item.Like-1})
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).remove();
      }}><Text>Dislike Story</Text></TouchableOpacity>
    </Card>
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: test
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: abcsda
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: 1
        </Text>
        <TouchableOpacity onPress={() => {firebase.database().ref('Stories/' + item.Id).update({Like: item.Like-1})
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).remove();
      }}><Text>Dislike Story</Text></TouchableOpacity>
    </Card>
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: merve
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: deneme
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: 0
        </Text>
        <TouchableOpacity onPress={() => {firebase.database().ref('Stories/' + item.Id).update({Like: item.Like-1})
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).remove();
      }}><Text>Dislike Story</Text></TouchableOpacity>
    </Card>
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: hakan
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: ben kimdim
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: 1
        </Text>
        <TouchableOpacity onPress={() => {firebase.database().ref('Stories/' + item.Id).update({Like: item.Like-1})
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).remove();
      }}><Text>Dislike Story</Text></TouchableOpacity>
    </Card>
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: kaan
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: ersel nasılsın
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: 2
        </Text>
        <TouchableOpacity onPress={() => {firebase.database().ref('Stories/' + item.Id).update({Like: item.Like-1})
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).remove();
      }}><Text>Dislike Story</Text></TouchableOpacity>
    </Card>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    cardTitleStyle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'justify'

    },
    searchStyle: {
        flex: 1,
        borderRadius: 15,
    },
    container: {
        flex: 1,
    },

});
