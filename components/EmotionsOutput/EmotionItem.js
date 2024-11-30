import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";

export default function EmotionItem({ id, emotion, icon, color, onPress }) {
  console.log("EmotionItem: onPress is", onPress);
  return (
    <Pressable
      onPress={() => {
        console.log("EmotionItem: Pressable pressed with ID:", id);
        onPress(id);
      }}
      style={({ pressed }) => [
        styles.emotionItem,
        pressed && styles.pressed,
      ]}
    >
      <FontAwesome5 name={icon} size={24} color={color} style={styles.icon} />
      <Text style={[styles.textBase, styles.emotion]}>{emotion}</Text>
      <Text style={styles.textBase}>{color}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  emotionItem: {
    padding: 12,
    marginVertical: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  emotion: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});