import { View } from "react-native";
import EmotionsHeader from "./EmotionsHeader";
import EmotionsList from "./EmotionsList";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function EmotionsOutput({ emotions }) {
  return (
    <View style={styles.container}>
      <EmotionsHeader />
      <EmotionsList emotions={emotions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
  },
});
