import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, ImageBackground, SafeAreaView } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { primaryDark, secondaryLight } from "../utils/constants";
import { StatusBar } from "react-native";

function Cycles() {
  return (
    <ImageBackground
      source={require("../assets/images/bgL.jpg")}
      height={hp(100)}
    >
      <StatusBar backgroundColor={"#FC7FB6"} barStyle="dark-content" />
      <SafeAreaView
        style={{
          height: hp(100),
          justifyContent: "flex-start",
          rowGap: hp(10),
        }}
      >
        <ImageBackground
          source={require("../assets/images/log.jpg")}
          style={{ height: hp(60) }}
        />
        <TouchableOpacity
          style={{
            alignSelf: "center",
            height: hp(7),
            width: wp(70),
            backgroundColor: "#B80257",
            justifyContent: "center",
            borderRadius: wp(3),
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: hp(3),
              fontWeight: "700",
              color: secondaryLight,
            }}
          >
            ADD Period
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Cycles;
