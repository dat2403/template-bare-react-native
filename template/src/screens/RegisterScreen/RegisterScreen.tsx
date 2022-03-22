import React, { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppBar from "../../components/AppBar/AppBar";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import { nameLengthValidFn, nameValidFn } from "../../components/ValidateEditText/ValidateFunctions";
import useAuth from "../../hooks/useAuth";

const RegisterScreen: React.FC = () => {
  const [registerName, setRegisterName] = useState("");
  const [isValid, setValid] = useState(false);
  const { signIn } = useAuth();
  return <SafeAreaView
    style={AppStyles.container}>
    <AppBar
      title={"Register Screen"} />
    <View style={AppStyles.centerContainer}>
      <ValidateEditText
        placeholder={"Enter username to register"}
        setValid={setValid}
        checkValidFunctions={[nameValidFn, nameLengthValidFn]}
        textValue={registerName}
        setValue={setRegisterName} />
      <Button
        disabled={!isValid}
        onPress={
          () => {
            signIn({
              user: {
                username: registerName,
              },
              token: registerName,
            });
          }
        }
        title={"Register"}
      />
    </View>
  </SafeAreaView>;
};

export default RegisterScreen;
