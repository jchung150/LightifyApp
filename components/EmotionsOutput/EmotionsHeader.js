import { View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";

export default function EmotionsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <Text style={styles.subtitle}>Set the tone for your day</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
  },
});
