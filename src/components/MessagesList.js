import React, { Component } from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


class MessagesList extends Component  {
    constructor (props) {
        super(props)

        this.renderMessage = this.renderMessage.bind(this)
    }
        // const isCurrentUser = firebaseService.auth().currentUser.uid == this.props.message.user.id;
    renderMessage() {
        return this.props.data.map(message => {
            console.log('messaggeeeTypee', message.type)
            if (message.type === 'text') {
                return <Text key={message.createdAt}>{message.text}</Text>
            } else {
                return <Image style={{ width: 80, height: 80 }} key={message.createdAt} source={{ uri: message.url }} />
            }
        })
    }

    render() {
        console.log(this.props.data)
        return (
            <ScrollView>
               {this.renderMessage()}
            </ScrollView>
            // <GiftedChat
            //     messages={this.state.messages}
            //     onSend={messages => this.onSend(messages)}
            // />
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