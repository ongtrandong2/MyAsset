import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {getApps, initializeApp} from 'firebase/app';
import {getAuth, initializeAuth} from 'firebase/auth';
import initializeFirestore from 'firebase/firestore';
import {getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apikey: 'AIzaSyCEmy-5_b3fX3Du6i8Ce-ePV9F6lOGM3uU',
  authDomain: 'myasset-5493e.firebaseapp.com',
  projectId: 'myasset-5493e',
  storageBucket: 'myasset-5493e.appspot.com',
  messagingSenderId: '937708738118',
  appId: '1:937708738118:android:18685df8abbd1aa5929c47',
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {firebase, auth, db};
