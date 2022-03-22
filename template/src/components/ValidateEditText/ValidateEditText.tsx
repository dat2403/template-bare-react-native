import React, { useEffect, useState } from "react";
import { Text, TextInput, TextInputProps } from "react-native";

interface ValidateEditTextProps extends Partial<TextInputProps> {
  checkValidFunctions: ((input: string) => [boolean, string?])[];
  textValue: string;
  setValue: (value: string) => void;
  isValid?: boolean;
  setValid?: (isValid: boolean) => void;
  defaultHelperText?: string;
}

const ValidateEditText: React.FC<ValidateEditTextProps> = (props) => {
  let { defaultHelperText, checkValidFunctions, textValue, setValue, setValid, isValid } = props;
  const [isBlur, setBlur] = useState(true);

  const checkIsValid = (): boolean => {
    return !checkValidFunctions.map(fn => {
      return fn(textValue)[0];
    }).includes(false);
  };

  let handleErrorText = (): string => {
    for (const validFunction of checkValidFunctions) {
      let res = validFunction(textValue);
      if (!res[0]) {
        return res[1] ? res[1] : defaultHelperText ? defaultHelperText : "";
      }
    }
    return "";
  };

  useEffect(() => {
    if (setValid) {
      setValid(checkIsValid());
    }
  }, [textValue]);

  return <>
    <TextInput
      value={textValue}
      onChangeText={setValue}
      onBlur={
        () => {
          setBlur(true);
        }}
      onFocus={
        () => {
          setBlur(false);
        }
      }
      {...props}
    />
    {!isValid && !isBlur &&
      <Text style={{
        color: 'red'
      }}>{handleErrorText()}</Text>
    }
  </>;
};

export default ValidateEditText;
