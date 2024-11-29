import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import EmotionsOutput from "../components/EmotionsOutput/EmotionsOutput";
import { initializeDatabase, fetchEmotions } from "../src/database/database";

export default function AllEmotions() {
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    async function loadEmotions() {
      await initializeDatabase();
      const rows = await fetchEmotions();
      setEmotions(rows);
    }
    loadEmotions();
  }, []);

  if (emotions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Add emotions to get started</Text>
      </View>
    );
  }

  return <EmotionsOutput emotions={emotions} />;
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