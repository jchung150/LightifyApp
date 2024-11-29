import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react"; // For running database initialization
import { initializeDatabase } from "./src/database/database";
import IconButton from "./components/UI/IconButton";
import AllEmotions from "./screens/AllEmotions";
import ManageEmotion from "./screens/ManageEmotion";
import About from "./screens/About";

import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function EmotionsOverview() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="plus"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageEmotion");
            }}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="AllEmotions"
        component={AllEmotions}
        options={{
          title: "Emotions",
          tabBarLabel: "Emotions",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="emoji-emotions" color={color} size={size} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          title: "About",
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome6 name="people-group" color={color} size={size} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  // Initialize database when the app loads
  useEffect(() => {
    initializeDatabase(); // Ensures the table is created
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="EmotionsOverview"
            component={EmotionsOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageEmotion"
            component={ManageEmotion}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}