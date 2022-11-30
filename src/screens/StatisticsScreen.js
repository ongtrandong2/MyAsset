import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import moment from 'moment';

export default function StatisticsScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())
  //console.log(currentDate);
  const Check = ()=>{
    

    setCurrentDate(moment(new Date()).format("YYYY-MM-DD"));
    const d = new Date("2022-03-25");
    const d1 =new Date(currentDate);
    
    //console.log(d1.getTime());
    //console.log(d.getTime());
    
    if(d1.getTime() > d.getTime())
    {
      console.log('A');
    }
    else console.log('B');
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Statistics Screen</Text>
      <Button 
        title='Press'
        //onPress={()=>setCurrentDate(new Date())}
        onPress={Check}
      />
      <Text>{moment(currentDate).format("YYYY-MM-DD ")}</Text>
      
     
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
