import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import scale from '../constants/scale';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Income() {
  const [isMonth, setIsMonth] = useState(true);
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <View style={styles.big_row}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.month_container}>
              <TouchableOpacity style={styles.month_item}>
                <Text style={styles.text}>10/10/2022</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.month_container}>
              <TouchableOpacity style={styles.month_item}>
                <Text style={styles.text}>10/10/2022</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.month_container}>
              <TouchableOpacity style={styles.month_item}>
                <Text style={styles.text}>10/10/2022</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Text>Income</Text>
      </ScrollView>

      <View style={styles.bottom_tab}>
        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderRightWidth: 2,
              backgroundColor: isMonth ? '#ffeba3' : '#ffffff',
            },
          ]}
          onPress={() => setIsMonth(true)}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Entypo name="pie-chart" size={30} color={'orange'} />
          </View>
          <View style={{flex: 2}}>
            <Text style={[styles.text, {fontSize: scale(30)}]}>THÁNG</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderLeftWidth: 2,
              backgroundColor: !isMonth ? '#ffeba3' : '#ffffff',
            },
          ]}
          onPress={() => setIsMonth(false)}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../assets/images/linechart.png')}
              style={{height: 30, width: 30}}
              resizeMode="stretch"
            />
          </View>
          <View style={{flex: 2}}>
            <Text style={[styles.text, {fontSize: scale(30)}]}>NĂM</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  big_row: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  month_container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    //borderWidth:1,
  },

  month_item: {
    backgroundColor: 'hsl(47,100%,78%)',
    borderColor: '#ffc700',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
  },
  text: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },
  bottom_tab: {
    bottom: scale(100),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    //paddingBottom:10,
  },
  bottom_item: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'hsl(36,100%,52%)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
