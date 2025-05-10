import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useIsDarkMode from "@/src/hooks/useIsDarkMode";

import BackgroundDotDark from "@/src/assets/BackgroundDot_Dark.png";
import BackgroundDotLight from "@/src/assets/BackgroundDot_Light.png";

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
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
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

export default ScreenWrapper;
