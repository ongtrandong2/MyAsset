import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apikey: 'AIzaSyCEmy-5_b3fX3Du6i8Ce-ePV9F6lOGM3uU',
  authDomain: 'myasset-5493e.firebaseapp.com',
  projectId: 'myasset-5493e',
  storageBucket: 'myasset-5493e.appspot.com',
  messagingSenderId: '937708738118',
  appId: '1:937708738118:android:18685df8abbd1aa5929c47',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase};
