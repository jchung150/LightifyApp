import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { GlobalStyles } from '../constants/styles'; // Adjust the path if needed

const About = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <Image
          source={require('../assets/icon.png')} // Replace with your app logo or relevant image
          style={styles.logo}
        />
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.text}>
          This application analyzes your emotions and provides insights based on your mood. It also includes a variety of features, such as a color picker and emotion tracking.
        </Text>
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Key Features</Text>
        <Text style={styles.text}>✔️ Emotion tracking with a visual color picker.</Text>
        <Text style={styles.text}>✔️ Insights based on detected mood.</Text>
        <Text style={styles.text}>✔️ Sleek and intuitive design for daily use.</Text>
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Developers</Text>
        <Text style={styles.text}>👩‍💻 Juan Chung (A01353601)</Text>
        <Text style={styles.text}>👩‍💻 Kyoungran Park - Student ID</Text>
        <Text style={styles.text}>👨‍💻 Arcie Lao (A01296448)</Text>
        <Text style={styles.text}>👨‍💻 Davin Leong - Student ID</Text>
        <Text style={styles.text}>👨‍💻 Riz Nur Saidy (A00874466)</Text>
        <View style={styles.divider} />

        <Text style={styles.footerText}>
          Thank you for using our app! We hope it brings positivity and insight to your day.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 15,
    marginTop: 20, // Added margin to push the logo down below the notch
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary700,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
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
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
});

export default About;
