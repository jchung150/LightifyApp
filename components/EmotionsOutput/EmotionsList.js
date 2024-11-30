import EmotionItem from "./EmotionItem";
import { FlatList } from "react-native";

export default function EmotionsList({ emotions, onEdit }) {
  function renderEmotionItem({ item }) {
    return (
      <EmotionItem
        id={item.id}
        emotion={item.emotion}
        icon={item.icon}
        color={item.color}
        onPress={(id) => {
          console.log("EmotionsList: calling onEdit with id", id);
          onEdit(id);
        }}
      />
    );
  }

  return (
    <FlatList
      data={emotions}
      renderItem={renderEmotionItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}