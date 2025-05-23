import { memo, useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  TextInput as RNTextInput,
  Keyboard,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import PasswordInput from "@/src/components/PasswordInput";

import { useAuth } from "@/src/context/AuthContext";
import { useGlobalUI } from "@/src/context/GlobalUIContext";

import { emailValidator, passwordValidator } from "@/src/core/utils";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const txtPassword = useRef<RNTextInput>(null);

  const { login } = useAuth();
  const { showSnackBar, showAlert } = useGlobalUI();

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    Keyboard.dismiss();

    const success = await login(email.value, password.value);

    if (!success) {
      showAlert({
        title: "Login Failed",
        message: "Invalid email or password.",
        buttons: [{ text: "OK" }],
      });
    } else {
      showSnackBar({ message: "Login Success" });
    }
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <Text variant="headlineLarge" style={styles.headline}>
        Welcome
      </Text>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        autoComplete="email"
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
        returnKeyType="go"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        errorText={password.error}
        ref={txtPassword}
        onSubmitEditing={_onLoginPressed}
        left={<TextInput.Icon icon="lock-outline" />}
      />

      <Button mode="contained" onPress={_onLoginPressed} icon={"login"}>
        Login
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Button
        style={styles.btnUserList}
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
  btnUserList: {
    position: "absolute",
    top: 32,
    right: 8,
  },
});

export default memo(LoginScreen);
