import { useEffect } from "react";
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import * as SplashScreen from "expo-splash-screen";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import UserList from "./screens/UserList";

import { useAuth } from "@/src/context/AuthContext";
import { Appbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading === false) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return <></>;

  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <AppBarView {...props} /> }}
    >
      {!!user ? (
        <Stack.Screen name="Home" component={Home} />
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
