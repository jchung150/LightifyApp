import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { GlobalStyles } from "../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { setGoveeLightColor } from "../../src/services/govee";

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

  const handleControlSmartLight = async (colorString) => {
    try {
      // Parse RGB string to {r, g, b}
      const match = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!match) {
        throw new Error("Invalid RGB format");
      }

      const rgb = {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      };

      // Convert the RGB values to a single integer using the Govee format
      const rgbValue =
        ((rgb.r & 0xff) << 16) | ((rgb.g & 0xff) << 8) | (rgb.b & 0xff);

      console.log("Controlling light with RGB value:", rgbValue);

      // Call the API with the RGB integer value
      await setGoveeLightColor(rgbValue);

      console.log("Light updated successfully!");
    } catch (error) {
      console.error("Failed to update light color:", error);
      Alert.alert(
        "Connection Error",
        "Failed to change the light color. Please check your Govee Smart Light connection and try again."
      );
    }
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(id)} // Trigger the edit functionality on press
        style={styles.emotionItem}
      >
        {/* Pressable color box for controlling the light */}
        <Pressable
          onPress={() => handleControlSmartLight(color)}
          style={[
            styles.icon,
            { backgroundColor: color }, // Dynamically set the background color
          ]}
        >
          <FontAwesome5 name={icon} size={24} color="#fff" />
        </Pressable>

        <View style={styles.textContainer}>
          <Text style={styles.emotion}>{emotion}</Text>
          <Text style={styles.colorLabel}>{color}</Text>
        </View>
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
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textContainer: {
    marginLeft: 16,
  },
  emotion: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
  },
  colorLabel: {
    fontSize: 14,
    color: GlobalStyles.colors.primary50,
  },
  icon: {
    width: 50, // Adjust size as needed
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
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
