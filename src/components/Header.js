import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  
} from "react-native";


const Header = (props) => {
  const [showModal, setShowModal] = useState(false);
  // const onPressFunctionUser = () =>{
  //     setShowModal(!showModal)
  // }

  return (
    <View style={styles.view}>
      <View style={styles.header_view}>
       
        <View style={styles.iconmoney_view}>
          <Image
            style={styles.icon_money}
            source={require("../assets/images/icon_money.png")}
            resizeMode="stretch"
          ></Image>
        </View>
        <Text style={styles.text}>MY ASSET</Text>
        <View style={styles.option_view}>
          <View style={styles.box}>
            <Pressable
              
              onPress={props.onPressFunctionSetting}
              android_ripple={{ color: "#bbbbbb" }}
            >
              {/* <AntDesign name="home" size={24} color="black" /> */}
              <Image
                style={{ height: 16, width: 5 }}
                source={require("../assets/images/Setting.png")}
                resizeMode="stretch"
              />
            </Pressable>
          </View>
          <View style={styles.box}>
            <Pressable
              onPress={props.onPressFunctionUser}
              android_ripple={{ color: "#bbbbbb" }}
            >
              {/* <AntDesign name="home" size={24} color="black" /> */}
              <Image
                style={styles.icon}
                source={require("../assets/images/user2.png")}
                resizeMode="stretch"
              />
            </Pressable>
          </View>

          <View style={styles.box}>
            <Pressable
              onPress={props.onPressFunctionBack}
              android_ripple={{ color: "#bbbbbb" }}
            >
              {/* <AntDesign name="back" size={24} color="black" /> */}
              <Image
                style={styles.icon}
                source={require("../assets/images/Back.png")}
                resizeMode="stretch"
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View header_view>
        {/* <Text style = {[{fontSize: {...props.fontSize}},styles.title]}>{props.title}</Text> */}

        <Text style={[{ fontSize: props.fontSize }, styles.title]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: 20, //
    //backgroundColor:'#2F88FF',
    //position:'relative'
  },

  header_view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },

  iconmoney_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'green',
    marginLeft: 10,
    height: "50%",
    width: "70%",
  },

  option_view: {
    flex: 3,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    //backgroundColor: 'red',
    marginLeft: 10,
    height: "50%",
    width: "70%",
  },

  box: {
    width: 30,
    height: 30,
    margin: 5,

    justifyContent: "center",
    alignItems: "center",
  },

  icon_money: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },

  title: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
  },

  icon: {
    width: 16,
    height: 16,
    color: "blue",
  },

  modal_view: {
    marginLeft: 170,
    marginTop: 50,
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    //alignItems: "center",
    //justifyContent: "center",
  },
});

export default Header;
