import React from "react";
import { StyleSheet, TextInput } from "react-native";

function Input(props) {
  return (
    <TextInput
      secureTextEntry={false}
      {...props}
      style={{ ...props.style, ...styles.input }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: "#fbd106",
    height: 38,
    borderRadius: 4,
    paddingLeft: 5,
  },
});

export default React.memo(Input);
