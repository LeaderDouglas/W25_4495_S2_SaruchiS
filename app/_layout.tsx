import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserInterestsProvider } from "@/context/useInterestProvider";

// Firebase (optional, uncomment if using Firestore)
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash screen after fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Example Firestore integration (optional)
  const initializeFirestoreData = useCallback(async () => {
    try {
      // await addDoc(collection(db, "users"), {
      //   name: "John Doe",
      //   createdAt: new Date(),
      // });
      console.log("Firestore initialized.");
    } catch (error) {
      console.error("Error initializing Firestore: ", error);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      initializeFirestoreData(); // optional
    }
  }, [fontsLoaded]);

  // Handle font loading error
  if (fontError) {
    console.error("Font loading error:", fontError);
    return null;
  }

  // Show nothing until fonts are ready
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <UserInterestsProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signIn" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </UserInterestsProvider>
    </ThemeProvider>
  );
}
