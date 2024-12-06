import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

const About = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.text}>
          This application lets you choose from predefined emotions or create
          your own emotion/theme. Once selected, you can pick a color to
          represent it and light up the smart light bar with your chosen color,
          setting the perfect mood in your room.
        </Text>
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Key Features</Text>
        <Text style={styles.text}>✔️ Customizable Emotions and Themes</Text>
        <Text style={styles.text}>✔️ Mood Lighting Control</Text>
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Developers</Text>
        <Text style={styles.text}>👩‍💻 Juan Chung (A01353601)</Text>
        <Text style={styles.text}>👩‍💻 Kyoungran Park (A01331544)</Text>
        <Text style={styles.text}>👨‍💻 Arcie Lao (A01296448)</Text>
        <Text style={styles.text}>👨‍💻 Davin Leong (A01344186)</Text>
        <Text style={styles.text}>👨‍💻 Riz Nur Saidy (A00874466)</Text>
        <View style={styles.divider} />

        <Text style={styles.footerText}>
          Thank you for using our app! We hope it brings positivity and insight
          to your day.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    alignSelf: "center",
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: GlobalStyles.colors.primary500,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: GlobalStyles.colors.gray700,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: GlobalStyles.colors.gray500,
    marginVertical: 20,
    opacity: 0.2,
  },
  footerText: {
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
  },
});

export default About;
