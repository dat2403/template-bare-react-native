import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";

const HomeScreen: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  return <SafeAreaView
    style={AppStyles.centerContainer}>
    <Text>HOME SCREEN</Text>
    <Text>{user?.username || "Not sign in"}</Text>
    <Button
      onPress={
        () => {
          signOut();
        }
      }
      title={"Logout"} />
  </SafeAreaView>;
};

export default HomeScreen;
