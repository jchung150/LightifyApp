import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import Button from "../components/UI/Button";
import { addEmotion, updateEmotion } from "../src/database/database";

const DEFAULT_CONFIG = {
  angry: { color: { r: 255, g: 0, b: 0 }, icon: "angry" },
  happy: { color: { r: 0, g: 255, b: 0 }, icon: "smile" },
  sad: { color: { r: 0, g: 0, b: 255 }, icon: "sad-tear" },
  fear: { color: { r: 128, g: 0, b: 128 }, icon: "grimace" },
  disgust: { color: { r: 139, g: 69, b: 19 }, icon: "grin-tongue" },
  neutral: { color: { r: 128, g: 128, b: 128 }, icon: "meh" },
  surprise: { color: { r: 255, g: 255, b: 0 }, icon: "surprise" },
};

export default function ManageEmotion({ route, navigation }) {
  const editedEmotionId = route.params?.emotionId;
  const isEditing = !!editedEmotionId;

  const [selectedEmotion, setSelectedEmotion] = useState("angry");
  const [color, setColor] = useState(DEFAULT_CONFIG[selectedEmotion].color);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setColor(DEFAULT_CONFIG[selectedEmotion].color); // Reset to default when emotion changes
  }, [selectedEmotion]);

  const handleColorChange = (component, value) => {
    setColor((prevColor) => ({ ...prevColor, [component]: value }));
  };

  const confirmHandler = () => {
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;

    if (isEditing) {
      updateEmotion(editedEmotionId, selectedEmotion, colorString, () =>
        navigation.goBack()
      );
    } else {
      addEmotion(selectedEmotion, colorString, () => {
        console.log("Emotion added successfully");
        navigation.goBack();
      });
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
      <View style={[styles.colorPreview, { backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }]} />
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