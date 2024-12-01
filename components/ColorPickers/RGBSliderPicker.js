import React, { useState } from "react";
import { View, Text, StyleSheet, Slider } from "react-native";

export default function RGBSliderPicker({ onSelectColor }) {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const rgbColor = `rgb(${red}, ${green}, ${blue})`;

  const handleColorChange = () => {
    const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
      .toString(16)
      .slice(1)}`;
    onSelectColor(hexColor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Color: {rgbColor}</Text>
      <View style={styles.sliderContainer}>
        <Text>Red: {red}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          value={red}
          onValueChange={(value) => {
            setRed(Math.floor(value));
            handleColorChange();
          }}
          minimumTrackTintColor="red"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text>Green: {green}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          value={green}
          onValueChange={(value) => {
            setGreen(Math.floor(value));
            handleColorChange();
          }}
          minimumTrackTintColor="green"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text>Blue: {blue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          value={blue}
          onValueChange={(value) => {
            setBlue(Math.floor(value));
            handleColorChange();
          }}
          minimumTrackTintColor="blue"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});