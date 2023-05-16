import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="bg-white rounded-full h-8 w-8"
    >
      <Ionicons name="arrow-back" size={30} color={colors.button} />
    </TouchableOpacity>
  );
}
