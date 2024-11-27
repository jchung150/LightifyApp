import { Text } from "react-native";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import Button from "../components/UI/Button";

export default function ManageEmotion({ route, navigation }) {
  const editedEmotionId = route.params?.emotionId;
  const isEditing = !!editedEmotionId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Emotion" : "Add Emotion",
    });
  }, [navigation, isEditing]);

  function deleteEmotionHandler() {
    // TODO: Add delete functionality
    console.log("Emotion deleted");
    navigation.goBack();
  }

  function cancelHandler() {
    // TODO: Add cancel functionality
    console.log("Emotion cancelled");
    navigation.goBack();
  }

  function confirmHandler() {
    // TODO: Add confirm functionality
    if (isEditing) {
      console.log("Update Emotion");
    } else {
      console.log("Add Emotion");
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <FontAwesome
            name="trash-o"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteEmotionHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
