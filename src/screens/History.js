import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import HeaderDrawer from "../components/Header_Drawer";
import scale from "../constants/scale";

export default function History () {
  return (
    <KeyboardAvoidingView style = {styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          fontSize={scale(25)}
          title="LỊCH SỬ"
          style={{ color: 'black', fontWeight: 'bold' }}
        />
          <View style={styles.title_view}>
            <Text style ={styles.text}>Hôm nay 12/12/2022</Text>
            <Text style = {styles.text}>Thu: 100</Text>
            <Text style = {styles.text}>Chi: 50</Text>
          </View>
          
          <View style={styles.item_view}>
            <Text style={styles.text}>1.An uong</Text>
            <Text style={styles.text}>5000</Text>
          </View>
          <View style={styles.item_view}>
            <Text style={styles.text}>1.An uong</Text>
            <Text style={styles.text}>5000</Text>
          </View>

          <View style={styles.title_view}>
            <Text style ={styles.text}>Hôm nay 12/12/2022</Text>
            <Text style = {styles.text}>Thu: 100</Text>
            <Text style = {styles.text}>Chi: 50</Text>
          </View>
          
          <View style={styles.item_view}>
            <Text style={styles.text}>1.An uong</Text>
            <Text style={styles.text}>5000</Text>
          </View>
          <View style={styles.item_view}>
            <Text style={styles.text}>1.An uong</Text>
            <Text style={styles.text}>5000</Text>
          </View>

          
          
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    title_view:{
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      width: '100%',
      backgroundColor:'#ffeba3',
      padding: 5,
    },
    item_view:{
      flexDirection:'row',
      alignSelf: 'center',
      justifyContent:'space-between',
      alignItems: 'center',
      width: '100%',
      padding:8,
      backgroundColor:'#ffffff',
      borderBottomWidth:1,
      borderBottomColor:'#000000',
      paddingHorizontal:10,
    },
    text:{
      fontSize:scale(15),
      color:'#000000',
    }

})

