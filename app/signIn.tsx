import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "@/constants/responsive";
import { Colors } from "@/constants/Colors";
import RNInput from "@/components/RNInput";
import RNButton from "@/components/button";
import Spacer from "@/components/spacer";
import { useRouter } from "expo-router";
import RNHeader from "@/components/RNHeader";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const navigateToSignUp = () => {
    router.push("/signUp");
  };

  const navigateToDashboard = () => {
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="dark" />
      <View style={style.textContainer}>
        <Text style={style.title}>{"Sign in now"}</Text>
        <Spacer />
        <Text style={style.subtitle}>
          {"Please sign in to continue our app"}
        </Text>
      </View>
      <View style={style.inputContainer}>
        <RNInput
          placeholder="email"
          value={email}
          onChangeText={(val: string) => {
            setEmail(val);
          }}
        />
        <RNInput
          placeholder="password"
          value={password}
          onChangeText={(val: string) => {
            setPassword(val);
          }}
          secureTextEntry
        />
        <Spacer />
        <Spacer />
        <RNButton
          title={"Sign in"}
          onPress={function (): void {
            navigateToDashboard();
          }}
        />
        <Spacer />
        <Spacer />
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Colors.light.greyText }}>
            {"Don’t have an account? "}
            <Text
              onPress={navigateToSignUp}
              style={{ color: "#FF7029", fontWeight: "500" }}
            >
              {"Sign up"}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: "600",
    textAlign: "center",
  },
  inputContainer: {
    flex: 6,
    paddingHorizontal: moderateScale(16),
  },
  subtitle: {
    fontWeight: "400",
    fontSize: moderateScale(14),
    color: Colors.light.greyText,
  },
});
