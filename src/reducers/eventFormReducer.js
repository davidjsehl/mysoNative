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

export const uploadEventThumbnail = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            const sessionId = new Date().getTime()
            let uploadBlob = null
            const imageRef = firebase.storage().ref('images').child(`${eventId}/thumbnails/${sessionId}`)

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                    // console.log('urllllll', url)
                    dispatch({ type: UPLOAD_THUMBNAIL_SUCCESS, url })
                    storeReference(url, eventId, sessionId)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

const storeTumbnailReference = (downloadUrl, eventId, sessionId) => {
    let imageRef = firebase.storage().ref('images').child(`${eventId}/thumbnails/${sessionId}`)
    let currentUser = firebase.auth().currentUser
    let image = {
        name: imageRef.name,
        url: downloadUrl,
        createdAt: sessionId
    }
    firebase.database().ref(`/events/${eventId}/thumbnails`)
        .push(image);
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

// case UPLOAD_THUMBNAIL_SUCCESS:
// return { ...state, thumbnail: action.url }