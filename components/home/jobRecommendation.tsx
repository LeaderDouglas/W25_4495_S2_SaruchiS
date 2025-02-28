import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

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
      <View style={style.container}>
        <Text style={style.category}>{"Job Recommendation"}</Text>
        <Pressable style={{ alignItems: "center" }}>
          <Text style={style.seeAll}>{"See all"}</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={style.item}>
              <Text style={style.jobType}>{item.jobType}</Text>
              <Text>{item.company}</Text>
              <View></View>
              <Text>{item.location}</Text>
              <Text>{item.category}</Text>
            </View>
          );
        }}
      />
    </>
  );
}

const style = StyleSheet.create({
  seeAll: {
    textDecorationLine: "underline",
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  jobType: { fontSize: 16, fontWeight: "bold" },
});
