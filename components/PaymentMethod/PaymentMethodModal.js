import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import CustomModal from "../UI/Modal";
import StyledButton from "../UI/StyledButton";
import colors from "../Constant/colors";

function PaymentMethodModal(props) {
  const { visible, hideModal } = props;

  const paymentSuccess = () => {
    Alert.alert("Success!", "Payment Done!", [
      { text: "Okay", style: "destructive", onPress: hideModal },
    ]);
  };

  return (
    <CustomModal visible={visible} hideModal={hideModal}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Choose Your Payment Method</Text>

        <View style={styles.buttonContainer}>
          <StyledButton
            title="Direct Payment"
            onPress={paymentSuccess}
            buttonStyles={{
              backgroundColor: "green",
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

          <StyledButton
            title="Card"
            onPress={paymentSuccess}
            buttonStyles={{
              backgroundColor: colors.secondary,
              height: 48,
              borderRadius: 4,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 20,
            }}
            titleStyle={{
              color: "white",
              textTransform: "uppercase",
              fontSize: 18,
              fontWeight: "500",
            }}
          />

          <StyledButton
            title="AD Balance"
            onPress={paymentSuccess}
            buttonStyles={{
              backgroundColor: colors.primary,
              height: 48,
              borderRadius: 4,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 20,
            }}
            titleStyle={{
              color: "white",
              textTransform: "uppercase",
              fontSize: 18,
              fontWeight: "500",
            }}
          />
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 30,
  },
});

export default PaymentMethodModal;
