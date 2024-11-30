import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";

export default function EmotionItem({ id, emotion, icon, color, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(id)} // Pass emotion ID to the handler
      style={({ pressed }) => [styles.emotionItem, pressed && styles.pressed]}
    >
      <View style={styles.emotionContent}>
        <FontAwesome5 name={icon} size={24} color={color} style={styles.icon} />
        <View>
          <Text style={[styles.textBase, styles.emotion]}>{emotion}</Text>
          <Text style={styles.textBase}>{color}</Text>
        </View>
      </View>
      {/* Add a color preview box */}
      <View
        style={[
          styles.colorBox,
          { backgroundColor: color }, // Dynamically set the background color
        ]}
      />
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
    alignItems: "center",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  emotionContent: {
    flexDirection: "row",
    alignItems: "center",
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
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
  },
});