import React from "react";
import {
  Image,
  ImageStyle,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { IC_LEFT } from "../../assets/path";
import { NavigationRef } from "../../../App";
import PressView from "../PressView/PressView";
import AppColors from "../../styles/AppColors";
import { unit10, unit16, unit18, unit24, unit6 } from "../../utils/appUnit";

type AppBarProps = {
  title: string,
  titleType?: "center" | "left",
  titleStyle?: StyleProp<TextStyle>,
  leftIcon?: any,
  leftIconStyle?: StyleProp<ImageStyle>
  leftIconOnClick?: () => void,
  containerStyle?: StyleProp<ViewStyle>
}

const AppBar: React.FC<AppBarProps> = (
  {
    containerStyle,
    title,
    titleStyle,
    titleType,
    leftIcon,
    leftIconStyle,
    leftIconOnClick,
  },
) => {
  const navigation = NavigationRef.current;

  if (!leftIconOnClick) {
    leftIconOnClick = () => {
      navigation?.goBack();
    };
  }
  const isCenter = titleType === "center";

  return <View style={[styles.container, containerStyle]}>
    <StatusBar
      translucent={true}
      backgroundColor={AppColors.color_white}
    />
    <PressView
      onPress={leftIconOnClick}
      style={
        [
          leftIconStyle,
          {
            zIndex: 1, // make sure title not over icon
            position: isCenter ? "absolute" : "relative",
            marginStart: isCenter ? unit16 : 0,
            padding: unit6,
          },
        ]
      }>
      <Image
        source={leftIcon}
        style={styles.leftIcon}
      />
    </PressView>
    <Text
      style={[styles.title, titleStyle, {
        textAlign: isCenter ? "center" : "left",
      }]}
    >{title}</Text>
  </View>;
};


AppBar.defaultProps = {
  leftIcon: IC_LEFT,
  titleType: "center",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : unit24) + unit18,
    paddingBottom: unit18,
    paddingHorizontal: unit16,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: unit18,
    flexGrow: 1,
    fontWeight: "500",
    paddingHorizontal: unit10,
  },
  leftIcon: {
    width: unit24,
    height: unit24,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : unit24,
  },
});

export default AppBar;
