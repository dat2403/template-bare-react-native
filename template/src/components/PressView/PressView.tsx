import React from "react";
import {Pressable, PressableProps} from "react-native";

const PressView: React.FC<PressableProps> = (props) => {
  return <Pressable
    {...props}
    style={
      ({pressed}) => [
        props.style as {},
        {opacity: pressed ? 0.7 : 1},
      ]}>
    {props.children}
  </Pressable>
}

export default PressView