import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Entypo from 'react-native-vector-icons/Entypo';

const DropDownComponent = ({
  width,
  selectedItem,
  setSelectedItem,
  list,
  heightDropDown,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const animatedArrow = useRef(new Animated.Value(0)).current;
  let rotateArrow = animatedArrow.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });
  let transY = animatedArrow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  })
  //console.log(transY);
  //console.log(animatedArrow);
  //console.log(openDropDown)
  
  useEffect(() => {
    if (openDropDown === true) {
        Animated.timing(animatedArrow, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    } else {
        Animated.timing(animatedArrow, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }
}, [openDropDown]);

  return (
    <View
      style={{
        position: "absolute",
        top: -15,
        right: 0, // chnage this value to fit the screen
        width,
        zIndex: 999,
      }}>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          backgroundColor: '#fff',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: isFocus ? '#000' : 'hsl(0,0%,70%)',
        }}>
        <TextInput
          style={{
            color: '#000',
            fontSize: 16,
            width: '80%',
            paddingVertical: 0,
            paddingHorizontal: 10,
          }}
          value={selectedItem}
          onChangeText={setSelectedItem}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <Pressable
          style={{
            marginRight: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          //onPress={handleArrowAnimation}
          onPress={() => { setOpenDropDown(!openDropDown) }}
          >
          <Animated.View
            style={{
              transform: [{ rotate: rotateArrow }]
            }}>
            <Entypo
              name='chevron-down'
              color={'#000'}
              size={20}
            />
          </Animated.View>
        </Pressable>
      </View>

      {openDropDown ? (
        <Animated.View
          style = {{
            transform: [{ translateY: transY}]
          }}>
          <ScrollView
            style={{
              //marginTop: 10,
              height: heightDropDown,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'hsl(0,0%,60%)',
            }}>
            {list.map((item, index) => {
              //if (item.value.toLowerCase().indexOf(selectedItem.toLowerCase()) > -1)
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingVertical: 8,
                    }}
                    onPress={() => setSelectedItem(item.value)}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'hsl(0,0%,50%)'
                      }}>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                )
            })}
          </ScrollView>
        </Animated.View>
      ) : null}
    </View>

  );
};

export default DropDownComponent;
