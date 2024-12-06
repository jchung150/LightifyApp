import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import Button from "../components/UI/Button";
import {
  addEmotion,
  deleteEmotion,
  updateEmotion,
  fetchEmotionById,
  fetchEmotionByName,
} from "../src/database/database";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";

const DEFAULT_CONFIG = {
  Happy: { color: { r: 0, g: 255, b: 0 }, icon: "smile" },
  Angry: { color: { r: 255, g: 0, b: 0 }, icon: "angry" },
  Sad: { color: { r: 0, g: 0, b: 255 }, icon: "sad-tear" },
  Fear: { color: { r: 128, g: 0, b: 128 }, icon: "grimace" },
  Disgust: { color: { r: 139, g: 69, b: 19 }, icon: "grin-tongue" },
  Neutral: { color: { r: 128, g: 128, b: 128 }, icon: "meh" },
  Surprise: { color: { r: 255, g: 255, b: 0 }, icon: "surprise" },
};

export default function ManageEmotion() {
  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params || {};
  const editedEmotionId = routeParams.emotionId;
  const isEditing = editedEmotionId != null;

  const [selectedEmotion, setSelectedEmotion] = useState("Happy");
  const [customEmotion, setCustomEmotion] = useState("");
  const [color, setColor] = useState(DEFAULT_CONFIG["Happy"].color);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useNavigation;

  useEffect(() => {
    const initializeEmotionData = async () => {
      if (isEditing) {
        await loadEmotionData(editedEmotionId);
      } else {
        setSelectedEmotion("Happy");
        setColor(DEFAULT_CONFIG["Happy"].color);
      }
    };

    initializeEmotionData();
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing && selectedEmotion && DEFAULT_CONFIG[selectedEmotion]) {
      setColor(DEFAULT_CONFIG[selectedEmotion].color);
    }
  }, [selectedEmotion]);

  function parseColorString(colorString) {
    try {
      const match = colorString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (!match) {
        throw new Error("Invalid color string format");
      }
      const [, r, g, b] = match;
      return {
        r: parseInt(r, 10),
        g: parseInt(g, 10),
        b: parseInt(b, 10),
      };
    } catch (error) {
      console.error("Error parsing color string:", error);
      return { r: 0, g: 0, b: 0 };
    }
  }

  const loadEmotionData = async (emotionId) => {
    try {
      const emotion = await fetchEmotionById(emotionId);
      console.log("Loaded emotion:", emotion);

      if (DEFAULT_CONFIG[emotion.emotion]) {
        setSelectedEmotion(emotion.emotion);
        setCustomEmotion("");
      } else {
        setCustomEmotion(emotion.emotion);
        setSelectedEmotion(null);
      }
      setColor(parseColorString(emotion.color));
    } catch (error) {
      console.error("Failed to load emotion data:", error);
    }
  };

  const handleColorChange = (component, value) => {
    setColor((prevColor) => ({ ...prevColor, [component]: value }));
  };

  const confirmHandler = async () => {
    const emotionName = customEmotion.trim() || selectedEmotion;
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;

    const existingEmotion = await fetchEmotionByName(emotionName);

    if (existingEmotion && existingEmotion.id !== editedEmotionId) {
      Alert.alert(
        "Emotion Already Exists",
        "An emotion with this name already exists. Please edit the existing emotion."
      );
      navigation.goBack();
      return;
    }

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

  const handleDelete = async () => {
    try {
      await deleteEmotion(editedEmotionId);
      console.log(`Emotion with ID ${editedEmotionId} deleted`);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to delete emotion:", error);
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
        placeholder="Enter a custom emotion/theme"
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
        <Button onPress={confirmHandler} color={GlobalStyles.colors.primary500}>
          {isEditing ? "Update" : "Add"}
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          color={GlobalStyles.colors.gray500}
        >
          Cancel
        </Button>
        {isEditing ? (
          <Button onPress={handleDelete} color={GlobalStyles.colors.error500}>
            Delete
          </Button>
        ) : null}
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
