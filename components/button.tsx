import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "@/constants/responsive";

interface RNButtonProps {
  title: String;
  onPress: () => void;
}

export default function RNButton({ title = "Button", onPress }: RNButtonProps) {
  return (
    <Pressable style={style.container} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
    borderRadius: moderateScale(16),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#ffffff",
  },
});
