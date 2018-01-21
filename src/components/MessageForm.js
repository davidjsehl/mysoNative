import React, { Component } from 'react';
import { TouchableOpacity, Image, View, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
var ImagePicker = require('react-native-image-picker');
import { showImagePicker } from 'react-native-image-picker';
import { messageChanged, sendMessageThunk } from '../reducers/chatReducer';
import { uploadImageThunk } from '../reducers/imageReducer';

export class MessageForm extends Component {
    
    constructor(props) {
        super(props);

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSendButtonSubmit = this.handleSendButtonSubmit.bind(this);
        this._pickImage = this._pickImage.bind(this);
    }

    handleMessageChange (text) {
        this.props.messageChanged(text)
    }

    handleSendButtonSubmit() {
        this.props.sendMessageThunk(this.props.message, (this.props.event.id))
    }

    _pickImage () {
        showImagePicker((response) => {
            console.log('responseeeee', response)
            if(!response.didCancel) {
                this.props.uploadImageThunk(response.uri, this.props.event.id)
            }
        })
    }
              
    render () {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Message"
                    returnKeyType='send'
                    underlineColorAndroid={'transparent'}
                    value={this.props.message}
                    onChangeText={this.handleMessageChange}
                    />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSendButtonSubmit}
                    >
                    <Image style={styles.sendImageStyle}
                        source={require('../../public/send-icon.png')}
                        />
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._pickImage}
                    >
                    <Image style={styles.cameraImageStyle}
                        source={require('../../public/camera.png')}
                        />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        backgroundColor: '#eeeeee',
        borderTopColor: '#cccccc',
        borderTopWidth: 1
    },
    textInput: {
        flex: .999,
        backgroundColor: '#ffffff',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3
    },
    button: {
        flexShrink: 0,
        width: 40,
        height: 40,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendImageStyle: {
        height: 40,
        width: 40
    },
    cameraImageStyle: {
        height: 40,
        width: 40
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.chat.message
    }
}

const MessageFormContainer = connect(mapStateToProps, { messageChanged, sendMessageThunk, uploadImageThunk })(MessageForm);
export default MessageFormContainer;
