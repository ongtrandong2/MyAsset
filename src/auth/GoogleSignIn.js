import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {StyleSheet, View, Text, Button, Image, Pressable} from 'react-native';
import scale from '../constants/scale';

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
      {/* <Button
        title="Google Sign-In"
        onPress={() => {
          console.log('signed in');
          onGoogleButtonPress().then(() => {
            props.navigation.navigate('Success');
          });
        }}
      />
      <Button title="Google Sign-Out" onPress={onSignOut} /> */}
      <View style = {styles.row_view}>

        <Pressable
            onPress={() => {
              console.log('signed in');
              onGoogleButtonPress().then(() => {
                props.navigation.navigate('Success');
              });
            }}
            android_ripple={{color: '#CCFFFF'}}
            style={({pressed}) => [
              {backgroundColor: pressed ? '#0099FF' : 'white'},
            ]}
        >
          <View style={styles.box}>
            <View style = {styles.icon}>
              <Image 
                style={{height:40, width:40}}
                source={{uri:'https://img.icons8.com/fluency/48/null/google-logo.png'}}
                resizeMode="stretch"
              /> 
            </View>
            <View style = {styles.title}>
              <Text style={styles.text}>Continue with Google</Text>
            </View>
          </View>
        </Pressable>
          
      </View>

      {/* <Button title="Google Sign-Out" onPress={onSignOut} /> */}
    </View>
  );
};

export default LoginGoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  row_view: {
    justifyContent: 'center',
    alignItems:'center',
    //backgroundColor: 'pink',

  },

  box:{
    width:'70%',
    height: scale(50),
    //backgroundColor: 'green',
    flexDirection:'row',
    //justifyContent: 'space-between',
    //padding:5,
    paddingLeft:10,
    borderRadius:20,
    borderWidth:1,
    borderColor: 'green',

    
  },
  icon:{
    //width:'20%',
    flex:0.2,
    //backgroundColor: 'blue',
    alignItems:'center',
    justifyContent:'center',
    
    
  },
  title:{
    //width:'90%',
    flex:0.8,
    //height: scale(50),
    //backgroundColor:'green',
    justifyContent: 'center',
    //alignItems: 'center',
    //flexWrap:'wrap',
    paddingLeft:10,
  },

  text:{
    color:'#0000CC',
    fontSize:scale(20),
    //textAlign:'center',
    fontWeight:'bold',

  }
});
