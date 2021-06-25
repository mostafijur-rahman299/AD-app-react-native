import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../components/Constant/colors";

function AffiliateProgram(props) {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.secondary, fontSize: 35 }}>
        Comming Soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AffiliateProgram;
