// ManageEmotion.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import Button from "../components/UI/Button";
import { addEmotion, updateEmotion, fetchEmotionById } from "../src/database/database";
import { useRoute, useNavigation } from "@react-navigation/native"; 

const DEFAULT_CONFIG = {
  angry: { color: { r: 255, g: 0, b: 0 }, icon: "angry" },
  happy: { color: { r: 0, g: 255, b: 0 }, icon: "smile" },
  sad: { color: { r: 0, g: 0, b: 255 }, icon: "sad-tear" },
  fear: { color: { r: 128, g: 0, b: 128 }, icon: "grimace" },
  disgust: { color: { r: 139, g: 69, b: 19 }, icon: "grin-tongue" },
  neutral: { color: { r: 128, g: 128, b: 128 }, icon: "meh" },
  surprise: { color: { r: 255, g: 255, b: 0 }, icon: "surprise" },
};

export default function ManageEmotion() {
  const route = useRoute(); // Use useRoute to get the route object
  const navigation = useNavigation(); // Use useNavigation if needed

  const routeParams = route.params || {};
  const editedEmotionId = routeParams.emotionId;
  const isEditing = editedEmotionId != null;

  const [selectedEmotion, setSelectedEmotion] = useState("happy");
  const [customEmotion, setCustomEmotion] = useState("");
  const [color, setColor] = useState(DEFAULT_CONFIG["happy"].color);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log("========ManageEmotion========");
  console.log("Received Params in :", route.params);
  console.log("Selected Emotion:", selectedEmotion);
  console.log("Color", color);
  console.log("Emotion ID:", editedEmotionId);
  console.log("isEditing :", isEditing);useNavigation

  useEffect(() => {
    if (isEditing) {
      // Fetch the existing emotion data using editedEmotionId
      loadEmotionData(editedEmotionId);
    } else {
      // Initialize with default values for adding a new emotion
      setSelectedEmotion("happy");
      setColor(DEFAULT_CONFIG["happy"].color);
    }
  }, [isEditing]);

  function parseColorString(colorString) {
    try {
      // Extract numbers from the string "rgb(r, g, b)"
      const match = colorString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (!match) {
        throw new Error("Invalid color string format");
      }
  
      // Convert the extracted numbers into an object
      const [, r, g, b] = match;
      return {
        r: parseInt(r, 10),
        g: parseInt(g, 10),
        b: parseInt(b, 10),
      };
    } catch (error) {
      console.error("Error parsing color string:", error);
      return { r: 0, g: 0, b: 0 }; // Default color in case of failure
    }
  }

  const loadEmotionData = async (emotionId) => {
    try {
      const emotion = await fetchEmotionById(emotionId);
      console.log("Loaded emotion:", emotion);
  
      if (DEFAULT_CONFIG[emotion.emotion]) {
        // If the emotion is predefined, set it as the selected emotion
        setSelectedEmotion(emotion.emotion);
        setCustomEmotion(""); // Clear customEmotion since it's a predefined emotion
      } else {
        // If the emotion is custom, set it in customEmotion and clear selectedEmotion
        setCustomEmotion(emotion.emotion);
        setSelectedEmotion(null); // Clear selectedEmotion since it's custom
      }
  
      // Parse the color string back to RGB
      setColor(parseColorString(emotion.color));
    } catch (error) {
      console.error("Failed to load emotion data:", error);
    }
  };  

  // Fix: Define handleColorChange
  const handleColorChange = (component, value) => {
    setColor((prevColor) => ({ ...prevColor, [component]: value }));
  };

  const confirmHandler = async () => {
    // Use customEmotion if it's not empty, otherwise use selectedEmotion
    const emotionName = customEmotion.trim() || selectedEmotion;
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  
    console.log("========confirmHandler========");
    console.log("Navigation Params:", route.params);
    console.log("Selected Emotion:", selectedEmotion);
    console.log("Emotion ID:", editedEmotionId);
    console.log("isEditing :", isEditing);
  
    if (isEditing) {
      try {
        await updateEmotion(editedEmotionId, emotionName, colorString);
        console.log("Emotion updated successfully");
        navigation.goBack();
      } catch (error) {
        console.error("Error updating emotion:", error);
      }
    } else {
      try {
        // Changed this to emotionName, which can be custom or selected
        const result = await addEmotion(emotionName, colorString);
        if (result) {
          console.log("Emotion added successfully");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error adding emotion:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={dropdownOpen}
        value={selectedEmotion}
        items={Object.keys(DEFAULT_CONFIG).map((key) => ({
          label: (
            <View style={styles.dropdownItem}>
              <FontAwesome5
                name={DEFAULT_CONFIG[key].icon}
                size={18}
                style={styles.icon}
              />
              <Text style={styles.text}>{key}</Text>
            </View>
          ),
          value: key,
        }))}
        setOpen={setDropdownOpen}
        setValue={setSelectedEmotion}
        placeholder="Select an emotion"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Or enter a custom emotion"
        value={customEmotion}
        onChangeText={setCustomEmotion}
      />
      <View
        style={[
          styles.colorPreview,
          { backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` },
        ]}
      />
      <View style={styles.sliders}>
        <Text>Red: {color.r}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={color.r}
          onValueChange={(value) => handleColorChange("r", value)}
        />
        <Text>Green: {color.g}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={color.g}
          onValueChange={(value) => handleColorChange("g", value)}
        />
        <Text>Blue: {color.b}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={color.b}
          onValueChange={(value) => handleColorChange("b", value)}
        />
      </View>
      <View style={styles.buttons}>
        <Button onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9f9f9",
  },
  dropdown: {
    marginBottom: 16,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
    marginVertical: 16,
    fontSize: 16,
  },
  colorPreview: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    marginVertical: 16,
  },
  sliders: {
    marginVertical: 16,
  },
  slider: {
    width: "100%",
    height: 40,
    marginVertical: 8,
  },
  buttons: {
    marginTop: 16,
    alignItems: "center",
  },
});