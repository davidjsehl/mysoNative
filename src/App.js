import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import store from './store';
import RouterComponent from './Router';
import { Tabs } from './Router';



export default class App extends React.Component {

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyAAVCxAGlyFFz0HSR8hS2dlABOdPYdAXlc",
      authDomain: "myso-stackathon.firebaseapp.com",
      databaseURL: "https://myso-stackathon.firebaseio.com",
      projectId: "myso-stackathon",
      storageBucket: "myso-stackathon.appspot.com",
      messagingSenderId: "601069676391"
    };
    firebase.initializeApp(config);
  }

  render() {

    return (
      <Provider store={store}>
          <RouterComponent />
      </Provider>
    );
  }
}


