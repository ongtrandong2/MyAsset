import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import moment from 'moment';

export default function StatisticsScreen() {
  const [currentDate, setCurrentDate] = useState('')
  console.log(currentDate);
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Statistics Screen</Text>
      <Button 
        title='Press'
        onPress={()=>setCurrentDate(new Date())}
      />
      <Text>{moment(currentDate).format("YYYY-MM-DD")}</Text>
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: 20,
    color: '#000000',
  },
});
