import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import scale from '../constants/scale';
import {useSelector, useDispatch} from 'react-redux';
import {ShowModal} from '../Redux/ModalNumber';

const CustomTabBarItem = props => {
  if (
    props.Index === 0 ||
    props.Index === 1 ||
    props.Index === 3 ||
    props.Index === 4
  ) {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
        <Image
          source={props.icon}
          resizeMode="stretch"
          style={{height: 40, width: 40}}
          opacity={props.isFocus === props.name ? 1 : 0.5}
        />
        <Text style={styles.text}>{props.label}</Text>
      </TouchableOpacity>
    );
  } else if (props.Index === 2) {
    {
      /* flex: 0.5 */
    }
    return (
      <View style={[styles.itemContainer]}>
        <TouchableOpacity
          style={styles.plusButtonContainer}
          onPress={props.onPress}>
          <Image
            source={props.icon}
            resizeMode="stretch"
            style={{height: 80, width: 70}}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const CustomTabBar = props => {
  //console.log(props.state.routes);
  const {routes} = props.state;
  //console.log(routes);

  const [selected, setSelected] = useState('HomeScreen');
  const animation = useRef(new Animated.Value(0)).current;
  const tabState = useSelector(state => state.tabState.value);

  const dispatch = useDispatch();
  //const isShowModal = useSelector(state=>state.modalNumber.IsShowModal)
  //console.log(isShowModal);

  const handleOnPress = (currentTab, index) => {
    if (props.state.index !== index && index !== 2) {
      setSelected(currentTab);
      props.navigation.navigate(currentTab);
    } else if (props.state.index !== index && index === 2) {
      dispatch(ShowModal(true));
    }
  };
  const renderImage = currentIndex => {
    if (currentIndex === 0) return require('../assets/images/home2a.png');
    else if (currentIndex === 1) return require('../assets/images/plan.png');
    else if (currentIndex === 2)
      return require('../assets/images/plusItem.png');
    else if (currentIndex === 3) return require('../assets/images/chart.png');
    else if (currentIndex === 4) return require('../assets/images/history.png');
  };

  const TabBarAnimation = () => {
    if (tabState) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 120,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    TabBarAnimation();
  }, [tabState]);

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: animation}]}]}>
      <View style={styles.tabBarContainer}>
        {routes.map((item, index) => (
          <CustomTabBarItem
            name={item.name}
            label={item.params.label}
            key={item.key}
            icon={renderImage(index)}
            onPress={() => handleOnPress(item.name, index)}
            isFocus={selected}
            Index={index}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //paddingBottom:15,
    width: '100%',
    //height:scale(130),
    //height:'13%',
    zIndex: 999,
    //borderWidth:1,
  },
  tabBarContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'hsl(47,100%,66%)',
    width: '100%',
    height: scale(100),
    zIndex: 999,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  plusButtonContainer: {
    //top: scale(-30),
    bottom: 5,
    //alignItems: 'center',
    justifyContent: 'center',
    //position: 'absolute',
  },
  text: {
    fontSize: scale(13),
    //fontFamily:'Lato-Bold',
    fontFamily: 'Inter-Medium',
    color: 'black',
  },
});
export default CustomTabBar;
