import React from 'react';
import {Pressable, StyleSheet, Text, Touchable} from 'react-native';
import scale from '../constants/scale';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      style={({pressed}) => [
        {backgroundColor: pressed ? props.colorPress : props.colorUnpress},
        styles.button,
        {...props.style},
      ]}>
      <Text style={{...props.text_style}}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomButton;
