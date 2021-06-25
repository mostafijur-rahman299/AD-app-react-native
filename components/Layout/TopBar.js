import React from "react";
import { StyleSheet, View, Text} from "react-native";

function TopBar(props) {
  return <View style={styles.bar}>
    <Text style={styles.text}>AutoDuplication</Text>
  </View>;
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#FFDA27",
    width: "100%",
    height: "10%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    marginTop: 35,
    fontSize: 21,
    color: 'white'
  }
});

export default TopBar;
