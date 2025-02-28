import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "@/constants/responsive";
import { Colors } from "@/constants/Colors";
import RNInput from "@/components/RNInput";
import RNButton from "@/components/button";
import Spacer from "@/components/spacer";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const navigateToSignUp = () => {
    router.back();
  };

  const firebaseConfig = {
    apiKey: "AIzaSyBSo-VpjZDui9OlQy5cc0r_XIWZZVrjAMw",
    authDomain: "pathseeker-80008.firebaseapp.com",
    //databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "pathseeker-80008",
    //messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:164659582194:android:9ccacde869c012445eac6b",
  };

  // Initialize Firebase only if not already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized
  }

  async function loginGoogle(email: string, pass: string) {
    try {
      const user = await 
        auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("🚀 ~ loginGoogle ~ user:", user);
    } catch (error) {
      console.log("🚀 ~ loginGoogle ~ error:", error);
    }
  }
  return (
    <SafeAreaView style={style.container}>
      <View style={style.textContainer}>
        <Text style={style.title}>{"Sign up now"}</Text>
        <Spacer />
        <Text style={style.subtitle}>
          {"Please fill the details and create account"}
        </Text>
      </View>
      <View style={style.inputContainer}>
        <RNInput
          placeholder="name"
          value={name}
          onChangeText={(val: string) => {
            setName(val);
          }}
        />
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
          title={"Sign up"}
          onPress={function (): void {
            loginGoogle(email, password);
          }}
        />
        <Spacer />
        <Spacer />
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Colors.light.greyText }}>
            {"Already have an account "}
            <Text
              onPress={navigateToSignUp}
              style={{ color: "#FF7029", fontWeight: "500" }}
            >
              {"Sign in"}
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
