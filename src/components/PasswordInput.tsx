import { forwardRef, useState } from "react";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

export interface IPasswordInputProps extends TextInputProps {
  errorText?: string;
}

const PasswordInput = forwardRef<any, IPasswordInputProps>((props, ref) => {
  const { errorText, ...restOfProps } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <TextInput
        label="Password"
        error={!!errorText}
        secureTextEntry={!passwordVisible}
        ref={ref}
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        autoComplete="password"
        autoCapitalize="none"
        textContentType="password"
        {...restOfProps}
      />
      <HelperText type="error" visible={!!errorText}>
        {errorText}
      </HelperText>
    </>
  );
});

export default PasswordInput;
