import AntIcon from "react-native-vector-icons/AntDesign";
import ZocialIcon from "react-native-vector-icons/Zocial";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default (type?: string): React.ElementType => {
  switch (type) {
    case "zocial":
      return ZocialIcon;
    case "simple-line-icon":
      return SimpleLineIcon;
    case "Feather":
      return Feather;
    case "antdesign":
      return AntIcon;
    case "Entypo":
      return Entypo;
    case "Ionicons":
      return Ionicons;
    case "FontAwesome":
      return FontAwesome;
    case "Octicons":
      return Octicons;
    case "MaterialCommunityIcons":
      return MaterialCommunityIcons;
    case "MaterialIcons":
      return MaterialIcons;

    default:
      return SimpleLineIcon;
  }
};
