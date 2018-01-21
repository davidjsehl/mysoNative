import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, InputField, Button, Spinner } from './common';
import { loginUserThunk, emailChanged, passwordChanged } from '../reducers/authReducer';


export class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUserThunk({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: '#4D5966' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton() {
        if (this.props.loading) return <Spinner size='large' />
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>

                <View style={styles.loginContainer}>
                    <Image style={styles.logo} source={require('../../public/logo.png')} />

                </View>
                <View style={styles.formContainer}>
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            // onSubmitEditing={() => this.passwordInput.focus()}
                            autoCorrect={false}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='Email'
                            placeholderTextColor='rgba(225,225,225,0.7)'
                            value={this.props.email}
                            onChangeText={this.onEmailChange.bind(this)} />

                        <TextInput style={styles.input}
                            // returnKeyType="go" ref={(input) => this.passwordInput = input}
                            placeholder='Password'
                            placeholderTextColor='rgba(225,225,225,0.7)'
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                            secureTextEntry />
                        {this.renderError()}
                        {this.renderButton()}
                    </View>
                </View>


            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: '#4D5966',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 300
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    }
}

//     render() {
//         return (
//             <Card>
//                 <CardSection>
//                     <InputField
//                         label='Email'
//                         placeholder='user@gmail.com'
//                         value={this.props.email}
//                         onChangeText={this.onEmailChange.bind(this)}
//                     />
//                 </CardSection>
//                 <CardSection>
//                     <InputField
//                         label='Password'
//                         placeholder='Password'
//                         secureTextEntry
                        // value={this.props.password}
//                         onChangeText={this.onPasswordChange.bind(this)}
//                     />
//                 </CardSection>

//                 {this.renderError()}

//                 <CardSection>
//                     {this.renderButton()}
//                 </CardSection>
//             </Card>
//         )
//     }
// }

// const styles = {
//     errorTextStyle: {
//         color: 'red',
//         fontSize: 20,
//         alignSelf: 'center'
//     }
// }

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    }
}

const LoginFormContainer = connect(mapStateToProps, { emailChanged, passwordChanged, loginUserThunk })(LoginForm);
export default LoginFormContainer;
