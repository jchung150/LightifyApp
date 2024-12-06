import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { initializeDatabase } from "./src/database/database";
import IconButton from "./components/UI/IconButton";
import AllEmotions from "./screens/AllEmotions";
import ManageEmotion from "./screens/ManageEmotion";
import About from "./screens/About";
import { GlobalStyles } from "./constants/styles";

const Tabs = createBottomTabNavigator();
const AllEmotionsStack = createNativeStackNavigator();

function AllEmotionsStackScreen() {
  return (
    <AllEmotionsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: "white",
      }}
    >
      <AllEmotionsStack.Screen
        name="AllEmotions"
        component={AllEmotions}
        options={({ navigation }) => ({
          title: "LIGHTIFY",
          headerRight: () => (
            <IconButton
              icon="plus"
              size={24}
              color="white"
              onPress={() => navigation.navigate("ManageEmotion")}
            />
          ),
        })}
      />
      <AllEmotionsStack.Screen
        name="ManageEmotion"
        component={ManageEmotion}
        options={{
          presentation: "modal",
          headerTitle: "Manage Colour",
        }}
      />
    </AllEmotionsStack.Navigator>
  );
}

function EmotionsOverview() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}
    >
      <Tabs.Screen
        name="Emotions"
        component={AllEmotionsStackScreen}
        options={{
          tabBarLabel: "Emotions",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="emoji-emotions" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="people-group" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    console.log("Initializing database...");
    initializeDatabase()
      .then(() => {
        console.log("Database initialized successfully");
      })
      .catch((error) => {
        console.error("Failed to initialize database:", error);
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <EmotionsOverview />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
