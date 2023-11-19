import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LastPeriod from "../components/LastPeriod";
import { primaryDark, secondaryLight } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { periodDataType, setPeriodData } from "../redux/redux";

type rootState = {
  periodData: periodDataType;
};

function Cycles() {
  const [calendar, setCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dispatch = useDispatch();
  const lastReduxDate = useSelector(
    (state: rootState) => state?.periodData?.lastPeriodDate
  );

  const handleDateSelect = (date: any) => {
    console.log({ date });
    setSelectedDate(date.dateString);
    dispatch(setPeriodData({ lastPeriodDate: date.dateString }));
    setCalendar(false);
  };

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
        <View style={{ display: "flex", rowGap: hp(2) }}>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              height: hp(7),
              width: wp(70),
              backgroundColor: "#B80257",
              justifyContent: "center",
              borderRadius: wp(3),
            }}
            onPress={() => setCalendar(true)}
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
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(3),
                fontWeight: "400",
                color: primaryDark,
              }}
            >
              {`I had my Last Period on`}
              {selectedDate
                ? ` ${selectedDate}`
                : lastReduxDate
                ? ` ${lastReduxDate}`
                : ` ?`}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      {calendar && (
        <View
          style={{
            position: "absolute",
            height: hp(100),
            width: wp(100),
          }}
        >
          <LastPeriod onDateSelect={handleDateSelect} />
        </View>
      )}
    </ImageBackground>
  );
}

export default Cycles;
