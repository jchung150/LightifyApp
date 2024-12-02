import { View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";

export default function EmotionsHeader() {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning!";
    if (hours < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}</Text>
      <Text style={styles.title}>How are you feeling today?</Text>
      <Text style={styles.subtitle}>Set the tone for your day</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    paddingBottom: 2,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray500,
  },
  subtitle: {
    fontSize: 12,
    color: GlobalStyles.colors.gray500,
  },
});
