import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "@/constants/responsive";

export default function ProfileComponent(user: {
  firstName: string;
  lastName: string;
  profileImage: any;
}) {
  if (user.profileImage) {
    return (
      <Image source={{ uri: user.profileImage }} style={styles.avatarImage} />
    );
  }
  return (
    <View style={styles.avatarText}>
      <Text style={styles.avatarTextContent}>
        {user.firstName[0]}
        {user.lastName[0]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarText: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: 40,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTextContent: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: 40,
  },
});
