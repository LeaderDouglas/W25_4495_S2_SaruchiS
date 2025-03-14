import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "@/constants/responsive";

const data = [
  {
    jobType: "UI/UX Designer",
    company: "AirBnb",
    location: "United States",
    category: "Full Time",
    salary: "$2000",
  },
  {
    jobType: "Software Engineer",
    company: "Google",
    location: "California, USA",
    category: "Full Time",
    salary: "$5000",
  },
  {
    jobType: "Data Scientist",
    company: "Facebook",
    location: "New York, USA",
    category: "Full Time",
    salary: "$4500",
  },
  {
    jobType: "Product Manager",
    company: "Amazon",
    location: "Seattle, USA",
    category: "Full Time",
    salary: "$6000",
  },
  {
    jobType: "Graphic Designer",
    company: "Adobe",
    location: "San Francisco, USA",
    category: "Part Time",
    salary: "$2500",
  },
  {
    jobType: "DevOps Engineer",
    company: "Microsoft",
    location: "Redmond, USA",
    category: "Full Time",
    salary: "$5500",
  },
  {
    jobType: "Front-End Developer",
    company: "Spotify",
    location: "London, UK",
    category: "Full Time",
    salary: "$4000",
  },
  {
    jobType: "Backend Developer",
    company: "Twitter",
    location: "San Francisco, USA",
    category: "Full Time",
    salary: "$4800",
  },
  {
    jobType: "Data Analyst",
    company: "Netflix",
    location: "Los Angeles, USA",
    category: "Full Time",
    salary: "$3500",
  },
  {
    jobType: "Mobile App Developer",
    company: "Apple",
    location: "Cupertino, USA",
    category: "Full Time",
    salary: "$7000",
  },
];

export default function JobRecommendation() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.category}>{"Job Recommendation"}</Text>
        <Pressable style={styles.seeAllPressable}>
          <Text style={styles.seeAll}>{"See all"}</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobType}>{item.jobType}</Text>
                <Text style={styles.company}>{item.company}</Text>
              </View>
              
              <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={16} color={Colors.light.tabIconDefault} />
                  <Text style={styles.detailText}>{item.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color={Colors.light.tabIconDefault} />
                  <Text style={styles.detailText}>{item.category}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="cash-outline" size={16} color={Colors.light.tabIconDefault} />
                  <Text style={styles.detailText}>{item.salary}/month</Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(10),
    paddingHorizontal:  moderateScale(16),
  },
  category: {
    fontSize:  moderateScale(18),
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
    padding:  moderateScale(16),
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
});