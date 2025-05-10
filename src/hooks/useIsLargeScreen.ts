import { useWindowDimensions } from "react-native";

const useIsLargeScreen = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  return isLargeScreen;
};

export default useIsLargeScreen;
