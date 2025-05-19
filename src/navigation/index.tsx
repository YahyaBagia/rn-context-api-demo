import { useEffect } from "react";
import { Appbar } from "react-native-paper";
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import UserList from "./screens/UserList";
import ChangePassword from "./screens/ChangePassword";

import { useAuth } from "@/src/context/AuthContext";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useAuth();

  const { colors } = useTheme();
  const { background } = colors;

  useEffect(() => {
    if (loading === false) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(background);
  }, [background]);

  if (loading) return <></>;

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBarView {...props} />,
        navigationBarColor: background,
      }}
    >
      {!!user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ title: "Change Password" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{ title: "Users" }}
      />
    </Stack.Navigator>
  );
};

const AppBarView = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default RootNavigator;
