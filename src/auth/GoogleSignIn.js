import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {Button} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '937708738118-tols9h26v4l08hadb1jggco6u8bjt7cd.apps.googleusercontent.com',
});
export default function GoogleSignInButton() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress()
        .then(() => console.log('Signed in with Google!'))
        .catch(err => console.log(err))
      }
    />
  );
}
async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}
