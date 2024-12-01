import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ColorWheel } from "react-native-color-wheel";

export default function RGBColorPicker({ onSelectColor }) {
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Color: {selectedColor}</Text>
      <ColorWheel
        initialColor={selectedColor}
        onColorChange={handleColorChange}
        style={styles.colorWheel}
      />
      <View style={[styles.preview, { backgroundColor: selectedColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
  },
  colorWheel: {
    width: 200,
    height: 200,
  },
  preview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 16,
  },
});