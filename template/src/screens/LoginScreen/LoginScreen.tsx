import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import useAuth from "../../hooks/useAuth";
import AppStyles from "../../styles/AppStyles";
import { NavigationRef } from "../../../App";

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  return <SafeAreaView
    style={AppStyles.centerContainer}>
    <Text>LOGIN SCREEN</Text>
    <Button
      onPress={
        () => {
          signIn({
            user: {
              username: "Dung nguyen BKA",
            },
            token: "demo_token",
          });
        }
      }
      title={"LOGIN WITH DUNG NGUYEN BKA"} />
    <Button
      onPress={
        () => {
          NavigationRef.current?.navigate("RegisterScreen");
        }
      }
      title={"REGISTER"} />
  </SafeAreaView>;
};

export default LoginScreen;
