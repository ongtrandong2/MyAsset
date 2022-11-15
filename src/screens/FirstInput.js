import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

import {useSelector, useDispatch} from 'react-redux';
import {UpdateMoney} from '../Redux/TotalMoney';
import {addPossession} from '../Redux/PossessionData';

const FirstInput = ({navigation}) => {
  const money = useSelector(state => state.totalMoney.value);
  const possessionData = useSelector(state => state.possessionData);
  const dispatch = useDispatch();

  const [textMoney, setTextMoney] = useState(0);
  const [textName, setTextName] = useState('');
  const [textValue, setTextValue] = useState('');

  // React.useEffect (()=> {
  //     console.log(itemList);
  //     return ()=>{}
  //   },[itemList]) // only re-run the effect if itemList changed

  const onPressHandler_Back = () => {
    navigation.navigate('Login');
  };

  const onPressPassData = () => {
    dispatch(UpdateMoney(Number(textMoney) || 0));
    for (let i = 0; i < itemList.length; i++) {
      dispatch(
        addPossession({
          key: itemList[i].index,
          name: itemList[i].name,
          value: itemList[i].value,
        }),
      );
    }
    navigation.navigate('HomeScreen');
  };
  const [itemList, setItemList] = useState([{item: '', valueOfItem: 0}]);

  const onPressHandler_AddItems = () => {
    setItemList([...itemList, {item: '', valueOfItem: 0}]);
  };

  const onPressHandler_RemoveItems = index => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
    //console.log(list);
  };

  // nhap
  const onAddItem = index => {
    const list = [...itemList];
    list[index].item = textName;
    list[index].valueOfItem = Number(textValue);
    list[index].key = index;
    setItemList(list);
    setTextName('');
    setTextValue('');
    setItemList([...itemList, {item: '', valueOfItem: 0}]);
  };
  //

  return (
    <SafeAreaView style={styles.view}>
      <Header onPressFunctionBack={onPressHandler_Back} />
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.title}>Vui lòng nhập tài sản của bạn !</Text>
        </View>

        <View style={styles.text_view}>
          <Text style={styles.text}>Số tiền</Text>
        </View>

        <View style={styles.row}>
          <View style={[{height: 50, width: '90%'}, styles.money_box]}>
            <TextInput
              style={styles.textInput_style}
              placeholder="0"
              placeholderTextColor={'grey'}
              onChangeText={value => setTextMoney(value)}
              keyboardType={'numeric'}
            />
          </View>
        </View>

        <View style={styles.second_row}>
          <View style={styles.secondtext_view}>
            <Text style={styles.text}>Hiện vật </Text>
          </View>

          <View style={styles.icon_plus}>
            <Pressable
              onPress={onPressHandler_AddItems}
              android_ripple={{color: '#bbbbbb'}}>
              <Image
                source={require('../assets/images/Plus.png')}
                resizeMode="stretch"
              />
            </Pressable>
          </View>
        </View>
        {/* Create an array of item list */}
        {itemList.map((singleItem, index) => (
          <View key={index} style={styles.column}>
            <View style={[{height: 200, width: '90%'}, styles.money_box]}>
              <TextInput
                style={styles.textInput_item}
                placeholder={'Tên'}
                //value = {singleItem.item}
                onChangeText={value => setTextName(value)}
              />
              <TextInput
                style={styles.textInput_item}
                placeholder="Trị giá"
                //value={singleItem.valueOfItem}
                onChangeText={value => setTextValue(value)}
              />
              {itemList.length > 1 && (
                <View style={styles.bin_view}>
                  <Pressable
                    onPress={() => onPressHandler_RemoveItems(index - 1)}
                    android_ripple={{color: '#bbbbbb'}}>
                    <Image
                      source={require('../assets/images/bin_icon.png')}
                      resizeMode="stretch"
                    />
                  </Pressable>
                </View>
              )}
            </View>
            {itemList.length - 1 === index && (
              <View style={styles.icon_plus}>
                <Pressable
                  onPress={() => onAddItem(index)}
                  android_ripple={{color: '#bbbbbb'}}>
                  <Image
                    source={require('../assets/images/Plus.png')}
                    resizeMode="stretch"
                  />
                </Pressable>
              </View>
            )}
          </View>
        ))}

        <View style={styles.row}>
          <CustomButton
            style={{width: 150, height: 40}}
            title={'Hoàn tất'}
            //onPressFunction={()=>navigation.navigate('HomeScreen')}
            onPressFunction={onPressPassData}
          />
        </View>
        {/* <Text>{possessionData[0]['index']}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // body: {
  //     flex: 1,
  //     alignItems: 'center',
  //     flexDirection: 'column',
  // },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    marginHorizontal: 30,
  },
  column: {
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 5,
    marginHorizontal: 30,
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    color: '#FFC700',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  text_view: {
    alignItems: 'flex-start',
    marginHorizontal: 45,
    marginTop: 20,
  },

  text: {
    fontSize: 20,
    color: '#000000',
  },

  textInput_style: {
    height: 30,
    width: '80%',
    borderBottomColor: 'black',
    //borderBottomWidth:1,
    backgroundColor: '#ffffff',
    fontSize: 20,
    textAlign: 'left',
  },

  textInput_item: {
    height: 30,
    width: '80%',
    borderBottomColor: 'black',
    //borderBottomWidth:1,
    backgroundColor: '#ffffff',
    fontSize: 20,
    textAlign: 'left',
    marginVertical: 20,
  },

  money_box: {
    borderWidth: 2,
    borderColor: '#FFC700',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  second_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,

    height: 50,
    marginHorizontal: 45,
  },

  secondtext_view: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  icon_plus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',

    //marginHorizontal:5,
  },

  bin_view: {
    alignItems: 'center',
    marginTop: 5,
    //backgroundColor:'pink'
  },
});
export default FirstInput;
