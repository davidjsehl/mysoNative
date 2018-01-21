import firebase from 'firebase';

//ACTION TYPES

const GET_EVENTS = 'GET_EVENTS';
const ADD_EVENT = 'ADD_EVENT';


//INITIAL STATE

const initialState = {};



//THUNKS

export const getEventsThunk = () => {
    return (dispatch) => {
        firebase.database().ref('/events')
        .on('value', snapshot => {
            dispatch({ type: GET_EVENTS, payload: snapshot.val() })
        })
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload
        default:
            return state;
    }
}