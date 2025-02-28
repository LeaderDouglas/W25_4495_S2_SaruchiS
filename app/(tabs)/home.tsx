import { HomeCategory, HomeTopBar, JobRecommendation } from "@/components/home";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeTopBar />
      <Spacer />
      <HomeCategory />
      <Spacer />
      <JobRecommendation />
    </SafeAreaView>
  );
}
