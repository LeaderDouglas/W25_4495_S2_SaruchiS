import { moderateScale } from "@/constants/responsive";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  style?: any;
}

export default function RNInput({
  placeholder,
  onChangeText,
  value,
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="gray"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(15),
  },
  input: {
    backgroundColor: "#F7F7F9",
    borderRadius: moderateScale(14),
    height: moderateScale(56),
    paddingHorizontal: moderateScale(16),
    fontSize: moderateScale(16),
  },
});
