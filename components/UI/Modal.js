import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";

function CustomModal(props) {
  const { visible, hideModal } = props;
  return (
    <Modal
      animationIn={"slideInLeft"}
      animationOut={"slideOutRight"}
      isVisible={visible}
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropColor={"black"}
      backdropOpacity={0.8}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.container}>
        <View style={styles.closeIconContainer}>
          <Ionicons
            style={styles.closeIcons}
            name="close-circle-outline"
            color="tomato"
            size={35}
            onPress={hideModal}
          />
        </View>
        {props.children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    padding: 20,
    backgroundColor: "white",
    marginBottom: 90,
    marginTop: 40,
    borderRadius: 10,
    elevation: 45,
    zIndex: 15,
  },
  closeIcons: {
    marginLeft: "auto",
    marginTop: -12,
    marginRight: -10,
    marginBottom: 10,
  },
});

export default React.memo(CustomModal);
