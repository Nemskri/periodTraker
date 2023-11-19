import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/common/button";
import { deleteUserData, setUserData, userDataType } from "../redux/redux";
import {
  emptyAgeMessage,
  emptyNameMessage,
  loginMessage,
  logoutMessage,
  messageTime,
  primaryDanger,
  primaryDark,
  primaryLight,
  secondaryLight,
  userDelete,
  userFormLabelAge,
  userFormLabelName,
  userSubmitBtn,
  userTitle,
} from "../utils/constants";

function User({ navigation }) {
  type RootState = {
    userData: userDataType;
  };

  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [eventObj, setEventObj] = useState({
    message: "",
    status: 0,
  });

  let userData = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (username.length === 0 || age < 12 || age > 100) {
      setEventObj({
        message:
          username.length === 0
            ? emptyNameMessage
            : (age < 12 || age > 100) && emptyAgeMessage,
        status: 400,
      });
      return;
    }
    dispatch(setUserData({ userName: username, age: age }));
    setEventObj({
      message: `${loginMessage} ${username}.`,
      status: 200,
    });
  };

  const deleteUser = () => {
    dispatch(deleteUserData());
    setEventObj({
      message: `${logoutMessage} ${userData.userName}!`,
      status: 400,
    });
    setAge(0);
    setUserName("");
  };

  useEffect(() => {
    eventObj.status !== 0 &&
      setTimeout(() => {
        setEventObj({
          message: "",
          status: 0,
        });
      }, messageTime);
  }, [eventObj.status]);

  return (
    <ImageBackground
      source={require("../assets/images/bgP.jpg")}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor={primaryDark} />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/images/user.jpg")}
          style={styles.headerContainer}
        >
          <Text style={styles.headerText}>
            {userTitle}
            {userData.userName.length !== 0 &&
              ` Back, \n ${userData?.userName}`}
          </Text>
        </ImageBackground>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.formContainer}
          extraScrollHeight={230}
          scrollEnabled={true}
          enableAutomaticScroll={Platform.OS === "ios"}
          keyboardOpeningTime={250}
        >
          <View style={styles.formContainer}>
            <View>
              <Text style={styles.label}>{userFormLabelName} :</Text>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setUserName(e)}
                placeholder={
                  userData?.userName.length === 0
                    ? `${userFormLabelName} is...`
                    : userData.userName
                }
                placeholderTextColor={secondaryLight}
                editable={!(userData.age > 0 && userData.userName.length > 0)}
              />
            </View>
            <View>
              <Text style={styles.label}>{userFormLabelAge} :</Text>
              <TextInput
                style={styles.input}
                inputMode="numeric"
                onChangeText={(e) => setAge(+e)}
                editable={!(userData.age === 0 && userData.userName.length > 0)}
                placeholder={
                  userData.age === 0
                    ? `${userFormLabelAge} is...`
                    : `${userData.age.toString()} years`
                }
                placeholderTextColor={secondaryLight}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {userData.age > 0 && userData.userName.length > 0 ? (
              <Button
                onClick={deleteUser}
                bg={primaryDanger}
                textColor={secondaryLight}
                text={userDelete}
              />
            ) : (
              <Button
                onClick={handleSubmit}
                bg={secondaryLight}
                textColor={primaryDark}
                text={userSubmitBtn}
              />
            )}
            {eventObj.status !== 0 && (
              <Text style={styles.eventText}>{eventObj.message}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  headerContainer: {
    height: hp(40),
    width: wp(100),
  },
  headerText: {
    position: "absolute",
    bottom: 0,
    padding: hp(1),
    fontSize: hp(3),
    fontWeight: "600",
    color: primaryDark,
    backgroundColor: primaryLight,
    borderTopRightRadius: wp(4),
  },
  formContainer: {
    padding: wp(2),
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
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    rowGap: hp(2),
  },
  eventText: {
    color: secondaryLight,
    fontSize: hp(3),
    width: wp(100),
    textAlign: "center",
  },
});
