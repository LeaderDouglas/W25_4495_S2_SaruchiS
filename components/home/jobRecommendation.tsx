
import React from "react";
import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "@/constants/responsive";

// Job Recommendation Interface (matching the one in HomeScreen)
interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  description: string;
  matchPercentage: number;
}

interface JobRecommendationProps {
  recommendations: JobRecommendation[];
  isLoading?: boolean;
  refreshing?: boolean;
  handleRefresh?: () => void;
}

export default function JobRecommendation({
  recommendations = [],
  isLoading = false,
  refreshing,
  handleRefresh,
}: JobRecommendationProps) {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.loadingText}>
          Generating Job Recommendations...
        </Text>
      </View>
    );
  }

  // Render empty state if no recommendations
  if (!recommendations || recommendations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No job recommendations available</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.category}>Job Recommendations</Text>
        {/* <Pressable style={styles.seeAllPressable}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable> */}
      </View>
      <FlatList
        data={recommendations}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobType}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>
              </View>

              <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={Colors.light.tabIconDefault}
                  />
                  <Text style={styles.detailText}>{item.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons
                    name="stats-chart-outline"
                    size={16}
                    color={Colors.light.tabIconDefault}
                  />
                  <Text style={styles.detailText}>
                    {item.matchPercentage}% Match
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons
                    name="cash-outline"
                    size={16}
                    color={Colors.light.tabIconDefault}
                  />
                  <Text style={styles.detailText}>{item.salary}/month</Text>
                </View>
              </View>

              {/* Optional: Skills Chip */}
              <View style={styles.skillsContainer}>
                {item.skills.slice(0, 3).map((skill, index) => (
                  <View key={index} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  loadingText: {
    marginTop: moderateScale(10),
    color: Colors.light.tabIconDefault,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  emptyText: {
    color: Colors.light.tabIconDefault,
    fontSize: moderateScale(16),
  },

  // New skills container
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: moderateScale(10),
    gap: moderateScale(8),
  },
  skillChip: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.tabIconDefault,
  },
  skillText: {
    fontSize: moderateScale(10),
    color: Colors.light.tabIconDefault,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(16),
  },
  category: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: Colors.light.text,
  },
  seeAllPressable: {
    alignItems: "center",
  },
  seeAll: {
    textDecorationLine: "underline",
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: moderateScale(16),
  },
  item: {
    backgroundColor: "white",
    padding: moderateScale(16),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  jobHeader: {
    marginBottom: 12,
  },
  jobType: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  jobDetails: {
    // flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailText: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
});
