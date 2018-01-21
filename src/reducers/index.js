import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import EventReducer from './eventReducer';
import ChatReducer from './chatReducer';
import EventFormReducer from './eventFormReducer';


export default combineReducers({
    auth: AuthReducer,
    events: EventReducer,
    chat: ChatReducer,
    eventForm: EventFormReducer
})
