import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import PlanScreen from "../screens/PlanScreen";
import PossessionScreen from "../screens/PossessionScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style:{...styles.tab_style,...styles.shadow}
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options = {{

                    tabBarIcon:({focused})=>(
                        <View style = {styles.icon_view}>
                            <Image
                                source = {require('../assets/images/home2.png')}
                                resizeMode = "stretch"
                                style ={{
                                    width:25,
                                    height:25,
                                    opacity:focused ? 1: 0.5

                                }}
                            />

                            <Text style = {{color: focused? "#000000" : "#748c94"}}>Tổng quan</Text>
                        </View>
                    ),

                }}

            />

            <Tab.Screen
                name = "PlanScreen"
                component={PlanScreen}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style = {styles.icon_view}>
                            <Image
                                source = {require('../assets/images/plan.png')}
                                resizeMode = "stretch"
                                style ={{
                                    width:25,
                                    height:25,
                                    opacity:focused ? 1 : 0.8,
                                   
                                }}
                            />
                            <Text style = {{color: focused? "#000000" : "#748c94"}}>Kế hoạch</Text>
                        </View>
                    )

                }}
            />

            <Tab.Screen
                name="StatisticsScreen"
                component={StatisticsScreen}
                options={{
                    tabBarIcon:({focused}) =>(
                        <View style={styles.icon_view}>
                            <Image
                                source={require('../assets/images/chart.png')}
                                resizeMode="stretch"
                                style={{
                                    width:25,
                                    height:25,
                                    opacity: focused ? 1: 0.8,
                                    
                                }}
                            />
                            <Text style = {{color: focused? "#000000" : "#748c94" }}>Thống kê</Text>

                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="PossessionScreen"
                component={PossessionScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style = {styles.icon_view}>
                            <Image
                                source={require('../assets/images/shop.png')}
                                resizeMode="stretch"
                                style={{
                                    width:25,
                                    height:25,
                                    opacity: focused ? 1 : 0.8
                                }}
                            />
                            <Text style={{color: focused? "#000000":"#748c94"}}>Tài sản</Text>
                        </View>
                    )
                }}
            />

        </Tab.Navigator>
    )

}

const styles = StyleSheet.create({
    tab_style:{
        position:'absolute',

        bottom:25,
        left:20,
        right:20,
        borderRadius:15,

        elevation:0,
        backgroundColor:'#FFC700',
       
        height:90,
    },
    shadow:{
        shadowColor:'#7F5Df0',
        shadowOffset:{
            width:0,
            height:10,
        },

        shadowOpacity:0.2,
        shadowRadius:3.5,
        elevation:5,
    },

    icon_view:{
        alignItems:'center',
        justifyContent:'center',
        top:10,

    },


})

export default Tabs;