import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropdownColorPicker({ onSelectColor }) {
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const colors = [
    { label: "Red", value: "#ff0000" },
    { label: "Green", value: "#00ff00" },
    { label: "Blue", value: "#0000ff" },
    { label: "Yellow", value: "#ffff00" },
    { label: "Purple", value: "#800080" },
    { label: "Gray", value: "#808080" },
    { label: "Brown", value: "#8b4513" },
  ];

  const handleColorChange = (item) => {
    setSelectedColor(item.value);
    onSelectColor(item.value);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        items={colors}
        defaultValue={selectedColor}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#fafafa" }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={handleColorChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});