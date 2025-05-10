import { Assets as NavigationAssets } from "@react-navigation/elements";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";

import RootNavigator from "./navigation";

import AppWrapper from "./components/AppWrapper";

import useIsDarkMode from "./hooks/useIsDarkMode";

import { AuthProvider } from "./context/AuthContext";
import { GlobalUIProvider } from "./context/GlobalUIContext";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

const App = () => {
  const isDarkMode = useIsDarkMode();
  return (
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
      <GlobalUIProvider>
        <AuthProvider>
          <AppWrapper>
            <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
          </AppWrapper>
        </AuthProvider>
      </GlobalUIProvider>
    </PaperProvider>
  );
};

export default App;
