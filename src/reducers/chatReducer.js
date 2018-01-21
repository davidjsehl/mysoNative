import firebase from 'firebase';

//ACTION TYPES


const CHAT_MESSAGE_SUCCESS = 'CHAT_MESSAGE_SUCCESS';
const CHAT_MESSAGE_FAIL = 'CHAT_MESSAGE_FAIL';
const MESSAGE_CHANGED = 'MESSAGE_CHANGED';
const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
const FETCH_MESSAGES_FAIL = 'FETCH_MESSAGES_FAIL';

//INITIAL STATE 

const initialState = {
    message: '',
    messages: {},
    sendError: null
};

//ACTION CREATORS

export const messageChanged = text => {
    return (dispatch) => {
        dispatch({ type: MESSAGE_CHANGED, text })
    }
}

export const fetchMessagesSuccess = (messages) => {
    return { type: FETCH_MESSAGES_SUCCESS, messages }
}

//THUNKS

export const sendMessageThunk = (message, eventId) => {
    return (dispatch) => {
        let currentUser = firebase.auth().currentUser;
        let createdAt = new Date().getTime();
        let chatMessage = {
            type: 'text',
            text: message,
            createdAt: createdAt,
            user: {
                id: currentUser.uid,
                email: currentUser.email
            }
        }
        firebase.database().ref(`/events/${eventId}/messages`)
        .push(chatMessage).set(chatMessage, (error) => {
            if (error) {
                dispatch({ type: CHAT_MESSAGE_FAIL, error })
            } else {
                dispatch({ type: CHAT_MESSAGE_SUCCESS })
                
            }
        })
    }
}

export const fetchEventMessagesThunk = (eventId) => {
    return (dispatch) => {
        firebase.database().ref(`/events/${eventId}/messages`).limitToLast(20)
        .on('value', snapshot=> {
            dispatch(fetchMessagesSuccess(snapshot.val()))
        })
    }
}

//REDUCER

export default (state = initialState, action) => {
    switch(action.type) {
        case MESSAGE_CHANGED:
            return { ...state, message: action.text, sendingError: null }
        case CHAT_MESSAGE_SUCCESS:
            return { ...state, sendingError: null, message: '' }
        case CHAT_MESSAGE_FAIL:
            return { ...state, sendingError: action.error }
        case FETCH_MESSAGES_SUCCESS:
            return { ...state, sendingError: null, messages: action.messages }
        default:
            return state;
    }
}
