
import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


export default function App(){
  return(
    <View style = {styles.view}>
    <Text>Bezier Line Chart Hello</Text>
    <LineChart
      ////
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul"],
        datasets: [
          {
            data: [1, 3, 7, 2, 8, 5, 4],
            //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth:2, // do dam duong di
          }
        ],
        //legend: ["Rainy Days"] //Chu thich
      }}
      //width={Dimensions.get("window").width} // from react-native

      //
      width={350}
      height={220}
      yAxisLabel="$" // Pre-fix 
      yAxisSuffix="k" //  Suf-fix
      yAxisInterval={1} // optional, defaults to 1

      //
      chartConfig={{
        
        //backgroundColor: "#e26a00",
        backgroundGradientFrom: "pink",
        backgroundGradientTo: "pink",
        // backgroundGradientFrom: "#fb8c00",
        // backgroundGradientTo: "#ffa726",
        //fillShadowGradientFrom:'black',
        //fillShadowGradientTo:'black',
        //useShadowColorFromDataset:false,
        decimalPlaces: 0, // optional, defaults to 2dp 
        color: (opacity = 1) => `rgba(255, 2, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 2, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6", //ban kinh
          strokeWidth: "2", 
          stroke: "#ffa726",
          //stroke: "#000000" // duong vien
        }
      }}
      //bezier //curve
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>
  )
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
})
// const chartConfig = {
//   backgroundGradientFrom: "#1E2923",
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: "#08130D",
//   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   strokeWidth: 2, // optional, default 3
//   barPercentage: 0.5,
//   useShadowColorFromDataset: false // optional
// };




