import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
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
                        // title="Please Log In"
                        initial
                        />

                </Scene>
                

                <Scene >
                    {/* <Scene key="profilePage"
                        tabs={true}
                        hideNavBar={true}
                        component={ProfilePage}
                        initial
                    
                        /> */}
                    <Scene
                        key="eventList"
                        component={EventList}
                        title="All Events"
                        rightTitle="Add Event"
                        onRight={() => Actions.addEventForm()}
                        // initial
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
                        title="Single Court"
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