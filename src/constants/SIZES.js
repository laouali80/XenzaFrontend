import { Dimensions, Platform } from "react-native";

const { height: screen_height, width: screen_width } = Dimensions.get("window");

export const SIZES = {
  screen_height,
  screen_width,
  CONTAINER_HEIGHT: Platform.OS === "ios" ? 100 : 130,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
};
