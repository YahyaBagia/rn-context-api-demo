import { useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput as RNTextInput,
  Keyboard,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "@/src/core/utils";
import { useAuth } from "@/src/context/AuthContext";
import { useGlobalUI } from "@/src/context/GlobalUIContext";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import PasswordInput from "@/src/components/PasswordInput";

const Signup = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const txtEmail = useRef<RNTextInput>(null);
  const txtPassword = useRef<RNTextInput>(null);

  const { signup } = useAuth();
  const { showSnackBar, showAlert } = useGlobalUI();

  const _onSignupPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (nameError || emailError || passwordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    Keyboard.dismiss();

    const success = await signup(name.value, email.value, password.value);

    if (!success) {
      showAlert({
        title: "Signup Failed",
        message: "Email is already registered with us.",
        buttons: [{ text: "OK" }],
      });
    } else {
      showSnackBar({ message: "Signup Success" });
    }
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <Text variant="headlineLarge" style={styles.headline}>
        Signup
      </Text>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        autoCapitalize="words"
        textContentType="name"
        onSubmitEditing={() => txtEmail.current?.focus()}
        left={<TextInput.Icon icon="account-outline" />}
      />
      <HelperText type="error" visible={!!name.error}>
        {name.error}
      </HelperText>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        ref={txtEmail}
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
        onSubmitEditing={_onSignupPressed}
        left={<TextInput.Icon icon="lock-outline" />}
      />

      <Button mode="contained" onPress={_onSignupPressed}>
        Signup
      </Button>

      <View style={styles.row}>
        <Text>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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

export default Signup;
