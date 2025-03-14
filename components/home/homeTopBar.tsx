import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";

export default function HomeTopBar() {
  return (
    <View style={style.container}>
      <Text style={style.title}>{`Hello,User !`}</Text>
      <Pressable
        style={style.bellBackground}
        onPress={() => Alert.alert("Noti")}
      >
        <MaterialCommunityIcons name="bell" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bellBackground: {
    backgroundColor: Colors.light.tint,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
