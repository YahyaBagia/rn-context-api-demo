import { Dimensions, View, StyleSheet } from "react-native";

import useIsLargeScreen from "../hooks/useIsLargeScreen";

export interface IAppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<IAppWrapperProps> = ({ children }) => {
  const isLargeScreen = useIsLargeScreen();
  if (isLargeScreen === false) return children;

  return (
    <View style={styles.mainWrapper} testID="AppWrapper">
      <View style={styles.internalView}>{children}</View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const maximumWidth = 375;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: "center",
  },
  internalView: {
    flex: 1,
    width: "100%",
    maxWidth: width > maximumWidth ? maximumWidth : width - 12,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "black",
    marginVertical: 4,
    overflow: "hidden",
  },
});

export default AppWrapper;
