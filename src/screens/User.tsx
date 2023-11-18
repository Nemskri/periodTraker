import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function User() {
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(18);

  const handleSubmit = () => {
    console.log({ age, username });
  };

  return (
    <ImageBackground
      source={require("../assets/images/bgP.jpg")}
      height={hp(100)}
    >
      <SafeAreaView style={{ height: hp(100) }}>
        <ImageBackground
          source={require("../assets/images/user.jpg")}
          height={hp(50)}
        >
          <View style={{ height: hp(40), width: wp(100) }}>
            <Text
              style={{
                position: "absolute",
                bottom: 0,
                padding: hp(1),
                fontSize: hp(3),
                color: "#9a0b4e",
              }}
            >
              Welcome
            </Text>
          </View>
        </ImageBackground>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.form}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
          keyboardOpeningTime={0}
        >
          <View
            style={{
              display: "flex",
              rowGap: hp(5),
            }}
          >
            <View>
              <Text style={styles.label}>My Name:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(e) => (
                  setUserName(e), console.log({ username })
                )}
                // value={userName}
                // placeholder={userData.userName || "Name"}
              />
            </View>
            <View>
              <Text style={styles.label}>MY Age:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(e) => (setAge(+e), console.log({ age }))}
                // value={bankAccount}
                // placeholder={userData.bankAccount || "Bank Account Name/No."}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text
              style={{
                color: "#9a0b4e",
                fontSize: wp(6),
              }}
            >
              SUBMIT
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default User;

const styles = StyleSheet.create({
  form: {
    // backgroundColor: "#9a0b4e",
    height: hp(88),
    padding: wp(5),
    display: "flex",
    justifyContent: "flex-start",
    rowGap: wp(10),
  },
  label: {
    color: "white",
    fontSize: wp(5),
    textTransform: "uppercase",
  },
  input: {
    height: hp(5),
    color: "white",
    fontSize: hp(3),
    borderBottomWidth: hp(0.2),
    borderBottomColor: "white",
  },
  submitBtn: {
    backgroundColor: "white",
    paddingVertical: wp(1),
    borderRadius: wp(10),
    alignSelf: "center",
    width: wp(40),
    alignItems: "center",
  },
});
