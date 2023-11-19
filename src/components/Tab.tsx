import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { userDataType } from "../redux/redux";
import Calendar from "../screens/Calendar";
import Cycles from "../screens/Cycles";
import User from "../screens/User";
import { primaryDark } from "../utils/constants";

function Tab() {
  type RootState = {
    userData: userDataType;
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Me"
      backBehavior="history"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource: ImageSourcePropType;
          if (route.name === "Home") {
            iconSource = require("../assets/icons/Home.png");
          } else if (route.name === "Settings") {
            iconSource = require("../assets/icons/SettingsIcon.png");
          } else {
            iconSource = require("../assets/icons/InsightsIcon.png");
          }
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(15),
                height: hp(8),
              }}
            >
              <Image
                style={{
                  width: wp(7),
                  height: wp(7),
                  tintColor: focused ? "#9a0b4e" : "#B2BEB5",
                }}
                source={iconSource}
              />
            </View>
          );
        },
        tabBarStyle: {
          backgroundColor: "#FC7FB6",
          height: hp(12),
          padding: hp(1),
          elevation: 5,
        },
        tabBarIconStyle: {},
        tabBarLabelStyle: {
          fontSize: wp(4),
          padding: hp(1),
          paddingBottom: hp(1),
          fontWeight: "800",
        },
        tabBarActiveTintColor: primaryDark,
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          // tabBarLabel: "Insights",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Cycles"
        component={Cycles}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          // tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Me"
        component={User}
        options={{
          headerShown: false,
          // tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}
export default Tab;
