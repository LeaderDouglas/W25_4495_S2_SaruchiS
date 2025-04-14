import { HomeCategory, HomeTopBar, JobRecommendation } from "@/components/home";
import Spacer from "@/components/spacer";
import { moderateScale } from "@/constants/responsive";
import { useEffect, useState } from "react";
import { SafeAreaView, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  JobRecommendationProps,
  generateJobRecommendations,
} from "@/utils/aiData";
import { useUserInterests } from "@/context/useInterestProvider";
// Import the context

export default function HomeScreen() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [jobRecommendations, setJobRecommendations] = useState<
    JobRecommendationProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  console.log(jobRecommendations)
  // Use the UserInterests context
  const { interests, fetchUserInterests } = useUserInterests();

  // Fallback default interests
  const DEFAULT_INTERESTS = [
    "Software Development",
    "Cloud Computing",
    "Product Management",
  ];

  async function fetchRecommendations(interests?: string[]) {
    // Use provided interests or fallback to default
    const interestsToUse = interests?.length ? interests : DEFAULT_INTERESTS;

    setIsLoading(true);
    try {
      const apiKey = "AIzaSyAcQ-wdzHZhVaXS1mSS6rjxRz4vQFHCZCc";

      const recommendations = await generateJobRecommendations(
        interestsToUse,
        apiKey,
        userDetails?.skills || "",
        userDetails?.education || "",
        userDetails?.otherDetails || "",
        userDetails?.country || ""
      );

      setJobRecommendations(recommendations);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      Alert.alert(
        "Recommendation Error",
        "Unable to generate job recommendations. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserDetails();
    await fetchRecommendations();
    setRefreshing(false);
  };


  const fetchUserDetails = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserDetails(userData);

          // Fetch interests using the context method
          await fetchUserInterests();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
        Alert.alert("Oops!", "Error in fetching details");
      }
    } else {
      console.log("No user is signed in.");
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Fetch recommendations whenever interests change
  useEffect(() => {
    fetchRecommendations(interests);
  }, [interests]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: moderateScale(40) }}>
      <HomeTopBar name={userDetails?.name || ""} />
      <Spacer />
      <JobRecommendation
        recommendations={jobRecommendations}
        isLoading={isLoading}
        refreshing={refreshing}
        handleRefresh={() => {handleRefresh()}}
      />
    </SafeAreaView>
  );
}
