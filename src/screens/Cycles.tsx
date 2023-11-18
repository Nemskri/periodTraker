import React from "react";
import { Text, View, ImageBackground, SafeAreaView } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function Cycles() {
  return (
    <ImageBackground
      source={require("../assets/images/bgP.jpg")}
      height={hp(100)}
    >
      <SafeAreaView style={{ height: hp(100) }}></SafeAreaView>
    </ImageBackground>
  );
}

export default Cycles;
