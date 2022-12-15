import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import moment from 'moment';
import scale from '../constants/scale';
import { ShowPossessionTab } from '../Redux/ModalNumber';
import { useSelector, useDispatch } from 'react-redux';
import Outcome from './Outcome';
import Income from './Income';
import PossessionScreen from './PossessionScreen';

export default function StatisticsScreen({navigation}) {

  const PossessionIndex = useSelector(state => state.modalNumber.PossessionIndex);
  
  
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView style={styles.view}>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          fontSize={scale(25)}
          title="THỐNG KÊ"
          style={{ color: 'black', fontWeight: 'bold' }}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={PossessionIndex === 1 ? styles.tab_selected : styles.tab_style}
            onPress={() => dispatch(ShowPossessionTab(1))}
          >
            <Text style={styles.text}>Chi tiêu</Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={PossessionIndex === 2 ? styles.tab_selected : styles.tab_style}
            onPress={() => dispatch(ShowPossessionTab(2))}
          >
            <Text style={styles.text}>Thu nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={PossessionIndex === 3 ? styles.tab_selected : styles.tab_style}
            onPress={() => dispatch(ShowPossessionTab(3))}
          >
            <Text style={styles.text}>Tài sản</Text>
          </TouchableOpacity>
        </View>
        { PossessionIndex === 1 ?  (<Outcome/>): PossessionIndex === 2 ? (<Income/>) :(<PossessionScreen/>) }  
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  big_row: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  row: {
    flexDirection: 'row',
  },
  tab_style: {
    flex: 1,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  text: {
    fontSize: scale(24),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },

  tab_selected: {
    flex: 1,
    paddingVertical: 3,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#FFC700',
    backgroundColor: '#FFFFFF',
  },

  month_container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    //borderWidth:1,
  },

  month_item:{
    backgroundColor:'hsl(47,100%,78%)',
    borderColor: '#ffc700',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal:20,
    borderWidth: 2,

  },

});
