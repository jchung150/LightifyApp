import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const DUMMY_EMOTIONS = [
  {
    id: 1,
    emotion: "angry",
    icon: <FontAwesome5 name="angry" size={24} color="black" />,
    color: "#ff0000",
  },
  {
    id: 2,
    emotion: "happy",
    icon: <FontAwesome5 name="smile" size={24} color="black" />,
    color: "#00ff00",
  },
  {
    id: 3,
    emotion: "sad",
    icon: <FontAwesome5 name="sad-tear" size={24} color="black" />,
    color: "#0000ff",
  },
  {
    id: 4,
    emotion: "fear",
    icon: <FontAwesome5 name="grimace" size={24} color="black" />,
    color: "#800080",
  },
  {
    id: 5,
    emotion: "disgust",
    icon: <FontAwesome5 name="grin-tongue" size={24} color="black" />,
    color: "#8b4513",
  },
  {
    id: 6,
    emotion: "neutral",
    icon: <FontAwesome5 name="meh" size={24} color="black" />,
    color: "#808080",
  },
  {
    id: 7,
    emotion: "surprise",
    icon: <FontAwesome5 name="surprise" size={24} color="black" />,
    color: "#ffff00",
  },
];

export { DUMMY_EMOTIONS };
