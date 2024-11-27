import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

export default function EmotionItem({ id, emotion, icon, color }) {
  const navigation = useNavigation();

  function emotionPressHandler() {
    navigation.navigate("ManageEmotion", {
      emotionId: id,
    });
  }

  return (
    <Pressable
      onPress={emotionPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.emotionItem}>
        <Text style={[styles.textBase, styles.emotion]}>{emotion}</Text>
        {icon}
        <Text style={styles.textBase}>{color}</Text>
      </View>
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
  pressed: {
    opacity: 0.75,
  },
});
