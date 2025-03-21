import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "@/constants/responsive";
import { Colors } from "@/constants/Colors";
import RNInput from "@/components/RNInput";
import RNButton from "@/components/button";
import Spacer from "@/components/spacer";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const navigateToSignUp = () => {
    router.push("/signUp");
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.push("/(tabs)/home"); // Navigate to home/dashboard
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="dark" />
      <View style={style.textContainer}>
        <Text style={style.title}>Sign in now</Text>
        <Spacer />
        <Text style={style.subtitle}>Please sign in to continue our app</Text>
      </View>
      <View style={style.inputContainer}>
        <RNInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <RNInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Spacer />
        <RNButton title="Sign in" onPress={handleSignIn}  />
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Colors.light.greyText }}>
            Don’t have an account?{" "}
            <Text onPress={navigateToSignUp} style={{ color: "#FF7029", fontWeight: "500" }}>
              Sign up
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
