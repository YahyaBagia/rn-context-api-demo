import { Assets as NavigationAssets } from "@react-navigation/elements";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";

import RootNavigator from "./navigation";
import { AuthProvider } from "./context/AuthContext";
import useIsDarkMode from "./hooks/useIsDarkMode";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

const App = () => {
  const isDarkMode = useIsDarkMode();
  return (
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
      <AuthProvider>
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
