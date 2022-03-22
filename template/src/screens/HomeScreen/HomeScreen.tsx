import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";

const HomeScreen: React.FC = () => {
  const { username, signOut } = useAuth();
  return <SafeAreaView
    style={AppStyles.centerContainer}>
    <Text>HOME SCREEN</Text>
    <Text>{username}</Text>
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
