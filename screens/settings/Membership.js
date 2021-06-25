import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import StyledButton from "../../components/UI/StyledButton";
import colors from "../../components/Constant/colors";
import PaymentMethodModal from "../../components/PaymentMethod/PaymentMethodModal";

function Membership(props) {
  const [onModalOpenMode, setOnModalOpenMode] = useState(false);

  const hideModal = () => setOnModalOpenMode(false);

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, textAlign: "center", marginBottom: 20 }}>
          Current Membership Status: 25th March 2022
        </Text>
        <StyledButton
          title="Extended Membership $499"
          onPress={() => setOnModalOpenMode(true)}
          buttonStyles={{
            backgroundColor: colors.primary,
            height: 48,
            borderRadius: 4,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          titleStyle={{
            color: "white",
            textTransform: "uppercase",
            fontSize: 18,
            fontWeight: "500",
          }}
        />
      </View>
      <PaymentMethodModal visible={onModalOpenMode} hideModal={hideModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Membership;
