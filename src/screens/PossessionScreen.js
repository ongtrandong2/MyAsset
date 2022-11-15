import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import HeaderTab from '../components/Header_Tab';
import {useSelector, useDispatch} from 'react-redux';
import {addPossession, removePossession} from '../Redux/PossessionData';

export default function PossessionScreen({navigation}) {

  const possessionData = useSelector((state)=>state.possessionData);
  const dispatch = useDispatch();


  return (
    <View style={styles.view}>
      <HeaderTab
        onPressHandler={() => navigation.navigate('InfoScreen')}
        fontSize={20}
        title="TÀI SẢN"
      />
      <ScrollView>
          <View style={styles.big_row}>
          {possessionData.map((item,index)=>{
                return(
                  <View style={styles.row} key={index}>
                    <View style = {styles.name_view}>
                      <Text style={styles.text}>{Number(item.key)+1}. {item.name}</Text>
                    </View>
                    <View style={styles.money_view}>
                      <Text style={styles.text}>{item.value} vnđ</Text>
                    </View>
                  </View>
                )
            })}
           
          </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection:'column',
  },

  text: {
    fontSize: 20,
    color: '#000000',
  },

  row:{
    
    borderRadius:5,
    backgroundColor:'#FFEBA3',
    width:'90%',
    height:40,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    padding:5,
    
   
  },

  big_row:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    justifyContent: 'space-between',
  },

  name_view: {
    flex: 0.5,
    paddingHorizontal: 5,
    //backgroundColor:'pink',
    justifyContent:'center'
  },

  money_view: {
    flex: 0.5,
    //paddingHorizontal: 5,
    //backgroundColor:'blue',
    alignItems: 'flex-end',
    justifyContent:'center',
    
  },



});
