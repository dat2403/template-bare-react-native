import React, { useEffect } from "react";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthState from "./src/hooks/useAuthState";
import SplashScreen from "./src/screens/SplashScreen/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import AuthModuleProvider, { AuthContextType, AuthData } from "./src/context/AuthModuleProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import AppColors from "./src/styles/AppColors";

export type RootStackParamList = {
  SplashScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  HomeScreen: undefined,
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const NavigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

export const AUTH_USER_KEY = "@auth_data";

const App = () => {
  const { authState, dispatch } = useAuthState();

  const storeAuthData = async (value: AuthData) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(AUTH_USER_KEY, jsonValue);
      //todo: set token to api client
      dispatch({ type: "SIGN_IN", payload: value });
    } catch (e) {
      throw Error("[App] Can not store auth data");
    }
  };

  const retrieveAuthData = async () => {
    try {
      const res = await AsyncStorage.getItem(AUTH_USER_KEY);
      // fake delay
      await new Promise(r => setTimeout(r, 2000));
      if (res) {
        const _payload = JSON.parse(res);
        //todo: set token to api client
        dispatch({ type: "RESTORE", payload: _payload });
      } else {
        // no data
        dispatch({ type: "RESTORE", payload: {} });
      }
    } catch (e) {
      throw Error("[App] Can not get auth data");
    }
  };

  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_USER_KEY);
      dispatch({ type: "SIGN_OUT", payload: {} });
    } catch (e) {
      throw Error("[App] Can not remove auth data");
    }
  };

  const authActions: AuthContextType = React.useMemo(
    () => ({
      signIn: async (_payload: AuthData) => {
        try {
          await storeAuthData(_payload);
        } catch (e) {

        }
      },
      signOut: async () => {
        try {
          await removeAuthData();
        } catch (e) {

        }
      },
      restore: async () => {
        try {
          await retrieveAuthData();
        } catch (e) {

        }
      },
    }),
    [],
  );


  useEffect(() => {
    // when open app, restore the user auth, if not have auth data you have to go to log in screen
    authActions.restore();

    //todo: handle api not valid (status 401 => auto logout)
    // addTokenFailListener(() => {
    //   authActions.signOut();
    // });
  }, []);

  if (authState.isLoading) {
    return <SplashScreen />;
  }

  return <SafeAreaProvider
    initialMetrics={initialWindowMetrics}>
    <StatusBar
      translucent
      barStyle={"dark-content"}
      backgroundColor={AppColors.color_transparent}
    />
    <NavigationContainer
      ref={NavigationRef}>
      <AuthModuleProvider
        user={authState.user}
        authActions={authActions}>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}>
          {
            authState.user
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
      </AuthModuleProvider>
    </NavigationContainer>
  </SafeAreaProvider>;
};


export default App;
