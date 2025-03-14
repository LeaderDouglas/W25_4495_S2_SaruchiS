import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "@/constants/responsive";
import { Colors } from "@/constants/Colors";
import RNInput from "@/components/RNInput";
import RNButton from "@/components/button";
import Spacer from "@/components/spacer";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const navigateToSignIn = () => router.back();

  async function signUpWithEmail(email: string, password: string) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log("User signed up:", userCredential.user);
      Alert.alert("Success", "Sign-up successful!");

      // Clear fields after successful signup
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log("Sign-up error:", error);
      Alert.alert("Error", error.message);
    }
  }

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    await signUpWithEmail(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{"Sign up now"}</Text>
        <Spacer />
        <Text style={styles.subtitle}>{"Please fill the details and create an account"}</Text>
      </View>
      <View style={styles.inputContainer}>
        <RNInput placeholder="Name" value={name} onChangeText={setName} />
        <RNInput placeholder="Email" value={email} onChangeText={setEmail} />
        <RNInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Spacer />
        <RNButton title={"Sign up"} onPress={handleSignUp} />
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Colors.light.greyText }}>
            {"Already have an account? "}
            <Text onPress={navigateToSignIn} style={{ color: "#FF7029", fontWeight: "500" }}>
              {"Sign in"}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: "600",
    textAlign: "center",
  },
  inputContainer: {
    flex: 3,
    paddingHorizontal: moderateScale(16),
  },
  subtitle: {
    fontWeight: "400",
    fontSize: moderateScale(14),
    color: Colors.light.greyText,
  },
});
