import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import HeaderTab from '../components/Header_Tab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomButton from '../components/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'Item 1', key: '1'},
  {label: 'Item 2', key: '2'},
  {label: 'Item 3', key: '3'},
  {label: 'Item 4', key: '4'},
  {label: 'Item 5', key: '5'},
  {label: 'Item 6', key: '6'},
  {label: 'Item 7', key: '7'},
  {label: 'Item 8', key: '8'},
];

function Outcome() {
  return (
    <View style={styles.view}>
      <ScrollView>
        <View style={styles.title_view}>
          <Text style={styles.text}>SINH HOẠT</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>1.Khoản chi:</Text>
            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>2.Số tiền: </Text>
            <TextInput style={styles.textInput_box} />
          </View>
        </View>
        <View style={styles.row}>
          <CustomButton
            style={{height: 30, width: 100}}
            title={'Lưu'}
            //onPressFunction={onSaveData}
          />
        </View>

        <View style={[styles.title_view, {marginTop: 10}]}>
          <Text style={styles.text}>TÀI SẢN</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>1.Khoản chi:</Text>
            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>2.Số tiền: </Text>
            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>3.Ghi chú: </Text>
            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <CustomButton
            style={{height: 30, width: 100}}
            title={'Lưu'}
            //onPressFunction={onSaveData}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Income() {
  const [DataSearch, setDataSearch] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.view}>
      <View style={styles.title_view}>
        <Text style={styles.text}>SINH HOẠT</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.sub_row}>
          <Text style={{fontSize: 20, color: '#000000'}}>1.Khoản thu :</Text>
          <Dropdown
            style={styles.dropdown}
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            inputSearchStyle={styles.inputSearchStyle}
            //iconStyle={styles.iconStyle}
            data={data}
            search //show or hide the input seacrh
            maxHeight={300}
            labelField="label" //extract the data from data item
            valueField="key" // extract the primay key from data item
            placeholder={!isFocus ? 'Chon khoan thu' : '...'}
            searchPlaceholder="Search..."
            value={DataSearch}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDataSearch(item.value);
              //setIsFocus(false);
            }}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.sub_row}>
          <Text style={{fontSize: 20, color: '#000000'}}>2.Số tiền: </Text>
          <TextInput style={styles.textInput_box} />
        </View>
      </View>

      <View style={styles.row}>
        <CustomButton
          style={{height: 30, width: 100}}
          title={'Lưu'}
          //onPressFunction={onSaveData}
        />
      </View>

      <View style={styles.title_view}>
        <Text style={styles.text}>TÀI SẢN</Text>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function PostScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FF5C00',
        inactiveTintColor: '#CCCCCC',
        showLabel: true, // hide the name of the App
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
      }}>
      <Tab.Screen name="CHI TIÊU" component={Outcome} />
      <Tab.Screen name="THU NHẬP" component={Income} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  tab_view: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  title_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#FFEFB6',
    marginTop: 10,
    borderTopColor: '#FF5C00',
    borderBottomColor: '#FF5C00',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    //padding:10,
    backgroundColor: '#ffffff',
    //backgroundColor:'blue',
  },

  sub_row: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    //marginTop:10,
    height: 50,
    //marginHorizontal: 45,
    //backgroundColor:'pink',
    width: '90%',
    padding: 10,
    alignItems: 'flex-end',
  },

  textInput_box: {
    marginHorizontal: 10,
    height: 30,
    width: '60%',
    //backgroundColor:'pink',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: 2,
    fontSize: 20,
  },
  /// Drop down Style

  dropdown: {
    height: 30,
    width: '60%',
    borderColor: 'black',
    borderBottomWidth: 1,
    //borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
});
