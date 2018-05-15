import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import relativeDate from 'relative-date'
import firebase from 'firebase';


class MessagesList extends Component  {
    constructor (props) {
        super(props)

        this.renderMessage = this.renderMessage.bind(this)
    }
    renderMessage() {
        return this.props.data.map(message => {
            const isCurrentUser = firebase.auth().currentUser.uid == message.user.id;
            const alignItems = isCurrentUser ? 'flex-end' : 'flex-start'
            const margin = isCurrentUser ? { marginLeft: 150 } : { marginRight: 150 }
            const date = relativeDate(new Date(message.createdAt))
            const username = message.user.email
            if (message.type === 'text') {
                return (
                    <View key={message.createdAt} style={styles.container}>
                        <View style={[styles.bubbleView, {alignItems: alignItems}, margin]}>
                            <Text>{date}</Text>
                            <Text>{username}</Text>
                            <Text style={styles.messageText}>
                                {message.text}
                            </Text>
                        </View>   
                    </View>
                )
            } else {
                return (
                    <View key={message.createdAt} style={styles.container}>
                        <View style={[styles.bubbleView, { alignItems: alignItems }, margin]}>
                            <Text >{date}</Text>
                            <Text >{username}</Text>
                            <Image style={[{ alignItems: alignItems, width: 120, height: 90 }, margin]} source={{ uri: message.url }} />
                        </View>
                    </View>
                )
            }
        })
    }

    render() {
        console.log(this.props.data)
        return (
            <ScrollView>
               {this.renderMessage()}
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 5
    },
    bubbleView: {
        backgroundColor: '#1E90FF',
        flex: 1,
        borderRadius: 8,
        padding: 8
    },
    userText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    messageText: {
        flex: 1,
        color: 'white',
        fontSize: 16
    }
}


export default MessagesList;