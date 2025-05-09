import { memo, useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  TextInput as RNTextInput,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import PasswordInput from "@/src/components/PasswordInput";

import { useAuth } from "@/src/context/AuthContext";
import { emailValidator, passwordValidator } from "@/src/core/utils";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const txtPassword = useRef<RNTextInput>(null);

  const { login } = useAuth();

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const success = await login(email.value, password.value);

    if (!success) {
      Alert.alert("Login Failed", "Invalid email or password.", [
        { text: "OK" },
      ]);
      return;
    }
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <Text variant="headlineLarge" style={styles.headline}>
        Kloudious Login.
      </Text>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        onSubmitEditing={() => txtPassword.current?.focus()}
        left={<TextInput.Icon icon="email-outline" />}
      />
      <HelperText type="error" visible={!!email.error}>
        {email.error}
      </HelperText>

      <PasswordInput
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        errorText={password.error}
        ref={txtPassword}
        onSubmitEditing={_onLoginPressed}
        left={<TextInput.Icon icon="lock-outline" />}
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Button
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={() => navigation.navigate("UserList")}
      >
        USER LIST
      </Button>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
  },
  headline: {
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
  },
});

export default memo(LoginScreen);
