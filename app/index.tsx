import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { moderateScale } from "@/constants/responsive";
import { Colors } from "@/constants/Colors";
import RNButton from "@/components/button";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();
  const navigateToSignIn = () => {
    router.push("/signIn"); // Replace with the path to your screen
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.image}
        source={require("@/assets/images/onboarding.png")}
        contentFit="fill"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Navigate Your Way</Text>
        <Text style={styles.subtitle}>
          Effortlessly find the best routes and explore your journey with
          confidence.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <RNButton title={"Get Started"} onPress={navigateToSignIn} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: moderateScale(500),
    marginTop: moderateScale(-20),
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: "bold",
  },
  textContainer: {
    justifyContent: "center",
    padding: moderateScale(30),
    alignItems: "center",
  },
  subtitle: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(12),
    lineHeight: 24,
    textAlign: "center",
    color: Colors.light.greyText,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(20),
  },
});
