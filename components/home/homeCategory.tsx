import { Colors } from "@/constants/Colors";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

export default function HomeCategory() {
  return (
    <>
      <View style={style.container}>
        <Text style={style.category}>{"Categories"}</Text>
        <Pressable style={{ alignItems: "center" }}>
          <Text style={style.seeAll}>{"See all"}</Text>
        </Pressable>
      </View>
      <FlatList
        data={[1, 2, 3, 4]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={() => {
          return (
            <View style={style.item}>
              <Text>{"Computer Science"}</Text>
              <Text>{`2k job`}</Text>
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
    backgroundColor: "green",
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
});
