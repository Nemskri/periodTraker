import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface ButtonProps {
  bg: string;
  textColor: string;
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ bg, textColor, text, onClick }) => {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: bg,
      borderRadius: wp(8),
      width: wp(25),
      padding: hp(1),
    },
    text: {
      textAlign: "center",
      color: textColor,
      fontSize: wp(4.5),
      fontWeight: "700",
    },
  });
  return (
    <TouchableOpacity style={styles.btn} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
