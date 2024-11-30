import { View } from "react-native";
import EmotionsHeader from "./EmotionsHeader";
import EmotionsList from "./EmotionsList";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function EmotionsOutput({ emotions, onEdit }) {
  console.log("EmotionsOutput: onEdit is", onEdit);
  return (
    <View style={styles.container}>
      <EmotionsHeader />
      <EmotionsList emotions={emotions} onEdit={onEdit} />
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