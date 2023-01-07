import React , {useState}from 'react';
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Pressable} from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { setShowNote } from '../Redux/PossessionData';

import scale from '../constants/scale';

export default function PossessionScreen() {
  const possessionData = useSelector(state => state.possessionData);
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        {possessionData.length === 0 ? (
          <View style = {styles.big_row}>
            <Text style = {[styles.text,{color: 'grey'}]}>Chưa có tài sản!</Text>
          </View>
        ) : (
        <>
          {possessionData.map((item, index) => {
            return (

              <View style={styles.big_row} key={index}>
                <Pressable
                  //onPress={() => onVisible(item)}
                  onPress = {() => dispatch(setShowNote(index))}
                  style={({pressed}) => [
                    styles.row,
                    {backgroundColor: pressed ? '#FF9900' : '#FFEBA3'},
                  ]}>
                  <View style={styles.name_view}>
                    <Text style={styles.text}>
                      {Number(index) + 1}. {item.name}
                    </Text>
                  </View>
  
                  <View style={styles.money_view}>
                    <Text style={styles.text}>{item.value} VND</Text>
                  </View>
                </Pressable>
  
                {item.showNote === true && (
                  <View
                    style={[
                      styles.row,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <Text style={styles.text}>Ghi chú: {item.note} </Text>
                  </View>
                )}
              </View>
            );
          })}
        </>
        )}
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 10,
  },

  text: {
    fontSize: scale(16),
    color: '#000000',
    fontFamily: 'Inter-Medium'
  },

  row: {
    borderRadius: 20,
    backgroundColor: '#FFEBA3',
    width: '90%',
    //height: scale(50),
    flexDirection: 'row',
    margin: scale(5),
    justifyContent: 'center',
    padding: scale(10),
  },

  big_row: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //justifyContent: 'space-between',
    //backgroundColor:'pink',
  },

  name_view: {
    flex: 0.5,
    paddingHorizontal: 5,
    //backgroundColor:'pink',
    justifyContent: 'center',
  },

  money_view: {
    flex: 0.5,
    //paddingHorizontal: 5,
    //backgroundColor:'blue',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
