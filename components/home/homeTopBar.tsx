import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

interface Props {
  name: string;
}

export default function HomeTopBar({ name }: Props) {
  const router = useRouter();
  return (
    <View style={style.container}>
      <Text style={style.title}>{`Hello,${name || ""} !`}</Text>
      <Pressable
        style={style.bellBackground}
        onPress={() => router.navigate('/trending')}
      >
        <Feather name="trending-up" size={20} color={"white"} />
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
