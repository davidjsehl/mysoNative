import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

//ACTION TYPES

const EVENT_UPDATE = 'EVENT_UPDATE';
const ADD_EVENT = 'ADD_EVENT';


//INITIAL STATE

const initialState = {
    title: '',
    description: '',
    location: '',
    date: new Date(),
    thumbnail: ''

};

//ACTION CREATOR

export const eventUpdate = ({ prop, value }) => {
   const action = { type: EVENT_UPDATE, payload: {prop, value} };
   return action;
}

//THUNKS

export const addEventThunk = (event) => {
    return (dispatch) => {
        let createdAt = new Date().getTime()
        let newEvent = { ...event, createdAt }
        firebase.database().ref('/events')
        .push(newEvent)
        .then(() => {
            dispatch({ type: ADD_EVENT })
        })
        Actions.main({ type: 'reset' })
    }
}


export default (state = initialState, action) => {
    switch (action.type) {
        case EVENT_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value,
                // thumbnail: action.payload
            }
        case ADD_EVENT:
            return initialState;
        default:
            return state;
    }
}

