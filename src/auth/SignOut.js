import {firebase} from '@react-native-firebase/auth';
import React from 'react';
import {StyleSheet, View, Text, Button, Image, Pressable} from 'react-native';
import scale from '../constants/scale';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {deleteIO} from '../Redux/IncomeOutcome';
import {deletePlan} from '../Redux/PlanData';

import {CommonActions, useNavigation} from '@react-navigation/native';
// export default async function onSignOut({}) {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => console.log('User signed out!'))
//     .catch(error => console.log(error));
//   // GoogleSignin.signOut();
// }
const SignOut = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function onSignOutPress() {
    dispatch(deleteIO());
    dispatch(deletePlan());
    firebase
      .auth()
      .signOut()
      .then(() =>
        CommonActions.reset({
          index: 0,
          routes: [navigation.navigate('Login')],
        }),
      )
      .catch(error => console.log(error));
  }
  return (
    <Pressable
      style={styles.signOutContainer}
      onPress={() => {
        onSignOutPress();
      }}>
      <Text style={[styles.text, {marginLeft: 0}]}>Đăng xuất</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  signOutContainer: {
    height: scale(50),
    width: '60%',
    bottom: scale(50),
    //paddingRight:30,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: scale(18),
    color: '#000',
    fontWeight: '600',
  }
});
export default SignOut;
