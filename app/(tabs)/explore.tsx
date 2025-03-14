import React, { useState } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ProfileComponent from "@/components/profile/profileComponent";
import { moderateScale } from "@/constants/responsive";

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
  };

  return interests.flatMap((interest) => jobMap[interest] || []).slice(0, 4);
};

export default function ProfileScreen() {
  const [user, setUser] = useState({
    firstName: "Ajay",
    lastName: "Pal Singh",
    profileImage: null,
  });

  const [interests, setInterests] = useState<string[]>([]);
  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [availableInterests, setAvailableInterests] = useState(ALL_INTERESTS);

  const router = useRouter();

  const toggleInterest = (interest: string) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((i) => i !== interest)
        : [...current, interest]
    );
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
          <ScrollView>
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
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setInterestModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderJobRecommendations = () => {
    const recommendations = getJobRecommendations(interests);

    return (
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Job Recommendations</Text>
        {recommendations.length > 0 ? (
          recommendations.map((job, index) => (
            <View key={index} style={styles.jobRecommendationItem}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noRecommendationsText}>
            Add interests to get job recommendations
          </Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <ProfileComponent
          firstName="Ajay"
          lastName="Pal Singh"
          profileImage={null}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {user.firstName} {user.lastName}
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
  noRecommendationsText: {
    color: Colors.light.tabIconDefault,
    textAlign: "center",
  },
});
