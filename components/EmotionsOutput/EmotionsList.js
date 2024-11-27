import { FlatList } from "react-native";
import EmotionItem from "./EmotionItem";

function renderEmotionItem(itemData) {
  return <EmotionItem {...itemData.item} />;
}

export default function EmotionsList({ emotions }) {
  return (
    <FlatList
      data={emotions}
      renderItem={renderEmotionItem}
      keyExtractor={(item) => item.id}
    />
  );
}
