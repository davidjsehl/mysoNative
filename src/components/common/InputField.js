import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput 
            style ={styles.inputFieldStyle}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            >
            </TextInput>
        </View>
    )
}

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    inputFieldStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { InputField };