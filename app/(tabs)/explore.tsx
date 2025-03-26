
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ProfileComponent from "@/components/profile/profileComponent";
import { moderateScale } from "@/constants/responsive";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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

const getJobRecommendations = (interests: string[]) => {
  const jobMap: { [key: string]: any[] } = {
    "Software Development": [
      { title: "Full Stack Developer", company: "Tech Innovations" },
      { title: "Backend Engineer", company: "Cloud Solutions Inc." },
    ],
    "Data Science": [
      { title: "Data Analyst", company: "Analytics Corp" },
      { title: "Machine Learning Engineer", company: "AI Dynamics" },
    ],
    "UI/UX Design": [
      { title: "Product Designer", company: "Creative Studios" },
      { title: "UX Researcher", company: "User Experience Ltd." },
    ],
    "Machine Learning": [
      { title: "ML Engineer", company: "AI Solutions" },
      { title: "Computer Vision Specialist", company: "Vision Tech" },
    ],
    "Cybersecurity": [
      { title: "Security Analyst", company: "SecureNet" },
      { title: "Penetration Tester", company: "Cyber Defense Inc." },
    ],
    "Cloud Computing": [
      { title: "Cloud Architect", company: "Cloud Systems" },
      { title: "DevOps Engineer", company: "CloudOps" },
    ],
    "Product Management": [
      { title: "Product Manager", company: "Product Labs" },
      { title: "Product Owner", company: "Agile Solutions" },
    ],
    "Digital Marketing": [
      { title: "Digital Marketing Specialist", company: "Marketing Pro" },
      { title: "SEO Expert", company: "Search Solutions" },
    ],
    "Blockchain": [
      { title: "Blockchain Developer", company: "Chain Technologies" },
      { title: "Smart Contract Engineer", company: "Blockchain Innovations" },
    ],
    "Artificial Intelligence": [
      { title: "AI Researcher", company: "AI Frontiers" },
      { title: "NLP Engineer", company: "Language AI" },
    ],
    "Network Engineering": [
      { title: "Network Engineer", company: "NetConnect" },
      { title: "Network Security Specialist", company: "SecureNetwork" },
    ],
    "DevOps": [
      { title: "DevOps Engineer", company: "Continuous Solutions" },
      { title: "Site Reliability Engineer", company: "Reliability Tech" },
    ],
  };

  return interests.flatMap((interest) => jobMap[interest] || []).slice(0, 4);
};

export default function ProfileScreen() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [availableInterests, setAvailableInterests] = useState(ALL_INTERESTS);
  const [isLoading, setIsLoading] = useState(true);
  
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
            
            // Load interests from Firestore if available
            if (userData?.interests && Array.isArray(userData.interests)) {
              setInterests(userData.interests);
            }
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

  const saveInterestsToFirestore = async (newInterests: string[]) => {
    const user = auth().currentUser;
    
    if (!user) {
      Alert.alert("Error", "You must be signed in to save interests");
      return false;
    }
    
    try {
      await firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          interests: newInterests,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      return true;
    } catch (error) {
      console.error("Error saving interests: ", error);
      Alert.alert("Error", "Failed to save your interests");
      return false;
    }
  };

  const toggleInterest = (interest: string) => {
    const newInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];
    
    setInterests(newInterests);
  };

  const handleSaveInterests = async () => {
    const success = await saveInterestsToFirestore(interests);
    if (success) {
      setInterestModalVisible(false);
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
  const renderJobRecommendations = () => {
    const recommendations = getJobRecommendations(interests);

    return (
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Job Recommendations</Text>
        {recommendations.length > 0 ? (
          recommendations.map((job, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.jobRecommendationItem}
              onPress={() => Alert.alert(`${job.title}`, `Apply to ${job.company}`)}
            >
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <View style={styles.applyButtonContainer}>
                <Text style={styles.applyButtonText}>Apply</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.light.tint} />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecommendationsText}>
            Add interests to get job recommendations
          </Text>
        )}
      </View>
    );
  };

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
      {renderJobRecommendations()}

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
    justifyContent:'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
    marginTop:moderateScale(80),
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
    paddingVertical:moderateScale(10)
  },
  userName: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    textAlign:'center'
  },
  editProfileButton: {
    marginTop: moderateScale(8),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    backgroundColor: Colors.light.tint,
    borderRadius: moderateScale(20),
    justifyContent:'center',
    alignItems:'center'
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
