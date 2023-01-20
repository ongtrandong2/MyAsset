import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Animated, {LightSpeedInLeft, RollInLeft} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {setUserImage} from '../Redux/UserImage';
import {useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {doc, getDoc} from 'firebase/firestore';
//import { NavigationHelpersContext } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';

const {width, height} = Dimensions.get('screen');

export default function InfoScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //const [image, setImage] = useState('https://img.icons8.com/cotton/100/null/gender-neutral-user--v2.png');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userImage = useSelector(state => state.userImage.value);
  //console.log(userImage);
  useEffect(() => {
    firebase
      .firestore()
      .collection('Accounts')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
          setEmail(snapshot.data().email);
        } else {
          console.log('No such document!');
        }
      });
  });

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //compressImageMaxWidth:300,
      //compressImageMaxHeight:300,
      cropping: true,
      //compressImageQuality: 0.7,
    })
      .then(image => {
        //console.log(image);
        //setImage(image.path);
        setShowModal(false);
        dispatch(setUserImage(image.path));
      })
      .catch(err => {
        // if (err.code === 'E_PICKER_CANCELLED')
        // {
        //     console.log(err);
        //     setShowModal(false);
        // }
        
      ToastAndroid.showWithGravity(
        'There is no image picked!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    })
}


  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      borderRadius: 200,
      cropping: true,
    })
      .then(image => {
        //console.log(image);
        //setImage(image.path);
        setShowModal(false);
        dispatch(setUserImage(image.path));
        //dispatch(setImage('aa'));
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          //console.log(err);
          setShowModal(false);
        }
      });
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipeDown = () => {
    setShowModal(false);
  };
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          title={'THÔNG TIN CÁ NHÂN'}
          style={{
            fontSize: scale(22),
            fontFamily: 'Inter-Bold',
          }}
        />
        <View style={styles.big_row}>
          <View style={styles.title}>
            <View style={styles.user_container}>
              <Image
                style={{
                  height: scale(150),
                  width: scale(150),
                  borderRadius: scale(100),
                  borderWidth: 1,
                  borderColor: '#000',
                }}
                source={{uri: userImage}}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.takephoto_container}
                onPress={() => setShowModal(true)}>
                <FontAwesome5 name="camera" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  paddingLeft: 20,
                }}
                numberOfLines={2}>
                {name}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.big_row, {paddingTop: 30}]}>
          <View style={styles.row}>
            <View style={styles.left_box}>
              <Feather
                name="user"
                size={24}
                color="black"
                style={{paddingRight: 3}}
              />

              <Text style={styles.text}>Tên: </Text>
            </View>

            <Text style={styles.text} numberOfLines={2}>
              {name}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.left_box}>
              <Feather
                name="mail"
                size={24}
                color="black"
                style={{paddingRight: 3}}
              />
              <Text style={styles.text}>Email: </Text>
            </View>

            <Text style={styles.text} numberOfLines={2}>
              {email}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.left_box}>
              <Image
                style={{
                  width: scale(20),
                  height: scale(20),
                  marginRight: 5,
                  marginBottom: 5,
                }}
                source={require('../assets/images/key.png')}
                resizeMode="stretch"
              />
              <Text style={styles.text}>Mật khẩu: </Text>
            </View>

            <Pressable
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
              android_ripple={{color: '#CCFFFF'}}
              style={({pressed}) => [
                {backgroundColor: pressed ? '#CCFFFF' : 'white'},
              ]}>
              <Text style={styles.press_text}>Đổi mật khẩu</Text>
            </Pressable>
          </View>
        </View>

        {/* <View style={[styles.big_row, {paddingTop: 30}]}>
          <CustomButton
            title={'Chỉnh sửa thông tin cá nhân'}
            //style={{ height: scale(40), width: '70%' }}
            colorPress={'#FFC700'}
            colorUnpress={'#FFC700'}
            text_style={styles.text_style}
            onPressFunction={() => {
              navigation.navigate('ChangeInfo');
            }}
          />
        </View> */}
      </ScrollView>
      <GestureRecognizer onSwipeDown={onSwipeDown} config={config}>
        <Modal
          visible={showModal}
          //onRequestClose={() => setShowModal(false)}
          transparent
          statusBarTranslucent
          animationType="fade">
          <Pressable
            style={[styles.modal_view, {flex: 2}]}
            onPress={() => setShowModal(false)}
          />
          <View style={[styles.modal_view, {flex: 1}]}>
            <View style={styles.modal_box}>
              <View style={styles.modal_bigrow}>
                <TouchableOpacity
                  onPress={takePhotoFromCamera}
                  style={{paddingVertical: 10}}>
                  <Animated.View
                    entering={LightSpeedInLeft}
                    style={styles.modal_row}>
                    <View
                      style={[
                        styles.takephoto_container,
                        {position: 'relative'},
                      ]}>
                      <MaterialCommunityIcons
                        name="camera-plus"
                        size={20}
                        color="#000"
                      />
                    </View>
                    <Text style={styles.modal_text}>Chụp ảnh</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={choosePhotoFromLibrary}
                  style={{paddingVertical: 10}}>
                  <Animated.View
                    entering={LightSpeedInLeft}
                    style={styles.modal_row}>
                    <View
                      style={[
                        styles.takephoto_container,
                        {position: 'relative'},
                      ]}>
                      <Fontisto name="photograph" size={20} color="#000" />
                    </View>
                    <Text style={styles.modal_text}>Lấy ảnh từ thư viện</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  big_row: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 12,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  circle: {
    height: scale(100),
    width: scale(100),
    //backgroundColor: 'yellow',
    borderRadius: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },

  text: {
    fontSize: scale(16),
    color: '#000000',
    fontFamily: 'Inter-Medium',
  },

  left_box: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  press_text: {
    fontSize: scale(16),
    color: '#0000CC',
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'underline',
  },
  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },

  user_container: {
    height: scale(170),
    width: scale(170),
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
  },

  takephoto_container: {
    height: scale(50),
    width: scale(50),
    position: 'absolute',
    bottom: 0,
    right: 0,
    //borderWidth: 0.5,
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e6eb',
  },

  //Modal of change data
  modal_view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal_box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal_bigrow: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  modal_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modal_text: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Inter-Medium',
    paddingLeft: 20,
  },
});
