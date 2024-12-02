import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { GlobalStyles } from "../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";

export default function EmotionItem({
  id,
  emotion,
  icon,
  color,
  onPress,
  onDelete,
}) {
  // Render the delete button when swiping
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
      <View style={styles.deleteContent}>
        <FontAwesome5 name="trash" size={20} color="white" />
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(id)} // Trigger the edit functionality on press
        style={styles.emotionItem}
      >
        <View style={styles.emotionContent}>
          <FontAwesome5
            name={icon}
            size={30}
            color={color}
            style={[styles.icon, { backgroundColor: color }]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.emotion}>{emotion}</Text>
            <Text style={styles.colorLabel}>{color}</Text>
          </View>
        </View>
        {/* Add a color preview box */}
        {/* <View
          style={[
            styles.colorBox,
            { backgroundColor: color }, // Dynamically set the background color
          ]}
        /> */}
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  emotionItem: {
    padding: 12,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  emotionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  emotion: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
  },
  icon: {
    width: 50, // Fixed size for consistency
    height: 50, // Fixed size for consistency
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 6,
    textAlign: "center",
  },
  colorLabel: {
    fontSize: 14,
    color: GlobalStyles.colors.primary50,
  },
  // colorBox: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: GlobalStyles.colors.primary50,
  // },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 80,
    height: "100%",
  },
  deleteContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
});
