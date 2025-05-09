import { useColorScheme } from "react-native";

const useIsDarkMode = () => {
  const isDarkMode = useColorScheme() === "dark";
  return isDarkMode;
};

export default useIsDarkMode;
