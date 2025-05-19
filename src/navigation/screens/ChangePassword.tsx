import React, { useRef, useState } from "react";
import { Keyboard, TextInput as RNTextInput } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

import { passwordValidator } from "@/src/core/utils";

import { useAuth } from "@/src/context/AuthContext";
import { useGlobalUI } from "@/src/context/GlobalUIContext";

import PasswordInput from "@/src/components/PasswordInput";
import ScreenWrapper from "@/src/components/ScreenWrapper";

const ChangePassword = () => {
  const { changePassword } = useAuth();

  const { showAlert, showSnackBar } = useGlobalUI();
  const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });

  const txtOldPassword = useRef<RNTextInput>(null);
  const txtNewPassword = useRef<RNTextInput>(null);

  const submitChangePassword = async () => {
    const oldPasswordError = passwordValidator(oldPassword.value);
    const newPasswordError = passwordValidator(newPassword.value);

    if (oldPasswordError || newPasswordError) {
      setOldPassword({ ...oldPassword, error: oldPasswordError });
      setNewPassword({ ...newPassword, error: newPasswordError });
      return;
    }

    Keyboard.dismiss();

    const success = await changePassword(oldPassword.value, newPassword.value);

    if (!success) {
      showAlert({
        title: "Change Password Failed",
        message: "Incorrect old password.",
        buttons: [{ text: "OK" }],
      });
    } else {
      showSnackBar({ message: "Change Password Success" });
      setOldPassword({ value: "", error: "" });
      setNewPassword({ value: "", error: "" });
    }
  };

  return (
    <ScreenWrapper>
      <PasswordInput
        label="Old Password"
        returnKeyType="next"
        value={oldPassword.value}
        onChangeText={(text) => setOldPassword({ value: text, error: "" })}
        error={!!oldPassword.error}
        autoComplete="password"
        autoCapitalize="none"
        textContentType="password"
        onSubmitEditing={() => txtNewPassword.current?.focus()}
        left={<TextInput.Icon icon="lock-outline" />}
        ref={txtOldPassword}
      />
      <HelperText type="error" visible={!!oldPassword.error}>
        {oldPassword.error}
      </HelperText>

      <PasswordInput
        label="New Password"
        returnKeyType="go"
        value={newPassword.value}
        onChangeText={(text) => setNewPassword({ value: text, error: "" })}
        error={!!newPassword.error}
        autoComplete="password"
        autoCapitalize="none"
        textContentType="password"
        onSubmitEditing={submitChangePassword}
        left={<TextInput.Icon icon="lock-outline" />}
        ref={txtNewPassword}
      />
      <HelperText type="error" visible={!!newPassword.error}>
        {newPassword.error}
      </HelperText>

      <Button
        mode="contained"
        onPress={submitChangePassword}
        icon={"lock-outline"}
      >
        Change Password
      </Button>
    </ScreenWrapper>
  );
};

export default ChangePassword;
