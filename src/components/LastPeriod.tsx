import React, { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function LastPeriod({ onDateSelect }) {
  return (
    <View
      style={{
        alignItems: "center",
        rowGap: hp(3),
      }}
    >
      <Calendar
        onDayPress={onDateSelect}
        style={{
          height: hp(60),
          width: wp(100),
        }}
      />
    </View>
  );
}

export default LastPeriod;
