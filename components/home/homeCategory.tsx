import { Colors } from "@/constants/Colors";
import { moderateScale } from "@/constants/responsive";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

export default function HomeCategory() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.category}>{"Categories"}</Text>
        <Pressable style={styles.seeAllPressable}>
          <Text style={styles.seeAll}>{"See all"}</Text>
        </Pressable>
      </View>
      <FlatList
        data={[
          { title: "Computer Science", jobs: "2k jobs" },
          { title: "Engineering", jobs: "1.5k jobs" },
          { title: "Design", jobs: "1k jobs" },
          { title: "Marketing", jobs: "800 jobs" }
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemJobs}>{item.jobs}</Text>
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
    paddingHorizontal: 8,
  },
  item: {
    backgroundColor: "white",
    padding: moderateScale(16),
    marginRight: moderateScale(12),
    borderRadius: moderateScale(10),
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: Colors.light.text,
  },
  itemJobs: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
});