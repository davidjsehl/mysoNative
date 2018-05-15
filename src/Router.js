import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import LoginForm from './components/LoginForm';
import EventList from './components/EventsList';
import AddEventForm from './components/AddEventForm';
import SingleEvent from './components/SingleEvent';
import EventChatView from './components/EventChatView';
import ProfilePage from './components/ProfilePage';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene
                        key="login"
                        component={LoginForm}
                        hideNavBar={true}
                        tabBarStyle={styles.tabBarStyle}
                        initial
                        />

                </Scene>
                

                <Scene key="main">
                    <Scene
                        key="eventList"
                        component={EventList}
                        title="All Events"
                        rightTitle="Add Event"
                        onRight={() => Actions.addEventForm()}
                        initial
                        />
                    <Scene
                        key="addEventForm"
                        component={AddEventForm}
                        title="Add Event"
                        />
                    <Scene 
                        key="singleEvent"
                        component={SingleEvent}
                        title="Event"
                        />
                    <Scene
                        key="eventChatView"
                        component={EventChatView}
                        title="Chat"
                        />
                </Scene>
            </Scene>
        </Router>
    )
}

let styles = {
    tabBarStyle: {
        borderTopWidth: .5,
        borderColor: '#b7b7b7',
        backgroundColor: 'white',
        opacity: 1
    }
};

export default RouterComponent;