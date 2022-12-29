import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Button, ScrollView} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
 
const SomeComponent = () => {
  const [backgroundColor, setBackgroundColor] = useState('red');
  const onSwipeUp = () => {
    setBackgroundColor('red')
    console.log('up');
  }
 
  const onSwipeDown = () => {
    setBackgroundColor('green')
    console.log('down');
  }
 
  const onSwipeLeft = () => {
    setBackgroundColor('blue')
    console.log('left');

  }
 
  const onSwipeRight = () => {
    setBackgroundColor('yellow')
    console.log('right');
  }
 
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  }
 
    return (
      
      <GestureRecognizer
        //onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={{
          flex: 1,
          backgroundColor: backgroundColor
        }}
        >
          <KeyboardAvoidingView style = {{flex:1}}>
            <ScrollView>
              <Text>Hello</Text>
            </ScrollView>
          </KeyboardAvoidingView>
      </GestureRecognizer>
    );
  }

 
export default SomeComponent;