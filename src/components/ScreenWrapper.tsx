import { memo } from "react";
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import BackgroundDotDark from "@/src/assets/BackgroundDot_Dark.png";
import BackgroundDotLight from "@/src/assets/BackgroundDot_Light.png";
import useIsDarkMode from "@/src/hooks/useIsDarkMode";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ScreenWrapper = ({ children, style }: Props) => {
  const isDarkMode = useIsDarkMode();
  return (
    <ImageBackground
      source={isDarkMode ? BackgroundDotDark : BackgroundDotLight}
      resizeMode="repeat"
      style={styles.backgroundImage}
    >
      <View style={[styles.container, style]}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default memo(ScreenWrapper);
