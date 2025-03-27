import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import ProfileComponent from "@/components/profile/profileComponent";
import { moderateScale } from "@/constants/responsive";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"; // Import the context
import { useUserInterests } from "@/context/useInterestProvider";
import RNInput from "@/components/RNInput";
import Spacer from "@/components/spacer";

const ALL_INTERESTS = [
  "Software Development",
  "Data Science",
  "UI/UX Design",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Product Management",
  "Digital Marketing",
  "Blockchain",
  "Artificial Intelligence",
  "Network Engineering",
  "DevOps",
];

export default function ProfileScreen() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [availableInterests, setAvailableInterests] = useState(ALL_INTERESTS);
  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [otherDetails, setOtherDetails] = useState<string>("");

  // Use the UserInterests context
  const { interests, setInterests, saveUserInterests, fetchUserInterests } =
    useUserInterests();

  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      const user = auth().currentUser;
  
      if (user) {
        try {
          const userDoc = await firestore().collection("users").doc(user.uid).get();
  
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserDetails(userData);
  
            // Fetch interests using the context method
            await fetchUserInterests();
            
              // Load interests from Firestore if available
              if (userData?.interests && Array.isArray(userData.interests)) {
                setInterests(userData.interests);
              }
  
            // Set form fields
            setSkills(userData?.skills || "");
            setEducation(userData?.education || "");
            setOtherDetails(userData?.otherDetails || "");
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
          Alert.alert("Error", "Could not load user profile data");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No user is signed in.");
        setIsLoading(false);
      }
    };
  
    fetchUserDetails();
  }, []);
  


  const toggleInterest = (interest: string) => {
    const newInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];

    setInterests(newInterests);
  };

  const handleSaveInterests = async () => {
    const success = await saveUserInterests(interests);
    if (success) {
      setInterestModalVisible(false);
    }
  };

  const handleSaveDetails = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        setIsLoading(true)
        await firestore().collection("users").doc(user.uid).set(
          {
            skills,
            education,
            otherDetails,
          },
          { merge: true } // Merge ensures that existing data is not overwritten
        );
  
        Alert.alert("Success", "Profile details updated!");
      } catch (error) {
        console.error("Error updating profile details:", error);
        Alert.alert("Error", "Could not update profile details.");
        setIsLoading(false)
      }
      finally{
        setIsLoading(false)
      }
    }
  };
  

  // New logout function
  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Reset the navigation stack and navigate to login
      router.replace("/signIn");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Error", "Could not log out. Please try again.");
    }
  };

  const renderInterestModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isInterestModalVisible}
      onRequestClose={() => setInterestModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Your Interests</Text>
          <ScrollView style={styles.interestScrollView}>
            {availableInterests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestItem,
                  interests.includes(interest) && styles.selectedInterest,
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text style={styles.interestText}>{interest}</Text>
                {interests.includes(interest) && (
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.modalButtonRow}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setInterestModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleSaveInterests}
            >
              <Text style={styles.modalSaveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <ProfileComponent
          firstName={userDetails?.name || "G"}
          lastName=""
          profileImage={null}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {`${userDetails?.name || "Guest"}`}
          </Text>
          {/* <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              Alert.alert("Not available")
            }}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Interests Section */}
      <View style={styles.interestsContainer}>
        <View style={styles.interestsHeader}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <TouchableOpacity onPress={() => setInterestModalVisible(true)}>
            <Ionicons name="add-circle" size={24} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>

        <View style={styles.interestsList}>
          {interests.length > 0 ? (
            interests.map((interest) => (
              <View key={interest} style={styles.interestBadge}>
                <Text style={styles.interestBadgeText}>{interest}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noInterestsText}>No interests added yet</Text>
          )}
        </View>
      </View>

      {/* Job Recommendations */}
      {/* {renderJobRecommendations()} */}
      <Spacer />
      <Spacer />
      <View style={{ paddingHorizontal: moderateScale(16) }}>
        <RNInput
          placeholder="Skills eg. Java,React,AI"
          value={skills}
          onChangeText={(val: string) => {
            setSkills(val);
          }}
        />

        <RNInput
          placeholder="Education"
          value={education}
          onChangeText={(val: string) => {
            setEducation(val);
          }}
        />
        <RNInput
          placeholder="Other details eg. career gap etc."
          value={otherDetails}
          onChangeText={(val: string) => {
            setOtherDetails(val);
          }}
        />
      </View>
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleSaveDetails}>
          <AntDesign name="save" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Interest Selection Modal */}
      {renderInterestModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
    marginTop: moderateScale(80),
  },
  avatarText: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTextContent: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userDetails: {
    paddingVertical: moderateScale(10),
  },
  userName: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    textAlign: "center",
  },
  editProfileButton: {
    marginTop: moderateScale(8),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    backgroundColor: Colors.light.tint,
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButtonText: {
    color: "white",
    fontSize: 12,
  },
  interestsContainer: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  interestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  interestsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: moderateScale(12),
  },
  interestBadge: {
    backgroundColor: Colors.light.tabIconDefault,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  interestBadgeText: {
    color: "white",
    fontSize: 12,
  },
  noInterestsText: {
    color: Colors.light.tabIconDefault,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    maxHeight: "80%",
  },
  interestScrollView: {
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  interestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  selectedInterest: {
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  interestText: {
    fontSize: 16,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalCancelButton: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  modalCancelButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  modalSaveButton: {
    padding: 12,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  modalSaveButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalCloseButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  recommendationsContainer: {
    padding: 16,
  },
  jobRecommendationItem: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobCompany: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  applyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  applyButtonText: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginRight: 4,
  },
  noRecommendationsText: {
    color: Colors.light.tabIconDefault,
    textAlign: "center",
    marginTop: 8,
  },
  saveContainer: {
    paddingHorizontal: moderateScale(50),
    alignItems: "center",
  },
  logoutContainer: {
    paddingHorizontal: moderateScale(50),
    paddingVertical: moderateScale(16),
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
