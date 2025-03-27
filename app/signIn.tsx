import { View, Text, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from "react-native";
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

  const navigateToDashboard = () => {
    router.push("/(tabs)/home");
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigateToDashboard();
    } catch (error: any) {
      console.log("Sign-in error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
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
          placeholder="Email"
          value={email}
          onChangeText={(val: string) => {
            setEmail(val);
          }}
        />
        <RNInput
          placeholder="Password"
          value={password}
          onChangeText={(val: string) => {
            setPassword(val);
          }}
          secureTextEntry
        />
        <Spacer />
        {loading ? ( // Show loader if loading is true
          <ActivityIndicator size="large" color={Colors.light.primary} />
        ) : (
          <RNButton
            title={"Sign in"}
            onPress={handleSignIn} // Call handleSignIn on button press
          />
        )}
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
