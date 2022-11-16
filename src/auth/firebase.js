import 'firebase/app'
require(`firebase/auth`)

const firebaseConfig = {
    apiKey: 'AIzaSyCEmy-5_b3fX3Du6i8Ce-ePV9F6lOGM3uU',
    authDomain: 'myasset.firebaseapp.com',
    databaseURL: 'https://myasset.firebaseio.com',
    projectId: 'myasset-5493e',
    storageBucket: 'myasset.appspot.com',
    messagingSenderId: '<messaging-sender-id>',
    appId: '1:937708738118:android:18685df8abbd1aa5929c47'
};
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}
auth = firebase.auth()
export default firebase