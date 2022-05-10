import React, { useEffect } from "react";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import AppColors from "./src/styles/AppColors";
import useAuth from "./src/hooks/useAuth";
import { addOnUnAuthorizeListener, setAccessToken } from "./src/network/client";

export type RootStackParamList = {
  SplashScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  HomeScreen: undefined,
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const NavigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

const App = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;

  useEffect(() => {
    addOnUnAuthorizeListener(() => {
      signOut();
    });
  }, []);

  useEffect(() => {
    setAccessToken(authData.token);
  }, [authData]);

  return <SafeAreaProvider
    initialMetrics={initialWindowMetrics}>
    <StatusBar
      translucent
      barStyle={"dark-content"}
      backgroundColor={AppColors.color_transparent}
    />
    <NavigationContainer
      ref={NavigationRef}>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}>
        {
          user
            ?
            <>
              <RootStack.Screen
                name={"HomeScreen"}
                component={HomeScreen} />
            </>
            :
            <>
              <RootStack.Screen
                name={"LoginScreen"}
                component={LoginScreen} />

              <RootStack.Screen
                name={"RegisterScreen"}
                component={RegisterScreen} />
            </>
        }
      </RootStack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>;
};


export default App;
