import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const StyledButton = (props) => {
  const { title, onPress, buttonStyles, titleStyle } = props;

  return (
    <View>
      <Pressable
        style={[styles.button, buttonStyles]}
        onPress={() => onPress()}
      >
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(StyledButton);
