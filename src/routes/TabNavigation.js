import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import PossessionScreen from '../screens/PossessionScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import TabPost from './TabPost';
import scale from '../constants/scale';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      //top: -30,
      top:-10,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 35,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      tabBarOptions={{
        showLabel: false,
        style: {...styles.tab_style, ...styles.shadow},
        keyboardHidesTabBar: true,
        tabBarHideOnKeyboard :true, 
      }}

      header={{}}
      >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/home2.png')}
                resizeMode="stretch"
                style={{
                  width: scale(50),
                  height: scale(50),
                  opacity: focused ? 1 : 0.5,
                }}
              />

              <Text style={[{color: focused ? '#000000' : '#748c94'}, styles.text]}>
                Tổng quan
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PlanScreen"
        component={PlanScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/plan.png')}
                resizeMode="stretch"
                style={{
                  width: scale(50),
                  height: scale(50),
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={[{color: focused ? '#000000' : '#748c94'},styles.text]}>
                Kế hoạch
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PostScreen"
        component={TabPost}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/plusItem.png')}
              resizeMode="stretch"
              style={{
                width: 70,
                height: 80,
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/chart.png')}
                resizeMode="stretch"
                style={{
                  width: scale(50),
                  height: scale(50),
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={[{color: focused ? '#000000' : '#748c94'},styles.text]}>
                Thống kê
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PossessionScreen"
        component={PossessionScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/shop.png')}
                resizeMode="stretch"
                style={{
                  width: scale(50),
                  height: scale(50),
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={[{color: focused ? '#000000' : '#748c94'}, styles.text]}>
                Tài sản
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab_style: {
    position: 'absolute',
    bottom: scale(20),
    left: scale(20),
    right: scale(20),
    borderRadius: 15,
    elevation: 0,
    //backgroundColor: '#FFC700',
    backgroundColor: 'yellow',
    height: scale(100),
    width:'90%'
  },
  shadow: {
    //shadowColor:'#7F5Df0',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: scale(20),
    },

    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },

  icon_view: {
    alignItems: 'center',
    justifyContent: 'center',
    //top: scale(5),
  },
  text:{
    fontSize:scale(15),
  },
});

export default Tabs;
