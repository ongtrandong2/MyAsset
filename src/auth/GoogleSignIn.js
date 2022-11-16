import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {Button} from 'react-native';
import {StyleSheet, View} from 'react-native';
GoogleSignin.configure({
  webClientId:
    '937708738118-tols9h26v4l08hadb1jggco6u8bjt7cd.apps.googleusercontent.com',
});

const LoginGoogle = props => {
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken, null);
    return auth().signInWithCredential(googleCredential);
  }
  function onSignOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.log(error));
    GoogleSignin.signOut();
  }
  console.log(props);
  return (
    <View style={styles.container}>
      <Button
        title="Google Sign-In"
        onPress={() => {
          console.log('signed in');
          onGoogleButtonPress().then(() => {
            props.navigation.navigate('Success');
          });
        }}
      />
      <Button title="Google Sign-Out" onPress={onSignOut} />
    </View>
  );
};

export default LoginGoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
