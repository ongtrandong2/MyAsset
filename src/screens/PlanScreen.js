import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import HeaderTab from '../components/Header_Tab';

export default function PlanScreen({navigation}) {
  return (
    <View style={styles.view}>
      <HeaderTab 
          onPressHandler={() => navigation.navigate('InfoScreen')}
          fontSize={20}
          title="KẾ HOẠCH"   
      />
      
      <Text style={styles.text}>Plan Screen</Text>
      <View style = {styles.floatingBtn_view}>
        <Pressable
          //onPress
          //android_ripple={{color: '#CCFFFF'}}
          //style={({pressed}) => [{backgroundColor: pressed ? '#0099FF' : 'white'}]}
        >
          
            <Image
              source={require('../assets/images/pen.png')}
              resizeMode = "stretch"
            />
           
        </Pressable>
      </View>
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

  floatingBtn_view:{
    position:'absolute',
    //left:0,
    right:10,
    bottom:130,
  },
  circle:{
    width:50,
    height:50,
    borderRadius:50,
    borderColor:'black',
    borderWidth:1,


  },
});
