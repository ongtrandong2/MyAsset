/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {
  HomeStack,
  PlanStack,
  StatisticsStack,
  PossessionStack,
  PostStack,
} from '../routes/StackNavigation';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
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
      tabBarOptions={{
        showLabel: false,
        style: {...styles.tab_style, ...styles.shadow},
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/home2.png')}
                resizeMode="stretch"
                style={{
                  width: 35,
                  height: 35,
                  opacity: focused ? 1 : 0.5,
                }}
              />

              <Text style={{color: focused ? '#000000' : '#748c94'}}>
                Tổng quan
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PlanScreen"
        component={PlanStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/plan.png')}
                resizeMode="stretch"
                style={{
                  width: 35,
                  height: 35,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={{color: focused ? '#000000' : '#748c94'}}>
                Kế hoạch
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PostScreen"
        component={PostStack}
        options={{
          tabBarIcon: ({focused}) => (
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
        component={StatisticsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/chart.png')}
                resizeMode="stretch"
                style={{
                  width: 35,
                  height: 35,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={{color: focused ? '#000000' : '#748c94'}}>
                Thống kê
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PossessionScreen"
        component={PossessionStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon_view}>
              <Image
                source={require('../assets/images/shop.png')}
                resizeMode="stretch"
                style={{
                  width: 35,
                  height: 35,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={{color: focused ? '#000000' : '#748c94'}}>
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

    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 15,

    elevation: 0,
    backgroundColor: '#FFC700',

    height: 90,
  },
  shadow: {
    //shadowColor:'#7F5Df0',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 20,
    },

    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },

  icon_view: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
});

export default Tabs;
