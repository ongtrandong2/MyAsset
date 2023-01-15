import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import scale from '../constants/scale';
import { firebase } from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '937708738118-tols9h26v4l08hadb1jggco6u8bjt7cd.apps.googleusercontent.com',
});

const LoginGoogle = props => {
  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
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
  //console.log(props);
  return (
    <View style={styles.container}>
      {/* <Pressable
        style={({ pressed }) => [
          styles.row,
          { backgroundColor: pressed ? '#0099FF' : 'white' },
        ]}
        onPress={() => {
          console.log('signed in');
          onGoogleButtonPress().then(() => {
            props.navigation.navigate('Success');
          });
        }}
      /> */}
      <Pressable
        //style = {styles.row}
        style={({ pressed }) => [
          styles.row,
          { backgroundColor: pressed ? '#0099FF' : 'white' },
        ]}
        onPress={() => {
          console.log('signed in');
          onGoogleButtonPress().then(() => {
            props.navigation.navigate('Success');
          });
        }}>
        <Image
          style={{ height: 40, width: 40 }}
          source={{
            uri: 'https://img.icons8.com/fluency/48/null/google-logo.png',
          }}
          resizeMode="stretch"
        />
        <Text style={[styles.text, { paddingLeft: 10 }]}>
          Continue with Google
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginGoogle;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'blue',
    alignItems: 'center',
  },
  text: {
    color: '#0000CC',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});
