import React from "react";
import { FlatList } from "react-native";
import EmotionItem from "./EmotionItem";

export default function EmotionsList({ emotions, onEdit, onDelete }) {
  return (
    <FlatList
      data={emotions}
      renderItem={({ item }) => (
        <EmotionItem
          id={item.id}
          emotion={item.emotion}
          icon={item.icon}
          color={item.color}
          onPress={onEdit}
          onDelete={onDelete}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
