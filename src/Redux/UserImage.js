import {createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/firestore';
import { Keyboard } from 'react-native';
const UserImage = createSlice({
  name: 'UserImage',
  initialState: {
    value: 'https://img.icons8.com/cotton/100/null/gender-neutral-user--v2.png',
  },
  reducers: {
    setUserImage: (state, action) => {
      state.value = action.payload;
      // firebase
      //   .firestore()
      //   .collection('Accounts')
      //   .doc(firebase.auth().currentUser.uid)
      //   .collection('UserImage')
      //   .doc('UserImage')
      //   .set({avt: state.value}, {merge: true})
      //.then(Keyboard.dismiss());

    },
    resetImage: (state,action) =>{
      state.value = 'https://img.icons8.com/cotton/100/null/gender-neutral-user--v2.png';
    }
  },
});
export const {setUserImage, resetImage} = UserImage.actions;
export default UserImage.reducer;
