import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import EmotionsOutput from "../components/EmotionsOutput/EmotionsOutput";
import { initializeDatabase, fetchEmotions, deleteEmotion } from "../src/database/database";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function AllEmotions() {
  const [emotions, setEmotions] = useState([]);
  const navigation = useNavigation();

  const refreshEmotions = async () => {
    try {
      const updatedEmotions = await fetchEmotions();
      setEmotions(updatedEmotions);
      console.log("Emotions refreshed:", updatedEmotions);
    } catch (error) {
      console.error("Failed to refresh emotions:", error);
    }
  };

  // Load database and initial data
  useEffect(() => {
    async function loadEmotions() {
      await initializeDatabase();
      await refreshEmotions(); // Load emotions initially
    }
    loadEmotions();
  }, []);

  // Refresh emotions when the screen regains focus
  useFocusEffect(
    React.useCallback(() => {
      refreshEmotions();
    }, [])
  );

  const navigateToEdit = (emotionId) => {
    navigation.navigate("ManageEmotion", { emotionId });
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmotion(id);
      setEmotions((prevEmotions) =>
        prevEmotions.filter((emotion) => emotion.id !== id)
      );
      console.log(`Emotion with ID ${id} deleted`);
    } catch (error) {
      console.error("Failed to delete emotion:", error);
    }
  };

  if (emotions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Add emotions to get started</Text>
      </View>
    );
  }

  return (
    <EmotionsOutput emotions={emotions} onEdit={navigateToEdit} onDelete={handleDelete} />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});