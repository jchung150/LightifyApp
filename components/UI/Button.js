import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  pressable: {
    borderRadius: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: GlobalStyles.colors.primary400,
  },
});
