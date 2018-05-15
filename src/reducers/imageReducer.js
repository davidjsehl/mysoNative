import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { Platform } from 'react-native'


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

// //ACTION TYPES

const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
const UPLOAD_THUMBNAIL_SUCCESS = 'UPLOAD_THUMBNAIL_SUCCESS'


// //INITIAL STATE

const initialState = {
    uploadUrl: '',
    images: {}
}



//THUNKS

export const uploadImageThunk = (uri, eventId, mime = 'application/octet-stream') => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            const sessionId = new Date().getTime()
            let uploadBlob = null
            const imageRef = firebase.storage().ref('images').child(`${eventId}/${sessionId}`)
    
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
                dispatch({ type: UPLOAD_IMAGE_SUCCESS })
                storeReference(url, eventId, sessionId)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}



const storeReference = (downloadUrl, eventId, sessionId) => {
    let imageRef = firebase.storage().ref('images').child(`${eventId}/${sessionId}`)
    let currentUser = firebase.auth().currentUser
    let image = {
        type: 'image',
        name: imageRef.name, 
        url: downloadUrl,
        createdAt: sessionId,
        user: {
            id: currentUser.uid,
            email: currentUser.email
        }
    }
    firebase.database().ref(`/events/${eventId}/messages`)
    .push(image);
}

//REDUCER

export default (state = initialState, action) => {
    switch(action.type) {
        case UPLOAD_IMAGE_SUCCESS:
            return { ...state, uploadUrl: '' }
        default:
            return state;
    }
}