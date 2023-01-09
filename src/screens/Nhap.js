import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, Animated } from 'react-native';
import { interpolate } from 'react-native-reanimated';


const { width } = Dimensions.get('screen');

// const Data_Image = [
//   {
//     key: 1,
//     source: require('../assets/images/homescreen.png')
//   },
//   {
//     key: 2,
//     source: require('../assets/images/homescreen.png')
//   },
//   {
//     key: 3,
//     source: require('../assets/images/homescreen.png')
//   },
//   {
//     key: 4,
//     source: require('../assets/images/homescreen.png')
//   },
// ]
const Data_Image = [
  {
    key: 1,
    source: 'https://timo.vn/wp-content/uploads/cach-ghi-so-chi-tieu-trong-gia-dinh.jpg',
  },
  {
    key: 2,
    source: 'https://img.freepik.com/premium-vector/cute-money-bag-with-dollar-coin-cartoon_138676-1488.jpg',
  },
  {
    key: 3,
    source: 'https://img.freepik.com/premium-vector/cute-wallet-money-cartoon-vector-icon-illustration-business-finance-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1446.jpg?w=2000',
  },
  {
    key: 4,
    source: 'https://static.vecteezy.com/system/resources/previews/003/226/897/original/cute-and-happy-wallet-with-money-cartoon-illustration-vector.jpg'
  },
]


const Nhap = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, width);
  return (
    <View style={styles.view}>
      <View style={{
        marginTop: 10
      }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >

          {Data_Image.map((item, index) => {
            let scale = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp'
            });

            return (
              
                <View style={styles.container} key={index}>

                  <Animated.Image
                    source={{uri: item.source}}
                    style={{
                      height: 300,
                      width: width*0.6 ,
                      borderRadius: 20,
                      resizeMode: 'stretch',
                      transform: [{ scale: scale }],
                      borderWidth: 1,
                      //borderColor: 'hsl(0,0%,60%)'
                    }}
                  />
                </View>
              
            )
          })}

        </ScrollView>
      </View>
      <View
        style={{
          bottom: 30,
          position: 'absolute',
          alignSelf: 'center',
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {Data_Image.map((item, index) => {
            let opacity = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.2, 1, 0.2],
              extrapolate: 'clamp'
            })
            return (
              <Animated.View
                key={index}
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: 'hsl(36,100%,50%))',
                  marginHorizontal: 5,
                  opacity: opacity,

                }}
              />
            )
          })}
        </View>

      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',

  },
  container: {
    width,
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 20,
    //borderWidth: 1,
    //paddingVertical: 20
  },

})
export default Nhap;