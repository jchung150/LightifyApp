import EmotionsOutput from "../components/EmotionsOutput/EmotionsOutput";
import { DUMMY_EMOTIONS } from "../mock_data/MockData";

export default function AllEmotions() {
  return <EmotionsOutput emotions={DUMMY_EMOTIONS} />;
}
