import React from "react";
import { View, StyleSheet } from "react-native";
import EmotionsHeader from "./EmotionsHeader";
import EmotionsList from "./EmotionsList";

export default function EmotionsOutput({ emotions, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <EmotionsHeader />
      <EmotionsList emotions={emotions} onEdit={onEdit} onDelete={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
