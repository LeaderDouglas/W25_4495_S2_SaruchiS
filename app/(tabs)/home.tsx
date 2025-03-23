import { HomeCategory, HomeTopBar, JobRecommendation } from "@/components/home";
import Spacer from "@/components/spacer";
import { moderateScale } from "@/constants/responsive";
import { useEffect, useState } from "react";
import {SafeAreaView} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function HomeScreen() {
  const [userDetails, setUserDetails] = useState<any>(null);
  console.log("🚀 ~ HomeScreen ~ userDetails:", userDetails)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth().currentUser;

      if (user) {
        try {
          const userDoc = await firestore().collection("users").doc(user.uid).get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserDetails(userData);
           
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      } else {
        console.log("No user is signed in.");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: moderateScale(40) }}>
      <HomeTopBar name={userDetails?.name || ""}/>
      <Spacer />
      <HomeCategory />
      <Spacer />
      <JobRecommendation />
    </SafeAreaView>
  );
}
